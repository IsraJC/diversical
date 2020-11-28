<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <section>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">

        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="email" placeholder="You@email.com" id="email1" required/>
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" required/>
          </div>
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>

        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Organisation Name</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Code First Girls" id="name" required/>
          </div>
          <div>
            <label for="description">Organisation Description</label>
            <input v-model.trim="signupForm.description" type="text" placeholder="Description" id="title" required/>
          </div>
          <div>
            <label for="email2">Email</label>
            <input v-model.trim="signupForm.email" type="email" placeholder="yourname@email.com" id="email2" required/>
          </div>
          <div>
            <label for="password2">Password</label>
            <input v-model.trim="signupForm.password" type="password" placeholder="min 6. characters" id="password2" required minlength="6"/>
          </div>
          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
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
      },
      // add signup form to data() 
      signupForm: {
        name: '',
        description: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        description: this.signupForm.description
      })
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    }
  }
}
</script>

<style lang="scss">
  #login {
    background-color: #EAEDE8;
    padding-top: 6vh!important;
  }
  @import '../assets/LoginFormSCSS/app.scss'
</style>
