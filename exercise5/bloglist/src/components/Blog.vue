<template>
  <li v-if="expandedInformation">
    <p> {{blog.title}} </p>
    <p> {{blog.author}} </p>
    <p>
      Upvotes: {{blog.upvotes}}
      <button @click="addUpvote"> Upvote </button>
    </p>
    <p>
      <a :href="blog.url"> {{blog.author}} </a>
    </p>
    <button @click="toggleExpandedInformation"> Collapse </button>
  </li>
  <li v-else>
    {{blog.title}} - by {{blog.author}}
    <button @click="toggleExpandedInformation"> Expand </button>
  </li>
</template>

<script>
export default {
  name: "Blog",
  props: {
    blog: Object
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
    addUpvote() {
      this.$emit(
        "add-upvote",
        {
          ...this.blog,
          upvotes: this.blog.upvotes + 1
        }
      )
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
</style>
