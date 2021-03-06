import Vue from 'vue'
import Vuex from 'vuex'
import blogService from "../services/blogService"
import logInService from "../services/logInService"
import userService from "../services/userService"

Vue.use(Vuex)

let notificationTimeoutID = null

const getUserFromLocalStorage = () => {
  const userFromLocalStorage = localStorage.getItem("loggedIn")
  if (userFromLocalStorage) {
    const user = JSON.parse(userFromLocalStorage)
    blogService.setToken(user.token)
    return user
  }
}

export default new Vuex.Store({
  state: {
    notification: null,
    isError: false,
    blogs: [],
    loggedIn: getUserFromLocalStorage() || null,
    users: [],
    individualUser: null,
    individualBlog: null
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
    INITIALIZE_USERS(state, users) {
      state.users = users
    },
    INITIALIZE_INDIVIDUAL_USER(state, individualUser) {
      state.individualUser = individualUser
    },
    INITIALIZE_INDIVIDUAL_BLOG(state, individualBlog) {
      state.individualBlog = individualBlog
    },
    ADD_BLOG(state, newBlog) {
      state.blogs = state.blogs.concat(newBlog)

      state.users = state.users.map((user) => {
        return (
          user.id === newBlog.user
            ? {
              ...user,
              blogs: user.blogs.concat(newBlog)
            }
            : user
        )
      })
    },
    ADD_UPVOTE(state, upvotedBlog) {
      state.blogs = state.blogs.map((blog) => {
        return (
          blog.id === upvotedBlog.id
            ? upvotedBlog
            : blog
        )
      })
      state.individualBlog = upvotedBlog
    },
    DELETE_BLOG(state, deletedBlogID) {
      state.blogs = state.blogs.filter((blog) => {
        return blog.id !== deletedBlogID
      })

      state.users = state.users.map((user) => {
        return (
          user.blogs.some((blog) => blog.id === deletedBlogID)
            ? {
              ...user,
              blogs: user.blogs.filter((blog) => {
                return blog.id !== deletedBlogID
              })
            }
            : user
        )
      })
    },
    LOG_IN(state, loggedIn) {
      state.loggedIn = loggedIn
      blogService.setToken(loggedIn.token)
      localStorage.setItem(
        "loggedIn",
        JSON.stringify(loggedIn)
      )
    },
    LOG_OUT(state) {
      state.loggedIn = null
      blogService.setToken(null)
      localStorage.removeItem("loggedIn")
    },
    ADD_COMMENT(state, commentedBlog) {
      state.individualBlog = commentedBlog
      state.blogs = state.blogs.map((blog) => {
        return (
          blog.id === commentedBlog.id
            ? commentedBlog
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
    async initializeUsers(context) {
      const users = await userService.getUsers()
      context.commit(
        "INITIALIZE_USERS",
        users
      )
    },
    async initializeIndividualUser(context, userID) {
      const individualUser = await userService.getUserByID(userID)
      context.commit(
        "INITIALIZE_INDIVIDUAL_USER",
        individualUser
      )
    },
    async initializeIndividualBlog(context, blogID) {
      const individualBlog = await blogService.getBlogByID(blogID)
      context.commit(
        "INITIALIZE_INDIVIDUAL_BLOG",
        individualBlog
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
    },
    async deleteBlog(context, blogID) {
      await blogService.deleteBlog(blogID)
      context.commit(
        "DELETE_BLOG",
        blogID
      )
    },
    async logIn(context, credentials) {
      const loggedIn = await logInService.logIn(credentials)
      context.commit(
        "LOG_IN",
        loggedIn
      )
    },
    async addComment(context, payload) {
      const commentedBlog = await blogService.addComment(
        payload.blogID,
        payload.commentInput
      )
      context.commit(
        "ADD_COMMENT",
        commentedBlog
      )
    }
  },
  modules: {

  },
  getters: {
    sortedBlogs: (state) => {
      return [...state.blogs].sort((a, b) => {
        return b.upvotes - a.upvotes
      })
    }
  }
})
