<template>
  <div class="fill-height">
  
  
  <v-container fluid ma-0 pa-0 class="container">
  <v-row no-gutters class="fill-height">
  <v-col cols="2">
    <v-card class="fill-height">
      <v-navigation-drawer class="nav-drawer"
        permanent
        left
      >
        <v-list>
          <v-list-item>
            <div class="avatar-upload">
              <div class="avatar-edit">
                <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" @change="uploadImage"/>
                <label for="imageUpload"><v-icon>mdi-pencil</v-icon></label>
              </div>
              <v-list-item-avatar size="100" class="avatar">
                <v-img v-bind:src='organisationDetails.logo'></v-img>
              </v-list-item-avatar>
            </div>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ user.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="email">{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider class="divider"></v-divider>

        <v-list
          nav
        >
          <v-list-item link @click="view='My Account'">
            <v-list-item-icon>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="nav-title">My Account</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="view='My Events'">
            <v-list-item-icon>
              <v-icon>mdi-calendar-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="nav-title">My Events</v-list-item-title>
          </v-list-item>
          <!-- <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-navigation-drawer>
    </v-card>
    </v-col>

    <!-- My Account -->
    <v-col  v-if="view=='My Account'" cols="10" class="fill-height">

    <v-card elevation="2" class="content">
      <form @submit.prevent class="form">
        <h2>Organisation Profile</h2>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="name">Organisation Name</label></div>
            <div class="formItemInput"><input type="text" v-model.trim="organisationDetails.name" :placeholder="organisationDetails.name" id="name"/></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="description">Organisation Description</label></div>
            <div class="formItemInput"><input v-model.trim="organisationDetails.description" type="text" :placeholder="organisationDetails.description" id="title"/></div>
          </v-container>
        </div>
        <div class="clearfix">
          <button @click="saveProfile(true)" class="button buttonRight" id="save-button">Save</button>
        </div>
      </form>
    </v-card>

    <v-card elevation="2" class="content">
      <form @submit.prevent class="form">
        <h2>Account Details</h2>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="email">Email Address</label></div>
            <div class="formItemInput"><input type="email" v-model.trim="accountDetails.email" :placeholder="accountDetails.email" id="email"/></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="description">Password</label></div>
            <div class="formItemInput"><input v-model.trim="accountDetails.password" type="password" id="password" /></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="description">Confirm Password</label></div>
            <div class="formItemInput"><input v-model.trim="accountDetails.confirmPassword" type="password" id="confirmPassword" /></div>
          </v-container>
        </div>
        <div class="clearfix">
          <v-container class="formItemContainer">
            <div class="twoButtons">
              <button @click="itemToDelete='account' ; dialog=true" class="button buttonLeft" id="delete-account-button">Delete Account</button>
              <button @click="saveDetails()" class="button buttonRight" id="save-button">Save</button>
            </div>
          </v-container>
        </div>
      </form>
    </v-card>

  </v-col>

  <!-- My Events -->
  <v-col  v-if="view=='My Events'" cols="10" class="fill-height">

    <v-card elevation="2" class="content">
      <h2>Events</h2>
      <v-list class="eventsList">
        <v-list-item-group v-model="model">
          <div v-for="event in userEvents" :key="event.name">
            <v-divider class="divider"></v-divider>
            <div class="clearfix event">
              <v-list-item @click="selectedEvent=event ; view='Edit Event'"> 
                <v-list-item-content class="eventContent">
                  <v-list-item-title class="eventTitle">{{ event.name }}</v-list-item-title>
                  <v-list-item-subtitle class="eventDetails"> {{moment(event.start).format('dddd Do MMMM hh:mm A')}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon class="chevron">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </div>
          </div>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-col>
  
  <!-- Edit Event -->
  <v-col  v-if="view=='Edit Event'" cols="10" class="fill-height">

    <v-card elevation="2" class="content">
      <form @submit.prevent class="form">
        <h2>Edit Event</h2>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="name">Title*</label></div>
            <div class="formItemInput"><input v-model.trim="selectedEvent.name" type="text" :placeholder="selectedEvent.name" id="name" required /></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="start">Start*</label></div>
            <div class="formItemInput"><input v-model.trim="selectedEvent.start" type="datetime-local" :placeholder="selectedEvent.start" id="start" required /></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="end">End*</label></div>
            <div class="formItemInput"><input v-model.trim="selectedEvent.end" type="datetime-local" :placeholder="selectedEvent.end" id="end" required /></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="description">Description*</label></div>
            <div class="formItemInput"><textarea v-model.trim="selectedEvent.description" :placeholder="selectedEvent.description" id="descripion" required /></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="location">Location</label></div>
            <div class="formItemInput"><input v-model.trim="selectedEvent.location" type="text" :placeholder="selectedEvent.location" id="location" /></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="meetinglink">Meeting Link</label></div>
            <div class="formItemInput"><input v-model.trim="selectedEvent.meetinglink" type="url" :placeholder="selectedEvent.meetinglink" id="meetinglink" /></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="contactemail">Contact Email</label></div>
            <div class="formItemInput"><input v-model.trim="selectedEvent.contactemail" type="email" :placeholder="selectedEvent.contactemail" id="contactemail" /></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="tags">Tags</label></div>
            <div class="formItemInput"><b-form-tags 
              id="tags-basic"
              v-model="selectedEvent.tags" 
              separator=" ,;" 
              remove-on-delete
              tag-pills
              size="lg"
              tag-variant="primary"
              placeholder="Add tag here"
              ></b-form-tags></div>
          </v-container>
        </div>
        <div>
          <v-container class="formItemContainer">
            <div class="formItemLabel"><label for="color">Colour</label></div>
            <div class="formItemInput"><input v-model.trim="selectedEvent.color" type="color" :placeholder="selectedEvent.color" id="color" /></div>
          </v-container>
        </div>
        <div class="clearfix">
          <v-container class="formItemContainer">
            <div class="twoButtons">
              <button @click="itemToDelete='event' ; dialog=true" class="button buttonLeft" id="delete-event-button">Delete Event</button>
              <button @click="updateEvent()" class="button buttonRight" id="save-button">Save</button>
            </div>
          </v-container>
        </div>
      </form>
    </v-card>

  </v-col>

  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
      id="delete-account-dialog">
      <v-card>
        <v-card-title v-if="itemToDelete=='account'" class="dialogTitle">
          Delete Account
        </v-card-title>
        <v-card-title v-else-if="itemToDelete=='event'" class="dialogTitle">
          Delete Event
        </v-card-title>
        <v-card-text v-if="itemToDelete=='account'" class="dialogText">Are you sure you want to delete your account?<br/>This will also delete all of your events.</v-card-text>
        <v-card-text v-else-if="itemToDelete=='event'" class="dialogText">Are you sure you want to delete this event?</v-card-text>
        <v-card-actions>
          <v-btn
            class="dialogButton"
            color="red darken-1"
            text
            @click="dialog = false"
          >
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="dialogButton"
            color="green darken-1"
            text
            @click="deleteItem()"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
  </v-container>
  </div>
</template>

<script>
import { auth } from '../firebase.js'

export default {
  data: () => ({
    user: null,
    dialog: false,
    view: "My Account",
    model: 1,
    events: [],
    userEvents: [],
    selectedEvent: null,
    itemToDelete: null,
    organisationDetails: {
      name: null,
      description: null,
      logo: null,
    },
    accountDetails: {
      email: null,
      password: null,
      confirmPassword: null
    }
  }),
  mounted() {
    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.append(app);
    this.user = this.$store.getters.getUser;
    this.organisationDetails = this.user;
    this.accountDetails.email = auth.currentUser.email;
    this.$store.dispatch('getEvents');
    this.events = this.$store.getters.getEvents;
    this.filterEvents();
  },
  beforeDestroy() {
    document.documentElement.style.overflow = 'auto';
    console.log(this.itemToDelete)
  },
  methods: {
    saveProfile(showAlert) {
      this.$store.dispatch('saveProfile', this.organisationDetails, this.user, showAlert)
    },
    saveDetails() {
      if (this.accountDetails.password == null || this.accountDetails.confirmPassword == null) {
        alert("Please enter your password and confirm it to save")
      }
      else if (this.accountDetails.password == this.accountDetails.confirmPassword) {
        this.$store.dispatch('saveAccountDetails', this.accountDetails, this.user)
      } else {
        alert("The passwords do not match.")
      }
    },
    deleteAccount() {
      if (this.accountDetails.password == null || this.accountDetails.confirmPassword == null) {
        this.dialog = false;
        alert("Please enter your password and confirm it to delete your account.")
      }
      else if (this.accountDetails.password == this.accountDetails.confirmPassword) {
        this.dialog = false;
        auth.signInWithEmailAndPassword(this.accountDetails.email, this.accountDetails.password)
        .then((user) => {
         this.$store.dispatch('deleteAccount');
         for (var event of this.userEvents) {
          this.$store.dispatch('deleteEvent', event, false)
        }
      })
      .catch((error) => {
        this.dialog=false
        var errorCode = error.code
        var errorMessage = error.message
        alert("An error occurred: " + errorMessage)
      });
      } else {
        this.dialog=false;
        alert("The passwords do not match.")
      }
    },
    filterEvents() {
      var list = [];
      
      for (var i of this.events) {
        if (i.organisation == this.$store.getters.getUserID) {
          list.push(i)
        }
      }
      this.userEvents = list
    },
    updateEvent() {
      this.$store.dispatch('updateEvent', this.selectedEvent)
      console.log(this.selectedEvent)
    },
    deleteEvent() {
      this.$store.dispatch('deleteEvent', this.selectedEvent, true)
      this.dialog = false;
    },
    deleteItem() {
      if (this.itemToDelete == 'account') {
        this.deleteAccount()
      }
      else if (this.itemToDelete == 'event') {
        this.deleteEvent()
      }
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
          this.organisationDetails.logo = e.target.result;
      };
      this.saveProfile(false);
    }
  }
}
</script>


<style lang="scss" scoped>
  template {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  .title {
    font-size: 18px;
  }

  .email {
    font-size: 12px;
    padding: 0.5vh;
  }

  .nav-title {
    font-size: 12px;
  }

  .divider {
    margin: 0vh;
  }

  .avatar {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3vh;
  }

  .container {
    width:  100%;
    height: 100%!important;
    margin: 0vh;
    margin-right: 0px;
    margin-top: -1vh;
    background-color: #EAEDE8;
    padding-bottom: 0;
  }

  .fill-height {
    min-height: 93.5vh!important;
  }

  .content {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5vh;
    margin-bottom: 5vh;
    width:  80%;
    padding: 1vh;
  }

  .nav-drawer {
    width: 100%!important;
    height: 100%!important;
  }

  .form {
    h2 {
      margin-bottom: 2vh;
    }
    label {
     float: left;
     text-align: left;
     width: 100%;
     margin: 1rem;
     line-height: 6vh;
    }
    input, textarea, .b-form-tags {
      width: 100%;
      margin: 1rem;
      font-size: 16px;
      float: right;
      padding: 1.5vh;
      outline: 0;
      border: 1px solid #e6ecf0;
      border-radius: 3px;
      background-color: #F5F5F5;
      &:focus {
          box-shadow: 0 0 5px 0 rgba(#34495E, 0.2);
      } 
    }
    div {
       width:  100%;
    }
    .formItemContainer {
      all: revert;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1vh;
      padding-right: 3vh;
      padding-left: 3vh;
    }
    .formItemLabel {
      flex-basis: 30%;
    }
    .formItemInput {
      flex-basis: 70%;
    }
    .twoButtons {
      .button {
        margin-right: 1vh;
        margin-left: 1vh;
      }
    }
    .buttonRight {
      float: right;
      clear: right;
    }
    .buttonLeft {
      float: left;
      clear: left;
    }

  }

  .button {
  background: #474A48;
  border: 0;
  outline: 0;
  color: white;
  padding: 0.8rem 1rem;
  margin-right: 4vh;
  margin-left: 4vh;
  margin-top: 2vh;
  margin-bottom: 2vh;
  min-width: 150px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
      background: lighten(#474A48, 5%);
  }
  &:disabled {
      opacity: 0.5;
      &:hover {
          background: #474A48;
      }
  }  
}
#delete-account-button, #delete-event-button {
  background: #b71c1c;
  &:hover {
      background: lighten(#b71c1c, 5%);
  }
  &:disabled {
      opacity: 0.5;
      &:hover {
          background: #b71c1c;
      }
  }
}

.dialogTitle {
  font-size: 18px!important;
  text-align: center!important;
  display: block;
}
.dialogText {
  font-size: 12px!important;
  text-align: center;
  padding-top: 2vh!important;
  padding-bottom: 1vh!important;
}
.dialogButton {
  margin-right: 1vh;
  margin-left: 1vh;
  font-size: 9.5px;
}
.eventTitle {
  font-size: 16px;
  padding: 0.5vh;
  text-align: left;
}
.eventDetails {
  font-size:  10px;
  padding: 0.5vh;
  text-align: left;
}
.chevron {
  font-size: 4vh;
  display: inline-flex;
  vertical-align: middle;
  margin: 0px;
}
.event {
  padding: 0vh;
}
h2 {
  padding: 0vh;
}
.eventContent {
  padding: 0vh;
} 
#color {
    height: 50px;
}
#tags-basic { 
  margin-bottom: 10px!important;
}
@import '../assets/tags.scss';
.avatar-upload {
    position: relative;
    max-width: 15vh;
    margin: 1rem auto;
    .avatar-edit {
        position: absolute;
        right: 0.5rem;
        z-index: 1;
        bottom: 0.5rem;
        input {
            display: none;
            + label {
                margin: 0;
                display: inline-block;
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 100%;
                background: #FFFFFF;
                border: 1px solid transparent;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
                cursor: pointer;
                font-weight: normal;
                transition: all .2s ease-in-out;
                &:hover {
                    background: #f1f1f1;
                    border-color: #d6d6d6;
                }
                &:after {
                    color: #757575;
                    position: absolute;
                    text-align: center;
                    margin: auto;
                }
                .v-icon {
                  position: relative;
                  padding-top: 0.5rem;
                  margin: 0 auto;
                  align-self: center;
                }
            }
        }
    }
}  
</style>