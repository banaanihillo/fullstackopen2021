<template>
  <ul>
    <li v-for="anecdote in sortedAnecdotes" :key="anecdote.id">
      <router-link :to="`anecdotes/${anecdote.id}`">
        {{anecdote.content}}
      </router-link>
    </li>
  </ul>
</template>

<script> //

export default { //
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
