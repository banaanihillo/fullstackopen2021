<template>
  <div id="app">
    <h1> Anecdotes </h1>
    <h2> Add a new anecdote </h2>
    <AddAnecdote />
    <Notification />
    <h2> Filter anecdotes </h2>
    <FilterAnecdotes />
    <h2> List of anecdotes </h2>
    <AnecdoteList />
  </div>
</template>

<script>
import AnecdoteList from "./components/AnecdoteList.vue"
import AddAnecdote from "./components/AddAnecdote.vue"
import Notification from "./components/Notification.vue"
import FilterAnecdotes from "./components/FilterAnecdotes.vue"

export default {
  name: 'App',
  components: {
    AddAnecdote,
    AnecdoteList,
    Notification,
    FilterAnecdotes
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

button,
input {
  background-color: plum;
}

li {
  padding-bottom: 1em;
}
</style>
