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
            <label for="tags">Tags</label>
            <b-form-tags 
              id="tags-basic"
              v-model="tags" 
              separator=" ,;" 
              remove-on-delete
              tag-pills
              size="lg"
              tag-variant="primary"
              placeholder="Add tag here"
              ></b-form-tags>
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
      organisation: '',
      tags: []
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
        color: this.color,
        tags: this.tags
      })
    }
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

  #tags-basic { 
    display: block;
    width: 100%;
    height: 50px;
    margin-bottom: 3rem;
    font-size: 16px;
    padding: 10px;
    outline: 0;
    border: 1px solid #e6ecf0;
    border-radius: 3px;
    background-color: #F5F5F5;
    &:focus {
        box-shadow: 0 0 5px 0 rgba($dark, 0.2);
    }
    .btn {
        display: none;
        &:focus {
            display: none;
        }
    }
    .b-form-tags-input {
        &:focus {
            box-shadow: none;
        }
        padding-left: 0.5rem!important;
    }
    .badge {
        margin-right: 0.5rem;
        background-color: grey;
        color: white;
    }
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';
    @import '../../node_modules/bootstrap-vue/src/index.scss';
  }
</style>

