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
      this.$store.commit(
        "addAnecdote",
        this.anecdoteContent
      )
      this.anecdoteContent = ""
    }
  }
}
</script>

<style>

</style>
