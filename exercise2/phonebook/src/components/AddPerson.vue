<template>
<span>
  <h2> Add a new name </h2>
  <form @submit.prevent="onSubmit">
    <span class="input">
      <label for="name-input"> Name </label>
      <input
        type="text"
        v-model="input.name"
        id="name-input"
      />
    </span>
    <br />
    <span class="input">
      <label for="number-input"> Number </label>
      <input
        type="text"
        v-model="input.number"
      />
    </span>
    <br />
    <button type="submit">
      Add
    </button>
  </form>
</span>
</template>

<script>
export default {
  data() {
    return {
      input: {
        name: "",
        number: ""
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit("add-person", this.input)
      this.input = {
        name: "",
        number: ""
      }
    }
  },
}
</script>

<style>

</style>
