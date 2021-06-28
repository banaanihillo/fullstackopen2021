<template>
<span>
  <h1> Feedback </h1>
  <p class="feedback-buttons">
    <Button
      class="positive"
      label="Positive"
      :feedback="feedback"
    />

    <Button
      label="Neutral"
      :feedback="feedback"
    />

    <Button
      class="negative"
      label="Negative"
      :feedback="feedback"
    />
  </p>
  <Statistics :feedback="feedback" />
</span>
</template>

<script>
import Statistics from "./components/Statistics.vue"
import Button from "./components/Button.vue"

export default {
  name: 'App',
  components: {
    Statistics,
    Button
  },
  data() {
    return {
      feedback: {
        positive: 0,
        neutral: 0,
        negative: 0
      }
    }
  }//
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
