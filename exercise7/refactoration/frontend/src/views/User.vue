<template>
<span v-if="individualUser">
  <h2> {{individualUser.userName}} </h2>
  <h3> Blogs added </h3>

  <span v-if="individualUser.blogs.length === 0">
    <p>
      No blogs added.
    </p>
  </span>
  <span v-else>
    <ul>
      <li v-for="blog in individualUser.blogs" :key="blog.id">
        {{blog.title}} - by {{blog.author}}
      </li>
    </ul>
  </span>

  <router-link to="/">
    Back to home page
  </router-link>
</span>
</template>

<script>
export default {
  created() {
    this.$store.dispatch(
      "initializeIndividualUser",
      this.$route.params.id
    )
  },
  computed: {
    individualUser() {
      return this.$store.state.individualUser
    }
  }
}
</script>

<style>

</style>
