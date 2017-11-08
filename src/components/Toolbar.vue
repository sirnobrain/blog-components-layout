<template>
  <md-toolbar class="md-dense">
    <md-button @click="goHome">
      BLOG!!!
    </md-button>

    <span style="flex: 1"></span>

    <md-button v-show="user.isLoggedIn" @click="openCreatePost"
    id="create-post-btn" class="md-icon-button">
      <md-icon>add</md-icon>
      <md-tooltip md-direction="bottom">Create Post</md-tooltip>
    </md-button>

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

    <md-dialog md-open-from="#create-post-btn" @close="createPostClosed"
    md-close-to="#create-post-btn" ref="create-post">
      <md-dialog-title>Create New Post</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label>Title</label>
            <md-input v-model="title" required></md-input>
          </md-input-container>

          <md-input-container>
            <label>Text</label>
            <md-textarea v-model="text" required></md-textarea>
          </md-input-container>

          <md-input-container>
            <label>Image URL</label>
            <md-input v-model="featured_image_url"></md-input>
          </md-input-container>

          <div>
            <md-image :md-src="featured_image_url"></md-image>
          </div>

        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeCreatePost">Cancel</md-button>
        <md-button class="md-primary" @click="createPost">Create Post</md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      title: '',
      text: '',
      featured_image_url: ''
    }
  },
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  methods: {
    createPost () {
      const post = {
        title: this.title,
        text: this.text,
        featured_image_url: this.featured_image_url
      }

      this.$store.dispatch('createPost', post)
      .then(() => {
        this.$refs['create-post'].close()
      })
    },
    openCreatePost () {
      this.$refs['create-post'].open()
    },
    closeCreatePost () {
      this.$refs['create-post'].close()
    },
    createPostClosed () {
      this.title = ''
      this.text = ''
      this.featured_image_url = ''
    },
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
