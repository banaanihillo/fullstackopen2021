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
      this.$store.commit(
        "addVote",
        anecdote.id
      )
    }
  }
}
</script>

<style>

</style>
