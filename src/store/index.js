import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import * as fb from '../firebase.js'
import { auth } from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        events: [],
        userProfile: {},
        userID: null,
        searchedEvents: []
    },
    getters: {
        getUser(state) {
            return state.userProfile
        },
        getUserID(state) {
            return state.userID
        },
        getEvents(state) {
            return state.events
        },
        getSearchedEvents(state) {
            return state.searchedEvents
        }
    },
    mutations: {
        setEvents(state, events) {
            state.events = events
        },
        //Create the setUserProfile mutations to update the user profile in the state.
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setUserID(state, val) {
            state.userID = val
        },
        setSearchedEvents(state, events) {
            state.searchedEvents = events
        },
    },
    actions: {
        async addEvent({ getters }, event) {
            let user = getters.getUser
            await fb.eventsCollection.add({
                name: event.name,
                start: event.start,
                end: event.end,
                starttime: event.starttime,
                endtime: event.endtime,
                description: event.description,
                location: event.location,
                meetinglink: event.meetinglink,
                contactemail: event.contactemail,
                color: event.color,
                organisation: getters.getUserID,
                tags: event.tags
            })

            alert("Event added successfully!")
        },

        async getEvents({ commit }) {
            //get snapshot
            let snapshot = await fb.eventsCollection.get()
                //loop over snapshot and get each document
            let events = []
            snapshot.forEach(doc => {
                    //data doesn't include ID
                    let appData = doc.data();
                    appData.id = doc.id;
                    events.push(appData);
                })
                //sets events array in data to events array created in this method
            commit('setEvents', events)
        },

        //Create the login and fetchUserProfile actions, these are called methods
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user);
            alert("Logged in successfully!")
        },

        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()
            console.log(userProfile)
                // set user profile in state
            commit('setUserProfile', userProfile.data())
            commit('setUserID', user.uid)

            // change route to dashboard
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }
        },

        async signup({ dispatch }, form) {
            // sign user up
            await fb.auth.createUserWithEmailAndPassword(form.email, form.password).then(function(user) {
                // create user profile object in userCollections
                fb.usersCollection.doc(auth().currentUser.uid).set({
                    name: form.name,
                    description: form.description,
                    email: form.email,
                    logo: 'https://api.iconify.design/mdi-account-circle.svg'
                })

                // fetch user profile and set in state
                dispatch('fetchUserProfile', user)

                // change route to dashboard
                if (router.currentRoute.path === '/login') {
                    router.push('/')
                }

                alert("Account successfully created!")
            }).catch(function(error) {
                alert(error.message)
            })


        },

        async logout({ commit }) {
            await fb.auth.signOut()

            // clear userProfile and redirect to /login
            commit('setUserProfile', {})
            alert("Logged out successfully!")
            router.push('/login')
        },

        async saveProfile({ state, dispatch }, newProfile, user, showAlert) {
            fb.usersCollection.doc(state.userID)
                .update({ name: newProfile.name, description: newProfile.description, logo: newProfile.logo })
                .then(() => {
                    if (showAlert) {
                        alert("Profile successfully saved")
                    }
                })
            dispatch('fetchUserProfile', user)
        },

        async saveAccountDetails({ dispatch }, newDetails, user) {
            auth().currentUser.updateEmail(newDetails.email)
            auth().currentUser.updatePassword(newDetails.password).then(function() {
                alert("Account details successfully updated")
            }).catch(function(error) {
                alert("An error occurred: " + error)
            });
            dispatch('fetchUserProfile', user)
        },
        async deleteAccount({ getters }) {
            const userID = auth().currentUser.uid
            auth().currentUser.delete().then(function() {
                fb.usersCollection.doc(userID).delete()
                alert("Account successfully deleted")
                router.push('/login')
            }).catch(function(error) {
                alert("An error occurred: " + error.message)
            });

        },
        async updateEvent({ getters }, event) {
            fb.eventsCollection.doc(event.id).update({
                    name: event.name,
                    start: event.start,
                    end: event.end,
                    starttime: event.starttime,
                    endtime: event.endtime,
                    description: event.description,
                    location: event.location,
                    meetinglink: event.meetinglink,
                    contactemail: event.contactemail,
                    color: event.color,
                    organisation: getters.getUserID,
                    tags: event.tags
                })
                .then(() => {
                    alert("Event successfully updated")
                })
        },
        async deleteEvent({}, event, showDeleteConfirmation) {
            fb.eventsCollection.doc(event.id).delete()
            if (showDeleteConfirmation) {
                alert("Event successfully deleted")
            }
            router.push('/account')

        },
        async searchEvents({ commit }, searchArray) {
            var tempArray = Array.from(Object.values(searchArray))
            searchArray = JSON.stringify(tempArray)
            let snapshot = await fb.eventsCollection.get()
                //loop over snapshot and get each document
            let events = []
            snapshot.forEach(doc => {
                    //data doesn't include ID
                    let appData = doc.data();
                    appData.id = doc.id;
                    events.push(appData);
                })
                //sets events array in data to events array created in this method
            let eventsSet = new Set()
            for (var item of events) {
                var nameArray = item.name.toLowerCase().split(" ")
                for (var word of nameArray) {
                    if (searchArray.includes(word)) {
                        //console.log("name")
                        eventsSet.add(item)
                    }
                }
                var descArray = item.description.toLowerCase().split(" ")
                for (var word of descArray) {
                    if (searchArray.includes(word)) {
                        //console.log("desc")
                        eventsSet.add(item)
                    }
                }
                var tags = item.tags
                if (tags.length > 0) {
                    for (var tag of tags) {
                        if (searchArray.includes(tag.toLowerCase()) && tag != "") {
                            //console.log(tag + " found in " + searchArray)
                            eventsSet.add(item)
                        }
                    }
                }
                var locationArray = item.location.toLowerCase().split(" ")
                console.log(locationArray)
                if (locationArray.length > 0) {
                    for (var word of locationArray) {
                        if (searchArray.includes(word) && word != "") {
                            //console.log("location")
                            eventsSet.add(item)
                        }
                    }
                }
                var user = await fb.usersCollection.doc(item.organisation).get()
                item.organisationName = user.data().name
                var orgNameArray = item.organisationName.toLowerCase().split(" ")
                for (var word of orgNameArray) {
                    if (searchArray.includes(word)) {
                        //console.log("organisation name")
                        eventsSet.add(item)
                    }
                }
                console.log(eventsSet)
            }
            let searchedEvents = Array.from(eventsSet)
            commit('setSearchedEvents', searchedEvents)
        }

    },
    modules: {}
})