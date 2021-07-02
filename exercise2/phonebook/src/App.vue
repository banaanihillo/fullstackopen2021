<template>
<span>
  <h1> Phonebook </h1>
  <Search @search-people="searchPeople" />
  <Phonebook :filteredPeople="filteredPeople" />
  <AddPerson @add-person="addPerson" />
</span>
</template>

<script>
import Phonebook from './components/Phonebook.vue'
import AddPerson from "./components/AddPerson.vue"
import Search from "./components/Search.vue"
import {
  addPerson,
  getNotes
} from "./services/personService.js"

export default {
  name: 'App',
  components: {
    Phonebook,
    AddPerson,
    Search
  },
  data() {
    return {
      people: [],
      searchQuery: ""
    }
  },
  methods: {
    async addPerson(input) {
      if (this.people.find((person) => person.name === input.name)) {
        alert(`${input.name} already exists.`)
      } else {
        const addedPerson = await addPerson(input)
        this.people = [
          ...this.people,
          addedPerson
        ]
      }
    },
    searchPeople(searchQuery) {
      this.searchQuery = searchQuery
    }
  },
  computed: {
    filteredPeople() {
      if (this.searchQuery) {
        return this.people.filter((person) => {
          return person.name.toLowerCase().includes(
            this.searchQuery.toLowerCase()
          )
        })
      } else {
        return this.people
      }
    }
  },
  async created() {
    this.people = await getNotes()
  }
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
