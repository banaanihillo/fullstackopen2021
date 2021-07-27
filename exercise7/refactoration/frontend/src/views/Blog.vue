<template>
<span v-if="blog">
  <h2> {{blog.title}} </h2>
  <h3> {{blog.author}} </h3>
  <p>
    Upvotes: {{blog.upvotes}}
    <button
      @click="addUpvote"
      class="upvote"
    > Upvote </button>
  </p>
  <p>
    <a :href="blog.url"> {{blog.author}} </a>
  </p>

  <p v-if="loggedIn.id === blog.user">
    <button @click="deleteBlog" class="danger">
      Delete
    </button>
    <br />
  </p>

  <!--
    This should probably be a navigationary link in the main page,
    in a footer, perhaps,
    however, focus management becomes more complex at that points,
    so just go with these two duplicate links for now
  -->
  <router-link to="/">
    Back to home page
  </router-link>
</span>
</template>

<script>
export default {
  name: "Blog",
  created() {
    this.$store.dispatch(
      "initializeIndividualBlog",
      this.$route.params.id
    )
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    },
    blog() {
      return this.$store.state.individualBlog
    }
  },
  methods: {
    async addUpvote() {
      await this.$store.dispatch(
        "addUpvote",
        {
          ...this.blog,
          upvotes: this.blog.upvotes + 1
        }
      )

      this.$store.commit(
        "SET_NOTIFICATION",
        {
          notification: `Sucessfully voted for ${this.blog.title}.`,
          timeoutDuration: 2000
        }
      )
    },
    async deleteBlog() {
      try {
        await this.$store.dispatch(
          "deleteBlog",
          this.blog.id
        )
        this.$store.commit(
          "SET_NOTIFICATION",
          {
            notification: "Deletion successful.",
            timeoutDuration: 6000
          }
        )
      } catch (error) {
        this.$store.commit(
          "SET_NOTIFICATION",
          {
            notification: error,
            timeoutDuration: 8000,
            isError: true
          }
        )
      }
    }
  }
}
</script>

<style scoped>
.danger {
  background-color: lightsalmon;
}
</style>
