<template>
  <li v-if="expandedInformation">
    <p> {{blog.title}} </p>
    <p> {{blog.author}} </p>
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

    <button
      @click="toggleExpandedInformation"
      class="collapse"
    > Collapse </button>
  </li>
  <li v-else>
    {{blog.title}} - by {{blog.author}}
    <button
      @click="toggleExpandedInformation"
      class="expand"
    > Expand </button>
  </li>
</template>

<script>
export default {
  name: "Blog",
  props: {
    blog: Object,
    loggedIn: Object
  },
  data() {
    return {
      expandedInformation: false
    }
  },
  methods: {
    toggleExpandedInformation() {
      this.expandedInformation = !this.expandedInformation
    },
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
        console.log("Blog deletion error", error)
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
li {
  border: 1px solid darkmagenta;
  padding: 0.5em;
}

button {
  margin-top: 0;
}

.danger {
  background-color: lightsalmon;
}
</style>
