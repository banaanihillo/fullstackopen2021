<template>
  <div id="app">
    <h1> Blogs </h1>
    <Notification />
    <span v-if="!loggedIn">
      <h2> Log in </h2>
      <Togglable
        buttonLabel="Log in"
        :formVisible="formVisible"
        @toggle-visibility="toggleVisibility"
      >
        <LogIn @log-in="logIn" />
      </Togglable>
    </span>
    <span v-else>
      <p>
        Logged in as {{loggedIn.userName}}. <br />
        <button @click="logOut">
          Log out
        </button>
      </p>
      <h2> Add blog </h2>
      <Togglable
        buttonLabel="Add blog"
        :formVisible="formVisible"
        @toggle-visibility="toggleVisibility"
      >
        <AddBlog @toggle-visibility="toggleVisibility" />
      </Togglable>
      <h2> List of blogs </h2>
      <ul v-for="blog in sortedBlogs" :key="blog.id">
        <Blog
          :blog="blog"
          :loggedIn="loggedIn"
          @delete-blog="deleteBlog"
        /> <!---->
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
import Togglable from "./components/Togglable.vue"

export default {
  name: 'App',
  components: {
    Blog,
    LogIn,
    AddBlog,
    Notification,
    Togglable
  },
  data() {
    return {
      loggedIn: null,
      formVisible: false
    }
  },
  computed: {
    blogs() {
      return this.$store.state.blogs
    },
    // 7-03: Re-sort after upvote works,
    // but this should probably be a store getter instead
    sortedBlogs() {
      return [...this.blogs].sort((a, b) => {
        return (b.upvotes - a.upvotes)
      })
    }
  },
  async created() {
    this.$store.dispatch("initializeBlogs")
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
        // Close the log-in form (which should not be visible anyway),
        // and also start with the blog addition form collapsed
        this.toggleVisibility()
      } catch (error) {
        this.$store.commit(
          "SET_NOTIFICATION",
          {
            notification: error.message,
            timeoutDuration: 6000,
            isError: true
          }
        )
      }
    },
    logOut() {
      this.loggedIn = null
      blogService.setToken(null)
      localStorage.removeItem("loggedIn")
      this.$store.commit(
        "SET_NOTIFICATION",
        {
          notification: "Logged out successfully.",
          timeoutDuration: 3000
        }
      )
      // Collapse all forms,
      // even if the blog addition form was open when the user logs out
      this.formVisible = false
    }, //
    toggleVisibility() {
      this.formVisible = !this.formVisible
    }, //
    async deleteBlog(blogID) {
      try {
        await blogService.deleteBlog(blogID)
        this.blogs = this.blogs.filter((blog) => {
          return (blog.id !== blogID)
        })
        this.$store.commit(
          "SET_NOTIFICATION",
          {
            notification: `Successfully deleted ${blogID}.`,
            timeoutDuration: 5000
          }
        )
      } catch (exception) {
        this.$store.commit(
          "SET_NOTIFICATION",
          {
            notification: exception,
            timeoutDuration: 6000,
            isError: true
          }
        )
      }
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
