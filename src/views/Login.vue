<template>
  <div id="login">

    <section>

      <div class="col1">
        <h1>Log In</h1>
        <p>Welcome to <a href="" target="_blank">DiversiCal</a> a platform for students and professionals to find development and training events applicable to
        a diverse audience.</p>
      </div>

      <div class="col2">

        <form v-if="showLoginForm" @submit.prevent>

        <!--we add submit.prevent so the from doesn't submit as the default behavour of form is a page reload. We wan the login details to save to database without a reload-->
          <h1>Let's get you back in</h1>
          <div>
            <label for="email1">Email</label>
            <!-- the v-model is how  you bind data in vue.js -->
            <!-- the .trim is modifier -->
            <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div>

          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>

          <!---Create the login logic-->
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a>Forgot Password</a>
            <a>Create an Account</a>
          </div>

        </form>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    };
    showLoginForm: true
  }
}

methods: {
  login() 
  {
    this.$store.dispatch('login', {
      email: this.loginForm.email,
      password: this.loginForm.password
    })
  }
}

</script>

<style lang="scss">
  @import '../assets/scss/app.scss';
</style>