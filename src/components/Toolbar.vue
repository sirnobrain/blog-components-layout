<template>
  <md-toolbar class="md-dense">
    <md-button @click="goHome">
      BLOG!!!
    </md-button>

    <span style="flex: 1"></span>

    <md-button class="md-icon-button" v-show="user.isLoggedIn" @click="signout">
      <md-icon>power_settings_new</md-icon>
      <md-tooltip md-direction="bottom">Sign Out</md-tooltip>
    </md-button>

    <md-button class="md-dense" v-show="!user.isLoggedIn" @click="gotoSignin">
      Sign In
    </md-button>

    <md-button class="md-dense md-raised" v-show="!user.isLoggedIn" @click="gotoSignup">
      Sign Up
    </md-button>
  </md-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  methods: {
    signout () {
      this.$store.dispatch('signout')
    },
    gotoSignin () {
      this.$router.push('/signin')
    },
    gotoSignup () {
      this.$router.push('/signup')
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
