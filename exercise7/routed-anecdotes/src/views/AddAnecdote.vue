<template>
  <form @submit.prevent="addAnecdote">
    <InputField
      v-model="input.content"
      label="Content"
      type="text"
      required
      minLength="2"
      maxLength="60"
    />
    <InputField
      label="Author"
      type="text"
      v-model="input.author"
    />
    <InputField
      label="URL"
      type="text"
      v-model="input.url"
    />
    
    <button type="submit">
      Submit
    </button>
    <p class="danger">
      <button type="reset">
        Reset, if you really want to
      </button>
    </p>
  </form>
</template>

<script>
import InputField from "../components/InputField.vue"

export default {
  components: {
    InputField
  },
  data() {
    return {
      input: {
        content: "",
        author: "",
        url: ""
      }
    }
  },
  methods: {
    addAnecdote() {
      this.$store.dispatch(
        "addAnecdote",
        {
          ...this.input,
          votes: 0
        }
      )
      this.$store.commit({
        type: "SET_NOTIFICATION",
        notification: `Successfully added ${this.input.content}.`,
        timeoutSeconds: 4
      })
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
button[type="reset"] {
  background-color: tomato;
}

.danger {
  border: 1px solid red;
  padding: 1em;
}
</style>
