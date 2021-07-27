<template>
<span id="app">
  <header>
    <nav>
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/blogs" v-if="loggedIn">
        Blogs
      </router-link>
      <router-link to="/users" v-if="loggedIn">
        Users
      </router-link>
    </nav>
    <h1> Blogs </h1>
  </header>

  <main>
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
    </span>

    <router-view />
  </main>
</span>
</template>

<script>
import Notification from "./components/Notification.vue"
import Togglable from "./components/Togglable.vue"
import LogIn from "./components/LogIn.vue"

export default {
  name: 'App',
  components: {
    Notification,
    LogIn,
    Togglable
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    }
  },
  data() {
    return {
      formVisible: false
    }
  },
  methods: {
    toggleVisibility() {
      this.formVisible = !this.formVisible
    },
    logOut() {
      this.$store.commit("LOG_OUT")
      this.$store.commit(
        "SET_NOTIFICATION",
        {
          notification: "Logged out successfully.",
          timeoutDuration: 3000
        }
      )
      this.formVisible = false

      if (this.$route.path !== "/") {
        this.$router.push("/")
      }
    },
  }, async created() {
    this.$store.dispatch("initializeBlogs")
    this.$store.dispatch("initializeUsers")
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: black;
  color: magenta; /**/
}

a:link {
  color: darkturquoise;
}

a:visited {
  color: violet;
}

a {
  text-decoration: none;
  border-bottom: 1px solid;
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

nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 1em;
}
</style>
