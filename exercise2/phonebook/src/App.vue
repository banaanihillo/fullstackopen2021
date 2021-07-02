<template>
<span>
  <h1> Phonebook </h1>
  <Notification
    v-if="message"
    :message="message"
    @dismiss-message="dismissMessage"
    :error-message="errorMessage"
  />
  <Search @search-people="searchPeople" />
  <Phonebook
    :filteredPeople="filteredPeople"
    @remove-person="removePerson"
  />
  <AddPerson @submit-person="submitPerson" />
</span>
</template>

<script>
import Phonebook from './components/Phonebook.vue'
import AddPerson from "./components/AddPerson.vue"
import Search from "./components/Search.vue"
import Notification from "./components/Notification.vue"

import {
  addPerson,
  getNotes,
  deletePerson,
  updateNumber
} from "./services/personService.js"

export default {
  name: 'App',
  components: {
    Phonebook,
    AddPerson,
    Search,
    Notification
  },
  data() {
    return {
      people: [],
      searchQuery: "",
      message: null,
      errorMessage: false
    }
  },
  methods: {
    setMessage(message, timeoutDuration, errorMessage=false) {
      this.message = message
      this.errorMessage = errorMessage
      setTimeout(() => {
        this.message = null
        this.errorMessage = false
      },
      timeoutDuration)
    },
    setErrorMessage(message, timeoutDuration) {
      this.setMessage(message, timeoutDuration, true)
    },
    async submitPerson(input) {
      const existingPerson =  this.people.find((person) => {
        return person.name === input.name
      })
      if (existingPerson) {
        if (confirm(`
          ${input.name} already exists.
          Would you like to replace the old number?
        `)) {
          try {
            const updatedPerson = await updateNumber(
              existingPerson.id,
              input.number
            )
            this.people = this.people.map((person) => {
              return (
                person.id === updatedPerson.id
                  ? updatedPerson
                  : person
              )
            })
            this.setMessage(`
              Successfully updated ${updatedPerson.name}.
              New number: ${updatedPerson.number}
            `,
            4000)
          } catch (error) {
            this.setErrorMessage(error.message, 6000)
          }
        }
      } else {
        const addedPerson = await addPerson(input)
        this.people = [
          ...this.people,
          addedPerson
        ]
        this.setMessage(
          `Successfully added ${addedPerson.name}.`,
          3000
        )
      }
    },
    searchPeople(searchQuery) {
      this.searchQuery = searchQuery
    },
    async removePerson(id) {
      try {
        await deletePerson(id)
        this.people = this.people.filter((person) => {
          return (person.id !== id)
        })
        this.setMessage(
          `Successfully deleted ${id}.`,
          3000
        )
      } catch (error) {
        this.setMessage(error, 6000)
      }
    },
    dismissMessage() {
      this.message = null
      // Focus is implicitly returned to the containing span
      // If the user just removed a name, it makes sense, right
      // It could also re-focus on the input on submission?
      // Perhaps off-topic enough to leave it as it is
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
