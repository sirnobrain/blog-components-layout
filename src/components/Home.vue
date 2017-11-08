<template>
  <div>
  <md-card v-for="post in posts" :key="post._id">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{post.title}}</div>
        <div class="md-subhead"> by {{post.author.username}}</div>
      </md-card-header-text>
    </md-card-header>

    <md-card-actions>
      <md-button id="edit-post-btn" @click="openEditPost(post._id)">Edit</md-button>
      <md-button @click="deletePost(post._id)">Delete</md-button>
      <md-button @click="gotoDetails(post._id)">Details</md-button>
    </md-card-actions>
  </md-card>

    <md-dialog md-open-from="#edit-post-btn" @close="editPostClosed" md-close-to="#edit-post-btn" ref="edit-post">
      <md-dialog-title>Edit Post</md-dialog-title>

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
        <md-button class="md-primary" @click="closeEditPost">Cancel</md-button>
        <md-button class="md-primary" @click="editPost">Edit Post</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      postid: '',
      title: '',
      text: '',
      featured_image_url: ''
    }
  },
  computed: {
    posts () {
      return this.$store.state.posts
    }
  },
  methods: {
    gotoDetails (postid) {
      this.$router.push(`/post/${postid}`)
    },
    deletePost (postid) {
      this.$store.dispatch('deletePost', postid)
      .then(() => {
        console.log('Post deleted')
      })
      .catch(err => {
        console.log(err)
      })
    },
    openEditPost (postid) {
      const post = this.posts.find(post => post._id === postid)
      this.postid = post._id
      this.title = post.title
      this.text = post.text
      this.featured_image_url = post.featured_image_url

      this.$refs['edit-post'].open()
    },
    closeEditPost (postid) {
      this.$refs['edit-post'].close()
    },
    editPostClosed () {
      this.postid = ''
      this.title = ''
      this.text = ''
      this.featured_image_url = ''
    },
    editPost () {
      const payload = {
        postid: this.postid,
        post: {
          title: this.title,
          text: this.text,
          featured_image_url: this.featured_image_url
        }
      }

      console.log('PAYLOAD', payload)
      this.$store.dispatch('editPost', payload)
      .then(() => {
        this.$refs['edit-post'].close()
        console.log('Post edited')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card {
  width: 50%;
  margin: 8px auto;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
