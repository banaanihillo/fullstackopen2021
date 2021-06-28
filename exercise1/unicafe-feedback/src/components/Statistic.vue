<template>
  <p>
    {{description}}:
    <span v-if="description === 'Positive percentage'">
      {{value}}%
    </span>
    <span v-else>
      {{value}}
    </span>
  </p>
</template>

<script>
export default {
  props: {
    description: String,
    value: Number
  }
}
</script>

<style>

</style>
