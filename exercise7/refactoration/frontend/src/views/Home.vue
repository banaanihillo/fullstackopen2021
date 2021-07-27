<template>
<span>
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
    <Blogs />

    <h2> Table of users </h2>
    <Users />
  </span>
</span>
</template>

<script>
import Blogs from "../components/Blogs.vue"
import LogIn from "../components/LogIn.vue"
import AddBlog from "../components/AddBlog.vue"
import Togglable from "../components/Togglable.vue"
import Users from "../components/Users.vue"

export default {
  components: {
    Blogs,
    LogIn,
    AddBlog,
    Togglable,
    Users
  },
  data() {
    return {
      formVisible: false
    }
  },
  computed: { //
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
      this.formVisible = false
    },
    toggleVisibility() {
      this.formVisible = !this.formVisible
    }
  }
}
</script>

<style>

</style>
