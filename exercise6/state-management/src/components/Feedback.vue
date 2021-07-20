<template>
  <span>
    <h2> Feedback </h2>
    <ul>
      <li
        v-for="[feedbackType, feedbackValue] in feedback"
        :key="feedbackType"
      >
        {{capitalize(feedbackType)}}: {{feedbackValue}}
        <br />
        <button @click="increment(feedbackType)">
          Increment
        </button>
      </li>
    </ul>
  </span>
</template>

<script>
export default {
  computed: {
    feedback() {
      return new Map(Object.entries(this.$store.state))
    }
  },
  methods: {
    capitalize(word) {
      return word[0].toUpperCase() + word.slice(1)
    },
    increment(feedbackType) {
      this.$store.commit(
        "increment",
        feedbackType
      )
    }
  }
}
</script>

<style>

</style>
