<template>
<span>
  <h1> Feedback </h1>
  <p class="feedback-buttons">
    <button
      @click="increment('positive')"
      class="positive"
    >
      Positive
    </button>

    <button @click="increment('neutral')"> Neutral </button>

    <button
      @click="increment('negative')"
      class="negative"
    >
      Negative
    </button>
  </p>
  <h2> Statistics </h2>
  <p>
    Positive: {{feedback.positive}}
  </p>
  <p>
    Neutral: {{feedback.neutral}}
  </p>
  <p>
    Negative: {{feedback.negative}}
  </p>
</span>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      feedback: {
        positive: 0,
        neutral: 0,
        negative: 0
      }
    }
  },
  methods: {
    increment(feedbackType) {
      return this.feedback[feedbackType]++
    }
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: black;
  color: magenta;
  margin-top: 60px;
}

button {
  background-color: plum;
}

.positive {
  background-color: lightgreen;
}

.negative {
  background-color: lightsalmon;
}

.feedback-buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 1em;
}
</style>
