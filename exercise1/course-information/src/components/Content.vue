<template>
  <span>
    <p v-for="part in parts" :key="part.name">
      <Part
        :name="part.name"
        :exercises="part.exercises"
      />
    </p>
  </span>
</template>

<script>
import Part from "./Part.vue"

export default {
  components: {
    Part
  },
  props: {
    parts: Array
  }
}
</script>

<style>

</style>
