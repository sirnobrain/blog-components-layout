<template>
  <div id="post-details">
    <h2>{{post.title}}</h2>
    <p>by {{post.author.username}}</p>
    <div v-if="!!post.featured_image_url">
      <md-image :md-src="post.featured_image_url"></md-image>
    </div>
    <p>{{post.text}}</p>
  </div>
</template>

<script>

export default {
  name: 'PostDetails',
  computed: {
    post () {
      return this.$store.getters.getPostById(this.$route.params.id)
    }
  }
}
</script>

<style>
#post-details {
  width: 50%;
  margin: 0 auto;
}
.md-image {
  width: 100%;
}
p {
  font-size: 16px;
}
</style>
