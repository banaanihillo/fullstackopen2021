<template>
<span>
  <div v-if="anecdote">
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
  <div v-else>
    <p>
      Loading
    </p>
  </div>
</span>
</template>

<script>
export default {
  methods: {
    addVote(anecdote) {
      this.$store.dispatch(
        "addVote",
        anecdote
      )
      this.$store.commit({
        type: "SET_NOTIFICATION",
        notification: `Successfully voted for ${anecdote.content}.`,
        timeoutSeconds: 2
      })
    }
  },
  computed: {
    anecdote() {
      return this.$store.state.individualAnecdote
    }
  },
  created() {
    this.$store.dispatch(
      "getAnecdoteByID",
      this.$route.params.id
    )
  }
}
</script>

<style>

</style>
