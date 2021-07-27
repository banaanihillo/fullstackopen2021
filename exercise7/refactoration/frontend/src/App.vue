<template>
  <div id="app">
    <h1> Blogs </h1>

    <Notification />

    <router-view>
      <Home />
      <User />
      <Blog />
    </router-view>
  </div>
</template>

<script>
import Notification from "./components/Notification.vue"
import User from "./views/User.vue"
import Home from "./views/Home.vue"
import Blog from "./views/Blog.vue"

export default {
  name: 'App',
  components: {
    Notification,
    User,
    Home,
    Blog
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
</style>
