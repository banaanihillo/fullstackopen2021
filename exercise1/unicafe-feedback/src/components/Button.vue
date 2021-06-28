<template>
  <button @click="increment(label.toLowerCase())">
    {{label}}
  </button>
</template>

<script>
export default {
  props: {
    label: String,
    feedback: Object
  },
  methods: {
    increment(feedbackType) {
      return this.feedback[feedbackType]++
    }
  }
}
</script>

<style>

</style>
