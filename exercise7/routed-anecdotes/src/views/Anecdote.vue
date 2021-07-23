<template>
  <div>
    <h2>
      {{anecdote.content}}
    </h2>
    <p>
      Votes: {{anecdote.votes}}
    </p>
    <button @click="addVote(anecdote)">
      Vote
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    addVote(anecdote) {
      this.$store.dispatch(
        "addVote",
        anecdote
      )
      // not implemented
      /* this.$store.commit({
        type: "SET_NOTIFICATION",
        notification: `Successfully voted for ${anecdote.content}.`,
        timeoutSeconds: 2
      }) */
    }
  },
  computed: {
    anecdote() {
      return this.$store.getters.sortedAnecdotes.find((anecdote) => {
        return anecdote.id === this.$route.params.id
      })
    }
  }
}
</script>

<style>

</style>
