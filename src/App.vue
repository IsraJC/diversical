<template>
  <div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet" type="text/css">
    <div id="nav">
      <nav class="navbar navbar-custom navbar-fixed-top" style> 
			    <ul class="nav navbar-nav navbar-center">
            <ul class="navbar-nav navbar-left"> 
              <a class="disabled"></a>
              <a class="disabled"></a>
            </ul>
            <router-link to="/">Home</router-link> |
            <router-link to="/calendar">Calendar</router-link> |
            <router-link to="/addevent">Add Event</router-link>
            <ul class="navbar-nav navbar-right"> 
              <div  v-show="user">
                <router-link to="/account" class="leftIcons"><v-icon> mdi-account-circle </v-icon></router-link> |
                <a @click="logout()" class="leftIcons" id="logout"><span class="glyphicon glyphicon-log-out"></span></a>
              </div>
              <router-link v-show="!user" to="/login">Sign In</router-link>
            </ul>
          </ul>
	    </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import * as firebase from 'firebase/app'


export default {
  data () {
    return {
      user: ''
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  created: function () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = true;
        } else {
          this.user = false;
        }
      });
   }
}


</script>


<style lang="scss">

$bg-color: #EAEDE8;
$text-color: #2C302E;

html, body {
  background-color: $bg-color;
  height: fit-content;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  min-height: 100%;
  height: fit-content;
}
#nav {
  
  height: 6vh;
  position: relative;
  .navbar-custom {
    background-color: #358280;
    margin-bottom: 0vh !important;
  }
  .nav.navbar-nav {
    width: 100%;
  }
 
  /* links on header */
  .nav.navbar-nav a {
    color: white;
    padding-left: 5vh;
    padding-right: 5vh;
    font-size: 14pt;
    display: inline-block;
    padding-top: 1.5vh;
    padding-bottom: 1.5vh;
  }
  /* links on header when hovered */
  .nav.navbar-nav a:hover {
    color: #2C302E;
    text-decoration: none;
    background-color: #358280;
  }

  .nav.navbar-nav a.router-link-exact-active {
    text-decoration: none;
    background-color: darken(#358280, 10%);
  }

  .v-icon {
    color: white;
    
  }
  .v-icon:hover {
      color: #2C302E!important;
  }

  .leftIcons {
    padding-left: 2.5vh!important;
    padding-right: 2.5vh!important;
  }
  #logout {
    padding-right: 4vh!important;
  }
  .disabled {
    pointer-events: none;
  }

}

</style>
