import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

const http = axios.create({ baseURL: 'http://localhost:3000/' })

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    user: {
      _id: null,
      username: null,
      jwtoken: null,
      isLoggedIn: false
    },
    posts: null
  },
  getters: {
    getPostById (state, getters) {
      return function (postid) {
        if (state.posts) return state.posts.find(post => post._id === postid)
      }
    }
  },
  mutations: {
    deletePost (state, postid) {
      const postIdx = state.posts.findIndex(post => post._id === postid)
      state.posts.splice(postIdx, 1)
    },
    addAllPostsToStore (state, posts) {
      state.posts = posts
    },
    setUserAndSaveToken (state, jwtoken) {
      const decodedToken = jwt.decode(jwtoken)
      state.user._id = decodedToken.id
      state.user.username = decodedToken.user
      state.user.jwtoken = jwtoken
      state.user.isLoggedIn = true

      localStorage.setItem('jwtoken::blog', jwtoken)
    },
    destroyUserAndToken (state) {
      state.user._id = null
      state.user.username = null
      state.user.jwtoken = null
      state.user.isLoggedIn = false

      localStorage.removeItem('jwtoken::blog')
    }
  },
  actions: {
    editPost (context, payload) {
      return new Promise((resolve, reject) => {
        http.put(`/post/${payload.postid}`, payload.post, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          location.reload()
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    deletePost (context, postid) {
      return new Promise((resolve, reject) => {
        http.delete(`/post/${postid}`, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          context.commit('deletePost', postid)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    createPost (context, post) {
      return new Promise((resolve, reject) => {
        http.post('/post', post, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          location.reload()
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getAllPosts (context) {
      return new Promise((resolve, reject) => {
        http.get('/post')
        .then(response => {
          const posts = response.data.payload
          context.commit('addAllPostsToStore', posts)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    signin (context, user) {
      return new Promise((resolve, reject) => {
        http.post('/signin', user)
        .then(response => {
          const jwtoken = response.data.payload.jwtoken
          context.commit('setUserAndSaveToken', jwtoken)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    signup (context, user) {
      return new Promise((resolve, reject) => {
        http.post('/signup', user)
        .then(response => {
          const jwtoken = response.data.payload.jwtoken
          context.commit('setUserAndSaveToken', jwtoken)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    signout (context) {
      context.commit('destroyUserAndToken')
    }
  }
})

export default store
