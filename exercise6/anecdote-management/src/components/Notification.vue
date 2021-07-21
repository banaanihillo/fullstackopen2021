<template>
<p
  class="notification"
  :class="{error: isError}"
  v-if="notification"
>
  {{notification}} <br />
  <button @click="dismissMessage" ref="dismiss">
    OK
  </button>
</p>
</template>

<script>
export default {
  methods: {
    dismissMessage() {
      this.$store.commit("dismissNotification")
    },
    focusDismissButton() {
      this.$refs.dismiss.focus()
    }
  },
  computed: {
    notification() {
      return this.$store.state.notification
    },
    isError() {
      return this.$store.state.isError
    }
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
