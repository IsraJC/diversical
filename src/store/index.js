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
        async addEvent({}, event) {
            await fb.eventsCollection.add({
                Title: event.title,
                Date: event.date,
                StartTime: event.starttime,
                EndTime: event.endtime,
                Description: event.description,
                Location: event.location,
                MeetingLink: event.meetinglink,
                ContactEmail: event.contactemail,
                Organisation: userProfile.name
            })
            alert("Event added!")
        },

        setEvents: async context => {
            let snapshot = await db.collection('events').get()
            const events = []
            snapshot.forEach(doc => {
                let appData = doc.data()
                appData.id = doc.id
                events.push(appData)
            })
            context.commit('setEvents', events)
        },

        //Create the login and fetchUserProfile actions, these are called methods
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user);
            alert("Logged In!")
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
        },

        async logout({ commit }) {
            await fb.auth.signOut()

            // clear userProfile and redirect to /login
            commit('setUserProfile', {})
            router.push('/login')
        }

    },
    modules: {}
})