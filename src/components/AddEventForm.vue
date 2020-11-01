<template>
  <div id="addEvent">
    <section>
    
    <div class="col2" id="addEventcol2">

      <form @submit.prevent>
          <h2>Fill in the form below to add an event</h2>
          <div>
            <label for="name">Title*</label>
            <input v-model.trim="name" type="text" placeholder="Enter title of event here" id="name" required />
          </div>
          <div>
            <label for="start">Start*</label>
            <input v-model.trim="start" type="datetime-local" placeholder="" id="start" required />
          </div>
          <div>
            <label for="end">End*</label>
            <input v-model.trim="end" type="datetime-local" placeholder="" id="end" required />
          </div>
          <div>
            <label for="description">Description*</label>
            <textarea v-model.trim="description" placeholder="Enter description of event here" id="descripion" required />
          </div>
          <div>
            <label for="location">Location</label>
            <input v-model.trim="location" type="text" placeholder="Enter location of event here" id="location" />
          </div>
          <div>
            <label for="meetinglink">Meeting Link</label>
            <input v-model.trim="meetinglink" type="url" placeholder="Enter online meeting link here" id="meetinglink" />
          </div>
          <div>
            <label for="contactemail">Contact Email</label>
            <input v-model.trim="contactemail" type="email" placeholder="Enter contact email here" id="contactemail" />
          </div>
          <div>
            <label for="color">Colour</label>
            <input v-model.trim="color" type="color" value="#2196F3" id="color" />
          </div>
          <button @click="createEvent" class="button">Submit</button>
        </form>


   
    </div>
    </section>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      name: '',
      start: '',
      end: '',
      starttime: '',
      endtime: '',
      description: '',
      location: '',
      meetinglink: '',
      contactemail: '',
      color: '#2196F3',
      organisation: ''
    }
  },
  methods: {
    createEvent () {
      this.$store.dispatch('addEvent', {
        name: this.name,
        start: this.start,
        end: this.end,
        starttime: this.starttime,
        endtime: this.endtime,
        description: this.description,
        location: this.location,
        meetinglink: this.meetinglink,
        contactemail: this.contactemail,
        color: this.color
      })
    },
  }
}
</script>

<style lang="scss">
  h2 {
    padding-bottom: 20px;
  }
  #color {
    height: 50px;
  }
  @import '../assets/LoginFormSCSS/app.scss';
</style>
