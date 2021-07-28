<template>
<section>
  <h2> Add a blog </h2>
  <form @submit.prevent="addBlog" v-if="loggedIn">
    <div class="input">
      <label for="title-input"> Title </label>
      <input
        type="text"
        v-model="input.title"
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
</section>
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
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    }
  },
  methods: {
    async addBlog() {
      try {
        await this.$store.dispatch(
          "addBlog",
          {...this.input}
        )
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
    }
  }
}
</script>

<style>

</style>
