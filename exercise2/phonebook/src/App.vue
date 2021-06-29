<template>
<span>
  <Phonebook :people="people" @add-person="addPerson" />
</span>
</template>

<script>
import Phonebook from './components/Phonebook.vue'

export default {
  name: 'App',
  components: {
    Phonebook
  },
  data() {
    return {
      people: [
        {
          name: "Banana Hillo"
        },
        {
          name: "Hillo Banana"
        }
      ]
    }
  },
  methods: {
    addPerson(input) {
      if (this.people.find((person) => person.name === input.name)) {
        alert(`${input.name} already exists.`)
      } else {
        this.people = [
          ...this.people,
          {
            ...input
          }
        ]
      }
    }
  },
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: black;
  color: magenta;
  margin-top: 60px;
}
</style>
