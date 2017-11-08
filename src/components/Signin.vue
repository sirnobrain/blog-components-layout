<template>
  <div class="auth">
      <md-whiteframe md-tag="section" id="signin">
        <form>
          <h3>Have an account? Sign in!</h3>
          <md-input-container>
            <label>Username</label>
            <md-input v-model="username"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Password</label>
            <md-input v-model="password"></md-input>
          </md-input-container>
          <p>Or you could <router-link to="/signup"> sign up and create an account</router-link></p>
          <md-button class="md-raised md-accent" @click="signin">
            Sign In
          </md-button>
        </form>
      </md-whiteframe>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signin () {
      const user = {username: this.username, password: this.password}
      this.$store.dispatch('signin', user)
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

#signin {
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
