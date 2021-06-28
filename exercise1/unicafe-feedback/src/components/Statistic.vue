<template>
  <tr>
    <td> {{description}} </td>

    <td v-if="description === 'Positive %'">
      {{roundedValue}}%
    </td>
    <td v-else>
      {{roundedValue}}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    description: String,
    value: Number
  },
  computed: {
    roundedValue() {
      return (
        this.value !== Math.round(this.value)
          ? this.value.toFixed(2)
          : this.value
      )
    }
  }
}
</script>

<style>

</style>
