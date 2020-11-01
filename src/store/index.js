import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import * as fb from '../firebase.js'
import { auth } from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        events: [],
        userProfile: {}
    },
    getters: {
        getUser(state) {
            return state.userProfile
        }
    },
    mutations: {
        setEvents: (state, events) => {
            state.events = events
        },
        //Create the setUserProfile mutations to update the user profile in the state.
        setUserProfile(state, val) {
            state.userProfile = val
        }
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
                organisation: user.name
            })
            alert("Event added successfully!")
            loadEvents()
        },

        loadEvents({ commit }) {
            const tempEvents = [];
            fb.eventsCollection
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        tempEvents.push({
                            id: doc.id,
                            name: doc.data().name,
                            start: doc.data().start,
                            end: doc.data().end,
                            starttime: doc.data().starttime,
                            endtime: doc.data().endtime,
                            description: doc.data().description,
                            location: doc.data().location,
                            meetinglink: doc.data().meetinglink,
                            contactemail: doc.data().contactemail,
                            color: doc.data().color
                        });
                        console.log(doc.id, " => ", doc.data());
                    });
                }),
                commit('setEvents', this.events)
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

            // set user profile in state
            commit('setUserProfile', userProfile.data())

            // change route to dashboard
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }
        },

        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // create user profile object in userCollections
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                description: form.description
            })

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)

            // change route to dashboard
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }

            alert("Account successfully created!")
        },

        async logout({ commit }) {
            await fb.auth.signOut()

            // clear userProfile and redirect to /login
            commit('setUserProfile', {})
            alert("Logged out successfully!")
            router.push('/')
        }

    },
    modules: {}
})