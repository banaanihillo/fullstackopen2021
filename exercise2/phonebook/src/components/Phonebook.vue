<template>
<span>
  <h1> Phone book </h1>
  <h2> Numbers </h2>
  <ul>
    <li v-for="person in people" :key="person.name">
      {{person.name}} ({{person.number}})
    </li>
  </ul>
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
  props: {
    people: Array
  },
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

.input {
  display: flex;
  justify-content: center;
}

.input label {
  width: 5em;
}

</style>
