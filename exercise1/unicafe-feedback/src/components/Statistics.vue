<template>
<span>
  <h2> Statistics </h2>

  <span v-if="totalFeedback === 0">
    <p>
      No feedback given.
    </p>
  </span>

  <span v-else>
    <Statistic description="Positive" :value="feedback.positive" />
    <Statistic description="Neutral" :value="feedback.neutral" />
    <Statistic description="Negative" :value="feedback.negative" />
    <Statistic description="Total" :value="totalFeedback" />
    <Statistic description="Average" :value="average" />
    <Statistic
      description="Positive percentage"
      :value="positivePercentage"
    />
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

</style>
