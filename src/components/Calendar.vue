<template>
  <v-row class="ma-2 fill-height">
    <v-col>
      
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div id="searchDiv">
            <v-container id="searchContainer">
              <v-text-field solo type="text" v-model.trim="searchText" placeholder="Search" id="searchText" prepend-inner-icon="mdi-magnify"/>
            </v-container>
          </div>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600" class="calendarSheet">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn> -->
              <!-- <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn> -->
            </v-toolbar>
             <v-card-text>
              Organisation: <span v-html="selectedEvent.organisationName"></span>
            </v-card-text>
            <v-card-text>
              Description: <span v-html="selectedEvent.description"></span>
            </v-card-text>
            <v-card-text v-if=selectedEvent.location>
              Location: <span v-html="selectedEvent.location"></span>
            </v-card-text>
            <v-card-text v-if=selectedEvent.meetinglink>
              Meeting Link: <span v-html="selectedEvent.meetinglink"></span>
            </v-card-text>
            <v-card-text v-if=selectedEvent.contactemail>
              Contact Email: <span v-html="selectedEvent.contactemail"></span>
            </v-card-text>
            <v-card-text v-if=selectedEvent.tags>
              Tags: <b-form-tags 
              id="tags-basic-calendar"
              v-model="selectedEvent.tags" 
              disabled="true"
              tag-pills
              size="lg"
              tag-variant="primary"
              ></b-form-tags>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { db } from '@/firebase.js'
import * as fb from '../firebase.js'

export default {
  data: () => ({
    //get's today's date and substrings it to only get date (not time)
    today: new Date().toISOString().substr(0,10),
    //Sets default focus to today
    focus: new Date().toISOString().substr(0,10),
    //Sets default  view to month
    type: "month",
    //maps view object to label in dropdown
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    //event attributes and default values
    name: null,
    details: null,
    start: null,
    end: null,
    color: "#1976D2",
    //if currently editing a value, store its ID
    currentlyEditing: null,
    //Set selected event to empty object by default
    selectedEvent: {},
    //Store the DOM element
    selectedElement: null,
    //Store if event card is open or not 
    selectedOpen: false,
    //new event dialog
    dialog: false,
    searchText: null,
    events: []
  }),
  //gets called when the component is mounted
  mounted() {
    this.events = this.getEvents();
    window.scrollTo(0,0);
    document.documentElement.style.overflow = 'hidden';
  },
  watch: {
    searchText: function (val) {
      if(val != null) {
        if (val == "") {
          this.getEvents()
        }
        else {
          this.getSearchedEvents()
        }
        
      }
      else {
        this.getEvents()
      }
    }
  },
  beforeDestroy() {
    document.documentElement.style.overflow = 'auto';
  },
  methods: {
    async getEvents() {
      this.$store.dispatch('getEvents')
      let tempEvents = this.$store.getters.getEvents
      
      for (event of tempEvents) {
        var user = await fb.usersCollection.doc(event.organisation).get()
        event.organisationName = user.data().name
      }
      this.events = tempEvents
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      console.log(this.selectedEvent.tags)
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    async getSearchedEvents() {
      let searchTextArray = this.searchText.toLowerCase().split(" ")
      await this.$store.dispatch('searchEvents', {searchArray: searchTextArray})
      let tempEvents = await this.$store.getters.getSearchedEvents
      console.log(searchTextArray)
      this.events = tempEvents
    },
  }
}
</script>

<style lang="scss">
  .v-card__text {
    font-size: 12px;
    padding-bottom: 0px;
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }
  @import '../assets/tags.scss';  
  #tags-basic-calendar {
    font-size: 12px!important;
    margin: 0 auto!important;
    padding: 0!important;
    display: inline-block!important;
    border: none!important;
    box-shadow: none!important;
    width: fit-content!important;
    clear: both!important;
    .b-form-tags-input {
      display: none!important;
    }
    
  }
  @import '../assets/LoginFormSCSS/app.scss';

  #searchText {
    width: 110rem;
  }
  .v-text-field__details {
      display: none;
    }
  #searchContainer {
    width: 100%;
    padding-left: 4rem;
    padding-right: 4rem;
  }
  .calendarSheet {
    margin-top: 2rem;
  }
</style>
