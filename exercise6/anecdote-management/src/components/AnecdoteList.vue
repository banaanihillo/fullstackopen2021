<template>
  <ul>
    <li v-for="anecdote in sortedAnecdotes" :key="anecdote.id">
      <Anecdote :anecdote="anecdote" />
    </li>
  </ul>
</template>

<script>
import Anecdote from "./Anecdote.vue"

export default {
  components: {
    Anecdote
  },
  computed: {
    sortedAnecdotes() {
      return this.$store.getters.sortedAnecdotes
    }
  }
}
</script>

<style>

</style>
