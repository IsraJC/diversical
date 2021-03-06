<template>
  <div id="home">
    
      <v-app id="inspire">
        <v-carousel
          cycle
          height="600"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(event, i) in events"
            :key="i"
          >
            <v-sheet
              :color="colors[i]"
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="carousel">
                  <v-avatar size="80" class="avatar">
                    <v-img v-bind:src='event.logo'></v-img>
                  </v-avatar>
                  <h1 @click="goToCalendar(event)">{{ event.name }}</h1>
                  <p class="desc">
                    {{event.description}}<br/>
                  </p>
                  <p class="details"> 
                    Starts: {{event.startDisplay}}<br/>
                    Ends: {{event.endDisplay}}<br/><br/>
                    <div v-if=event.location>Location: {{event.location}}<br/> </div>
                  </p>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-app>

      <div class="col2">
        <div class="row">
          <div class="col-md-4">
            <img src="../images/DiversiCal_logo.png">
          </div>
          <div class="col-md-8">
            <p>DiversiCal is a resource which "compiles" diversity-centered events such as hackathons, seminars, workshops and talks.
            Companies can sign up, login and add events, which will be displayed on the calendar.</p>
          </div>
        </div>
      </div>

  </div>
</template> 

<script>
import * as fb from '../firebase.js'
import moment from 'moment'
import router from '../router/index.js'
import {eventBus} from "../main.js";
export default {
  data () {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      events: [],
    }
  },
  mounted() {
    this.events = this.getEvents();
    window.scrollTo(0,0);
  },
  methods: {
    async getEvents() {
      this.$store.dispatch('getEvents')
      let tempEvents = this.$store.getters.getEvents
      
      for (event of tempEvents) {
        var user = await fb.usersCollection.doc(event.organisation).get()
        event.organisationName = user.data().name
        event.logo = user.data().logo
        event.startDisplay = moment(event.start).format('dddd Do MMMM hh:mm A')
        event.endDisplay = moment(event.end).format('dddd Do MMMM hh:mm A')
      }
      this.events = tempEvents
    },
    goToCalendar(event) {
      eventBus.$emit('goToCalendar', event);
      router.push('/calendar')
    }
  }
}
</script>


<style scoped lang="scss">
  #home {
    background-color: #EAEDE8;
  }
  img {
    max-width: 100%;
    position: relative;
    top: 0%;
    padding-left: 70px;
  }
  section {
    margin-top: 0px;
  }
  .col2 {
    padding: 0px;
    background-color: white;
    margin-top:  -160px;
  } 
  p {
    font-size: 18px;
    text-align: center;
    position: relative;
    top: 10%;
    padding-left: 20px;
    padding-right: 70px;
  }
  v-carousel {
    margin: 20px;
    padding-top: 20px;
    height: 100%
  }
  .carousel {
    h1 {
      font-size: 4rem;
      text-align: center;
      padding: 2rem;
      margin: 1rem;
    }
    p {
      text-align: center;
      padding: 2rem;
      padding-top: 0rem;
      margin: 1rem;
    }
    .desc {
        font-size: 2rem;
    }
    .details {
      font-size: 1.5rem;  
    }
  }
  #col-md-6 {
    margin-top: -100px;
  }
  
  @import '../assets/LoginFormSCSS/app.scss';
  
</style>