<template>
  <form @submit.prevent="addAnecdote">
    <InputField
      v-model="anecdoteContent"
      label="Anecdote content"
      type="text"
      required
      minLength="2"
      maxLength="60"
      lineBreak
    />
    
    <button type="submit">
      Submit
    </button>
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
      anecdoteContent: ""
    }
  },
  methods: {
    addAnecdote() {
      this.$store.dispatch(
        "addAnecdote",
        {
          content: this.anecdoteContent,
          votes: 0
        }
      )
      this.$store.commit({
        type: "SET_NOTIFICATION",
        notification: `Successfully added ${this.anecdoteContent}.`,
        timeoutSeconds: 4
      })
      this.$router.push("/")
    }
  }
}
</script>

<style>

</style>
