<template>
  <div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet" type="text/css">
    <div id="nav">
      <nav class="navbar navbar-custom navbar-fixed-top" style> 
			    <ul class="nav navbar-nav navbar-center">
            <ul class="navbar-nav navbar-left"> 
              <a></a>
            </ul>
            <router-link to="/">Home</router-link> |
            <router-link to="/calendar">Calendar</router-link> |
            <router-link to="/addevent">Add Event</router-link>
            <ul class="navbar-nav navbar-right"> 
              <a v-if="loggedIn" @click="logout()"><span class="glyphicon glyphicon-log-out"></span></a>
              <router-link v-else to="/login">Log In</router-link>
            </ul>
          </ul>
	    </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { auth } from 'firebase' 

export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    loggedIn: function() {
      console.log("user: " + auth.currentUser)
      if (auth.currentUser) {
        return true
      }
      else {
        return false
      }
    }
  }
}


</script>


<style lang="scss">

$bg-color: #EAEDE8;
$text-color: #2C302E;

html {
  background-color: $bg-color;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
}
#nav {
  margin-bottom: 40px;
  .navbar-custom {
    background-color: #358280;
    margin-bottom: 0px !important;
  }
  .nav.navbar-nav {
    width: 100%;
  }
  .navbar-nav.navbar-center {
    position: relative;
    left:50%;
    transform: translatex(-50%);
  }
  /* links on header */
  .nav.navbar-nav a {
    color: white;
    padding-left: 40px;
    padding-right: 40px;
    font-size: 14pt;
    display: inline-block;
    padding-top: 10px;
    padding-bottom: 10px;
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
}

</style>
