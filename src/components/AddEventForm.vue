<template>
  <div>
    <h4 class="heading">Please fill in the form below to add an event to the calendar.</h4>
    <div>
    <FormulateForm @submit="createEvent">
      <FormulateInput v-model="title" label="Title" validation="required" />
      <FormulateInput type="date" v-model="date" label="Date" validation="required|date" />
      <FormulateInput type="time" v-model="starttime" label="Start Time" validation="required" />
      <FormulateInput type="time" v-model="endtime" label="End Time" validation="required" />
      <FormulateInput type="textarea" v-model="description" label="Description" validation="required" />
      <FormulateInput v-model="location" label="Location" validation="optional" />
      <FormulateInput type="url" v-model="meetinglink" label="Online Meeting Link" validation="optional|url" />
      <FormulateInput type="email" v-model="contactemail" label="Contact Email" validation="optional|email" />
      <FormulateInput type="submit" label="Submit"/>
    </FormulateForm>
    </div>
  </div>
</template>

<script>

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
  @import '../assets/snow.scss';

  .formulate-form {
    margin-top: 40px;
  }
</style>
