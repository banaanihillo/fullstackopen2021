<template>
  <div id="app">
    <h1> Unicafe </h1>
    <Feedback />
  </div>
</template>

<script>
import Feedback from "./components/Feedback.vue"

export default {
  name: 'App',
  components: {
    Feedback
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

ul {
  padding-left: 0;
}

button {
  background-color: plum;
  margin-top: 0.5em;
}

li {
  margin: 1em;
}
</style>
