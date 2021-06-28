<template>
  <Anecdotes />
</template>

<script>
import Anecdotes from "./components/Anecdotes"

export default {
  name: 'App',
  components: {
    Anecdotes
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

button {
  background-color: plum;
}
</style>
