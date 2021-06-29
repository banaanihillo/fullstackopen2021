<template>
<span>
  <h1> Names but no numbers </h1>
  <h2> Names </h2>
  <ul>
    <li v-for="person in people" :key="person.name">
      {{person.name}}
    </li>
  </ul>
  <h2> Add a new name </h2>
  <form @submit.prevent="onSubmit">
    <label>
      Name
      <input
        type="text"
        v-model="input.name"
      />
    </label>
    <br />
    <button type="submit">
      Add
    </button>
  </form>
</span>
</template>

<script>
export default {
  props: {
    people: Array
  },
  data() {
    return {
      input: {
        name: ""
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit("add-person", this.input)
    }
  }
}
</script>

<style scoped>
input {
  background-color: violet;
}

button {
  background-color: plum;
  margin-top: 1em;
}
</style>
