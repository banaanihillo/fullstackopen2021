<template>
  <ul>
    <li v-for="anecdote in filteredSortedAnecdotes" :key="anecdote.id">
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
    filteredSortedAnecdotes() {
      return this.$store.getters.filteredSortedAnecdotes
    }
  },
  created() {
    this.$store.dispatch("initializeAnecdotes")
  }
}
</script>

<style>

</style>
