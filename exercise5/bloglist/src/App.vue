<template>
  <div>
    <h1> Blogs </h1>
    <span v-if="!loggedIn">
      <h2> Log in </h2>
      <LogIn @log-in="logIn" />
    </span>
    <span v-else>
      <p>
        Logged in as {{loggedIn.userName}}.
      </p>
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

export default {
  name: 'App',
  components: {
    Blog,
    LogIn
  },
  data() {
    return {
      blogs: [],
      loggedIn: null
    }
  },
  async created() {
    const blogs = await blogService.getBlogs()
    this.blogs = blogs
  },
  methods: {
    async logIn(credentials) {
      try {
        const user = await logInService.logIn(credentials)
        this.loggedIn = user
      } catch (exception) {
        // set error message, and a timeout and stuff
        console.error(exception)
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

.input {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.input label {
  width: 5em;
  margin-right: 1em;
}

ul {
  padding-left: 0;
}
</style>
