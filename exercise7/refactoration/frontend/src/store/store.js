import Vue from 'vue'
import Vuex from 'vuex'
import blogService from "../services/blogService"

Vue.use(Vuex)

let notificationTimeoutID = null

export default new Vuex.Store({
  state: {
    notification: null,
    isError: false,
    blogs: []
  },
  mutations: {
    SET_NOTIFICATION(state, payload) {
      clearTimeout(notificationTimeoutID)
      state.notification = payload.notification
      state.isError = payload.isError || false
      notificationTimeoutID = setTimeout(
        () => {
          state.notification = null
          state.isError = false
        },
        payload.timeoutDuration || 5000
      )
    },
    DISMISS_NOTIFICATION(state) {
      state.notification = null
      state.isError = false
    },
    INITIALIZE_BLOGS(state, blogs) {
      state.blogs = blogs
    },
    ADD_BLOG(state, newBlog) {
      state.blogs = state.blogs.concat(newBlog)
    },
    ADD_UPVOTE(state, upvotedBlog) {
      state.blogs = state.blogs.map((blog) => {
        return (
          blog.id === upvotedBlog.id
            ? upvotedBlog
            : blog
        )
      })
    }
  },
  actions: {
    async initializeBlogs(context) {
      const blogs = await blogService.getBlogs()
      context.commit(
        "INITIALIZE_BLOGS",
        blogs
      )
    },
    async addBlog(context, payload) {
      const newBlog = await blogService.addBlog(payload)
      context.commit(
        "ADD_BLOG",
        newBlog
      )
    },
    async addUpvote(context, payload) {
      const upvotedBlog = await blogService.addUpvote(payload)
      context.commit(
        "ADD_UPVOTE",
        upvotedBlog
      )
    }
  },
  modules: {

  },
  getters: {

  }
})
