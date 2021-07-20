<template>
  <div id="app">
    <h1> Anecdotes </h1>
    <ul>
      <li v-for="anecdote in anecdotes" :key="anecdote.id">
        <Anecdote :anecdote="anecdote" />
      </li>
    </ul>
  </div>
</template>

<script>
import Anecdote from "./components/Anecdote.vue"

export default {
  name: 'App',
  components: {
    Anecdote
  },
  computed: {
    anecdotes() {
      return this.$store.state.anecdotes
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

ul {
  padding-left: 0;
}

button {
  background-color: plum;
}

li {
  padding-bottom: 1em;
}
</style>
