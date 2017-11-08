<template>
  <div class="auth">
      <md-whiteframe md-tag="section" id="signup">
        <form>
          <h3>Haven't got an account? Sign up!</h3>
          <md-input-container>
            <label>Username</label>
            <md-input v-model="username"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Password</label>
            <md-input v-model="password"></md-input>
          </md-input-container>
          <p>Already have an account? <router-link to="/signin">Sign in</router-link></router-link></p>
          <md-button class="md-raised md-accent" @click="signup">
            Sign Up
          </md-button>
        </form>
      </md-whiteframe>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signup () {
      const user = {username: this.username, password: this.password}
      this.$store.dispatch('signup', user)
      .then(() => {
        this.$router.replace('/')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.auth {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 32px 0;
}

#signup {
  width: 30%;
}

form {
  width: 100%;
  margin: 0 auto;
  padding: 32px 64px;
  border-radius: 4px;
}

.md-button {
  width: 100%;
  margin: 0 auto;
}
</style>
