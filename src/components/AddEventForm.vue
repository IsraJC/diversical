<template>
  <div id="addEvent">
    <section>
    
    <div class="col2" id="addEventcol2">
    <FormulateForm>
      <h2>Fill in the form below to add an event</h2>
      <FormulateInput v-model="title" label="Title" validation="required" />
      <FormulateInput type="date" v-model="date" label="Date" validation="required|date" />
      <FormulateInput type="time" v-model="starttime" label="Start Time" validation="required" />
      <FormulateInput type="time" v-model="endtime" label="End Time" validation="required" />
      <FormulateInput type="textarea" v-model="description" label="Description" validation="required" />
      <FormulateInput v-model="location" label="Location" validation="optional" />
      <FormulateInput type="url" v-model="meetinglink" label="Online Meeting Link" validation="optional|url" />
      <FormulateInput type="email" v-model="contactemail" label="Contact Email" validation="optional|email" />
      <button @click="createEvent" class="button">Submit</button>
    </FormulateForm>
    </div>
    </section>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      title: '',
      date: '',
      starttime: '',
      endtime: '',
      description: '',
      location: '',
      meetinglink: '',
      contactemail: ''
    }
  },
  methods: {
    createEvent () {
      this.$store.dispatch('addEvent', {
        title: this.title,
        date: this.date,
        starttime: this.starttime,
        endtime: this.endtime,
        description: this.description,
        location: this.location,
        meetinglink: this.meetinglink,
        contactemail: this.contactemail
      })
    }
  }
}
</script>

<style lang="scss">
  h2 {
    padding-bottom: 20px;
  }
  @import '../assets/LoginFormSCSS/app.scss';
  @import '../assets/snow.scss'
</style>
