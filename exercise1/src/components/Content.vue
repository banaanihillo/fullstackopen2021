<template>
  <span>
    <p v-for="part in parts" :key="part.name">
      {{part.name}}: {{part.exercises}}
    </p>
  </span>
</template>

<script>
export default {
  props: {
    parts: {
      partN: {
        name: String,
        exercises: Number
      }
    }
  }
}
</script>

<style>

</style>
