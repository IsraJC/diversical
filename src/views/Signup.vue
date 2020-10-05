 <!--Create the signup logic.-->
<template>
  <form @submit.prevent>
    <div class="signup">

      <h1>Sign Up</h1>
      <h2>Please fill in this form to create an account.</h2> 
      <p>Organisation don't need to sign up, instead add your event using the add event forum rather than sign up.</p>
      <hr>

      <div>
        <label for="firstname"><b>First Name</b></label>
        <input v-model.trim="signupForm.fname" type="text" placeholder="Enter First name" id="firstname" required />
      </div>

      <div>
        <label for="lastname"><b>Last Name</b></label>
        <input v-model.trim="signupForm.lname" type="text" placeholder="Enter Last name" id="lastname" required />
      </div>

      <div>
        <label for="email2"><b>Email</b></label>
        <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" required s/>
      </div>

      <div>
        <label for="password2"><b>Password</b></label>
        <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" required/>
      </div>

      <label><input type="checkbox" checked="checked" name="remember" > Remember me</label>
      <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms and Privacy</a>conditions.</p>
      
      <div class="clearfix">
        <button @click="onCancel()" class="button">Cancel</button>
        <button @click="signup()" class="button">Sign Up</button>
      </div>

      <div class="extras">
        <a>Back to Log In</a>
      </div>

    </div>
  </form>
</template>

<script>
export default {
  data(){
    return {
      signupForm: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
    }
  }
}
methods: {
  //Create the signup method.
    signup()
    {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        firstname: this.signupForm.firstname,
        lastname: this.signupForm.lastname
      })
    }

    onCancel()
    {
      console.log('CANCEL SUBMIT');
      this.show = false;
      this.$router.push({ name: 'users' });
    }
}
</script>

<style lang="scss">
  @import '../assets/scss/app.scss';
</style>
