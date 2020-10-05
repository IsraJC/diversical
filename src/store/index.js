import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import * as fb from '../firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        events: [],
        userProfile: {}
    },
    mutations: {
        setEvents(state, val) {
            state.events = val
        },
        //Create the setUserProfile mutations to update the user profile in the state.
        setUserProfile(state, val) {
            state.userProfile = val
        }
    },
    actions: {
        async addEvent({}, event) {
            await fb.eventsCollection.add({
                Title: event.title,
                Date: event.date,
                StartTime: event.starttime,
                EndTime: event.endtime,
                Description: event.description,
                Location: event.location,
                MeetingLink: event.meetinglink,
                ContactEmail: event.contactemail
            })
            alert("Event added!")
        },

        //Create the login and fetchUserProfile actions, these are called methods
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },

        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state
            commit('setUserProfile', userProfile.data())

            // change route to dashboard
            router.push('/')
        },

        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // create user profile object in userCollections
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                title: form.title
            })

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        }

    },
    modules: {}
})