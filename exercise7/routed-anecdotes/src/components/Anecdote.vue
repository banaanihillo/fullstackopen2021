<template>
  <div>
    <p>
      {{anecdote.content}}
    </p>
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
  props: {
    anecdote: Object
  },
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
  }
}
</script>

<style>

</style>
