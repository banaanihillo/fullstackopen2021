<template>
  <form @submit.prevent="addBlog">
    <div class="input">
      <label for="title-input"> Title </label>
      <input
        type="text"
        v-model="input.title"
        ref="addBlog"
        id="title-input"
      />
    </div>
    <div class="input">
      <label for="author-input"> Author </label>
      <input type="text" v-model="input.author" id="author-input" />
    </div>
    <div class="input">
      <label for="url-input"> URL </label>
      <input type="text" v-model="input.url" id="url-input" />
    </div>
    <button type="submit"> Submit </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      input: {
        title: "",
        author: "",
        url: ""
      }
    }
  },
  methods: {
    async addBlog() {
      try {
        await this.$store.dispatch(
          "addBlog",
          {...this.input}
        )
        this.$emit("toggleVisibility")
        this.$store.commit(
          "SET_NOTIFICATION",
          {
            notification: `Successfully added ${this.input.title}.`,
            timeoutDuration: 3000
          }
        )
      } catch (error) {
        this.$store.commit(
          "SET_NOTIFICATION",
          {
            notification: error.message,
            timeoutDuration: 6000,
            isError: true
          }
        )
      }
      this.input = {
        title: "",
        author: "",
        url: ""
      }
    },
    focusForm() {
      this.$refs.addBlog.focus()
    }
  },
  mounted() {
    this.focusForm()
  }
}
</script>

<style>

</style>
