<template>
  <form @submit.prevent="addAnecdote">
    <p>
      <label for="anecdote-input">
        Anecdote content
      </label>
      <input
        id="anecdote-input"
        v-model="anecdoteContent"
        type="text"
        required
        minLength="1"
      />
    </p>
    <button type="submit">
      Submit
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      anecdoteContent: ""
    }
  },
  methods: {
    addAnecdote() {
      this.$store.dispatch(
        "addAnecdote",
        {
          content: this.anecdoteContent,
          votes: 0
        }
      )
      this.$store.commit({
        type: "SET_NOTIFICATION",
        notification: `Successfully added ${this.anecdoteContent}.`,
        timeoutSeconds: 4
      })
      this.anecdoteContent = ""
    }
  }
}
</script>

<style>

</style>
