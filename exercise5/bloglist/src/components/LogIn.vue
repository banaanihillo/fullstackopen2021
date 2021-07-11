<template>
  <form @submit.prevent="logIn">
    <div class="input">
      <label for="user-name-input"> User name </label>
      <input
        type="text"
        v-model="credentials.userName"
      />
    </div>
    <div class="input">
      <label for="password-input"> Password </label>
      <input
        type="password"
        v-model="credentials.password"
      />
    </div>
    <button type="submit"> Log in </button>
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
      this.credentials = {
        userName: "",
        password: ""
      }
    }
  }
}
</script>

<style>

</style>
