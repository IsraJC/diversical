import Vue from 'vue'
import Vuex from 'vuex'

import * as fb from '../firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        events: []
    },
    mutations: {
        setEvents(state, val) {
            state.events = val
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
        }
    },
    modules: {}
})