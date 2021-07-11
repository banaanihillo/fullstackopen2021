<template>
<p
  class="notification"
  :class="{error: errorMessage}"
>
  {{message}} <br />
  <button @click="dismissMessage" ref="dismiss">
    OK
  </button>
</p>
</template>

<script>
export default {
  props: {
    message: String,
    errorMessage: Boolean
  },
  methods: {
    dismissMessage() {
      this.$emit("dismiss-message")
    },
    focusDismissButton() {
      this.$refs.dismiss.focus()
    }
  },
  mounted() {
    // Automatically focus on the "OK" button,
    // when the notification is rendered
    this.focusDismissButton()
  }
}
</script>

<style scoped>
.notification {
  border: 2px solid lightgreen;
}

.error {
  border: 2px solid tomato;
}
</style>
