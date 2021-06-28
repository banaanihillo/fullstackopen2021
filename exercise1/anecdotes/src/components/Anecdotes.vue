<template>
  <span>
    <p>
      {{anecdotes[currentIndex]}}
    </p>
    <button @click="generateRandomIndex">
      New anecdote
    </button>
  </span>
</template>

<script>
export default {
  data() {
    return {
      anecdotes: [
        "If it hurts, do it more often",
        "Adding [developers] to a late software project"
        + " makes it later!",
        "The first 90 percent of the code accounts for the first"
        + " 90 percent of the development time."
        + " The remaining[omitted]",
        "Any fool can write code that a computer can understand."
        + " Good programmers write code that humans can und[omitted]",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first"
        + " place. Therefore, if you write the code as[omitted]",
        "Programming without an extremely heavy use of console.log"
        + " is something something with grammatical errors"
      ],
      currentIndex: 0
    }
  },
  methods: {
    generateRandomIndex() {
      const randomNumber = Math.floor(
        Math.random() * this.anecdotes.length
      )
      return this.currentIndex = randomNumber
    }
  }
}
</script>

<style scoped>

</style>
