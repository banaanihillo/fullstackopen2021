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
        <LogIn @toggle-visibility="toggleVisibility" />
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
        <Blog :blog="blog" />
      </ul>

      <h2> Table of users </h2>
      <Users />
    </span>
  </div>
</template>

<script>
import Blog from "./components/Blog.vue"
import LogIn from "./components/LogIn.vue"
import AddBlog from "./components/AddBlog.vue"
import Notification from "./components/Notification.vue"
import Togglable from "./components/Togglable.vue"
import Users from "./components/Users.vue"

export default {
  name: 'App',
  components: {
    Blog,
    LogIn,
    AddBlog,
    Notification,
    Togglable,
    Users
  },
  data() {
    return {
      formVisible: false
    }
  },
  computed: {
    sortedBlogs() {
      return this.$store.getters.sortedBlogs
    },
    loggedIn() {
      return this.$store.state.loggedIn
    }
  },
  async created() {
    this.$store.dispatch("initializeBlogs")
    this.$store.dispatch("initializeUsers")
  },
  methods: {
    logOut() {
      this.$store.commit("LOG_OUT")
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
    },
    toggleVisibility() {
      this.formVisible = !this.formVisible
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
