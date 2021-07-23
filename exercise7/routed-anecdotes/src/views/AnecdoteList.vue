<template>
  <ul>
    <li v-for="anecdote in sortedAnecdotes" :key="anecdote.id">
      <Anecdote :anecdote="anecdote" />
    </li>
  </ul>
</template>

<script>
import Anecdote from "../components/Anecdote.vue"

export default {
  components: {
    Anecdote
  },
  computed: {
    // filter not implemented
    /* filteredSortedAnecdotes() {
      return this.$store.getters.filteredSortedAnecdotes
    } */
    sortedAnecdotes() {
      return this.$store.getters.sortedAnecdotes
    }
  },
  created() {
    this.$store.dispatch("initializeAnecdotes")
  }
}
</script>

<style>

</style>
