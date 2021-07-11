<template>
  <div>
    <h1> Blogs </h1>
    <Notification
      v-if="message"
      :message="message"
      :error-message="errorMessage"
      @dismiss-message="dismissMessage"
    />
    <span v-if="!loggedIn">
      <h2> Log in </h2>
      <LogIn @log-in="logIn" />
    </span>
    <span v-else>
      <p>
        Logged in as {{loggedIn.userName}}. <br />
        <button @click="logOut">
          Log out
        </button>
      </p>
      <h2> Add blog </h2>
      <AddBlog @add-blog="addBlog" />
      <h2> List of blogs </h2>
      <ul v-for="blog in blogs" :key="blog.id">
        <Blog :blog="blog" />
      </ul>
    </span>
  </div>
</template>

<script>
import blogService from "./services/blogService"
import logInService from "./services/logInService"
import Blog from "./components/Blog.vue"
import LogIn from "./components/LogIn.vue"
import AddBlog from "./components/AddBlog.vue"
import Notification from "./components/Notification.vue"

export default {
  name: 'App',
  components: {
    Blog,
    LogIn,
    AddBlog,
    Notification
  },
  data() {
    return {
      blogs: [],
      loggedIn: null,
      message: null,
      errorMessage: false
    }
  },
  async created() {
    const blogs = await blogService.getBlogs()
    this.blogs = blogs
    const loggedIn = localStorage.getItem("loggedIn")
    if (loggedIn) {
      const user = JSON.parse(loggedIn)
      this.loggedIn = user
    }
  },
  methods: {
    async logIn(credentials) {
      try {
        const user = await logInService.logIn(credentials)
        this.loggedIn = user
        blogService.setToken(user.token)
        localStorage.setItem(
          "loggedIn",
          JSON.stringify(user)
        )
        this.setMessage(
          `Welcome, ${user.userName}.`,
          2000
        )
      } catch (error) {
        this.setErrorMessage(
          error.message,
          6000
        )
      }
    },
    logOut() {
      this.loggedIn = null
      blogService.setToken(null)
      localStorage.removeItem("loggedIn")
      this.setMessage(
        "Logged out successfully.",
        3000
      )
    },
    async addBlog(input) {
      try {
        const newUser = await blogService.addBlog(input)
        this.blogs = [
          ...this.blogs,
          newUser
        ]
        this.setMessage(
          `Successfully added ${newUser.title}, by ${newUser.author}.`,
          5000
        )
      } catch (error) {
        this.setErrorMessage(
          error.message,
          6000
        )
      }
    },
    setMessage(message, timeoutDuration, errorMessage=false) {
      this.message = message
      this.errorMessage = errorMessage
      setTimeout(() => {
        this.message = null
        this.errorMessage = false
      },
      timeoutDuration)
    },
    setErrorMessage(message, timeoutDuration) {
      this.setMessage(message, timeoutDuration, true)
    },
    dismissMessage() {
      this.message = null
    }
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: black;
  color: magenta;
  margin-top: 60px;
}

a:link {
  color: turquoise;
}

a:visited {
  color: violet;
}

input,
button {
  background-color: plum;
}

button {
  margin-top: 1em;
}

.input {
  display: flex;
  justify-content: center;
  margin: 1em;
}

.input:last-of-type {
  margin-bottom: 0;
}

.input label {
  width: 5em;
  margin-right: 1em;
}

ul {
  padding-left: 0;
}
</style>
