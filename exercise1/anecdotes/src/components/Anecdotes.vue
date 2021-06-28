<template>
  <span>
    <p>
      {{anecdotes[currentIndex].content}}
    </p>
    <p>
      Votes for this anecdote: {{anecdotes[currentIndex].votes}}
    </p>
    <button @click="vote(currentIndex)" class="positive">
      Vote
    </button>
    <br />
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
        {
          content: "If it hurts, do it more often",
          votes: 0
        },
        {
          content: "Adding [developers] to a late software project"
            + " makes it later!",
          votes: 0
        },
        {
          content: "The first 90 percent of the code accounts for"
            + " the first 90 percent of the development time."
            + " The remaining[omitted]",
          votes: 0
        },
        {
          content: "Any fool can write code"
            + " that a computer can understand. Good"
            + " programmers write code that humans can und[omitted]",
          votes: 0
        },
        {
          content: "Premature optimization is the root of all evil.",
          votes: 0
        },
        {
          content: "Debugging is twice as hard as writing the code"
            + " in the first place."
            + " Therefore, if you write the code as[omitted]",
          votes: 0
        },
        {
          content: "Programming without an extremely heavy use of"
            + " console.log is something something grammatical errors",
          votes: 0
        }
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
    },
    vote(index) {
      this.anecdotes[index].votes++
    }
  }
}
</script>

<style scoped>
button {
  margin-bottom: 1em;
}

.positive {
  background-color: lightgreen;
}
</style>
