<template>
  <ul>
    <li v-for="blog in sortedBlogs" :key="blog.id">
      <router-link :to="`/blogs/${blog.id}`">
        {{blog.title}} - by {{blog.author}}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    sortedBlogs() {
      return this.$store.getters.sortedBlogs
    }
  }
}
</script>

<style scoped>
li {
  border: 1px solid darkmagenta;
  padding: 0.4em;
}

li:nth-of-type(even) {
  background-color: #222222;
}
</style>
