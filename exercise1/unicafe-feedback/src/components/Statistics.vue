<template>
<span>
  <h2> Statistics </h2>

  <span v-if="totalFeedback === 0">
    <p>
      No feedback given.
    </p>
  </span>

  <span v-else>
    <table>
      <thead>
        <tr>
          <th> Feedback </th>
          <th> Score </th>
        </tr>
      </thead>
      <tbody>
        <Statistic description="Positive" :value="feedback.positive" />
        <Statistic description="Neutral" :value="feedback.neutral" />
        <Statistic description="Negative" :value="feedback.negative" />
        <Statistic description="Total" :value="totalFeedback" />
        <Statistic description="Average" :value="average" />
        <Statistic
          description="Positive %"
          :value="positivePercentage"
        />
      </tbody>
    </table>
  </span>
</span>
</template>

<script>
import Statistic from "./Statistic.vue"

export default {
  components: {
    Statistic
  },
  props: {
    feedback: Object
  },
  methods: {
    calculateSum(things) {
      return things.reduce((accumulator, currentValue) => {
        return (accumulator + currentValue)
      }, 0)
    }
  },
  computed: {
    totalFeedback() {
      return this.calculateSum(Object.values(this.feedback))
    },
    average() {
      // Division by zero
      if (this.totalFeedback === 0) {
        return 0
      }
      return (
        this.calculateSum(this.scores)
        / this.totalFeedback
      )
    },
    scores() {
      return Object.entries(this.feedback).map(
        ([feedbackType, score]) => {
          switch (feedbackType) {
            case "positive":
              return 1 * score
            case "neutral":
              return 0
            case "negative":
              return -1 * score
            default:
              throw new Error("How did you get here")
          }
        }
      )
    },
    positivePercentage() {
      return (
        (this.feedback.positive
        / this.totalFeedback)
        * 100
      )
    }
  }
}
</script>

<style>
table {
  margin: 0 auto;
  font-size: 1.5em;
}
th,
tr:nth-of-type(even) {
  background-color: #222222;
  color: violet;
}
td,
th {
  outline: 1px solid darkviolet;
  width: 10em;
}
</style>
