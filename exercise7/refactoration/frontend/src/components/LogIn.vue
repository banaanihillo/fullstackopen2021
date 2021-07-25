<template>
  <form @submit.prevent="logIn">
    <div class="input">
      <label for="user-name-input"> User name </label>
      <input
        type="text"
        v-model="credentials.userName"
        ref="logIn"
        id="user-name-input"
      />
    </div>
    <div class="input">
      <label for="password-input"> Password </label>
      <input
        type="password"
        v-model="credentials.password"
        id="password-input"
      />
    </div>
    <button type="submit" id="log-in"> Log in </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        userName: "",
        password: ""
      }
    }
  },
  methods: {
    logIn() {
      this.$emit(
        "log-in",
        {...this.credentials}
      )

      this.$store.commit(
        "SET_NOTIFICATION",
        {
          notification: `Welcome, ${this.credentials.userName}.`,
          timeoutDuration: 4000
        }
      )

      this.credentials = {
        userName: "",
        password: ""
      }
    },
    focusForm() {
      // Focus on the first input field when the togglable is opened
      // - this needs to be done in these individual elements,
      // since focusing on the slot would only focus the outer element,
      // and not the form input itself;
      // focus is also more complex to implement on prop update,
      // compared to these individual components mounting
      this.$refs.logIn.focus()
    }
  },
  mounted() {
    this.focusForm()
  }
}
</script>

<style>

</style>
