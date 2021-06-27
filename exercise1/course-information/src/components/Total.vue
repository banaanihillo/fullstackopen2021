<template>
  <p> Number of exercises: {{numberOfExercises}} </p>
</template>

<script>
export default {
  props: {
    parts: Array
  },
  computed: {
    numberOfExercises() {
      return Object.values(this.parts).reduce((accumulator, part) => {
        return (accumulator + part.exercises)
      }, 0)
    }
  }
}
</script>

<style>

</style>
