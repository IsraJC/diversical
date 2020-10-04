<template>
  <div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet" type="text/css">
    <div id="nav">
      <nav class="navbar navbar-custom navbar-fixed-top" style> 
			    <ul class="nav navbar-nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/calendar">Calendar</router-link> |
            <router-link to="/login">Log In</router-link> |
            <router-link to="/signup">Sign Up</router-link> |
            <router-link to="/addevent">Add Event</router-link>
			    </ul>
	    </nav>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  .navbar-custom {
    background-color: #834B6B;
    margin-bottom: 0px !important;
  }

  .nav.navbar-nav {
    width: 100%;
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
    color: black;
    background-color: #A67F95;
  }

}
</style>
