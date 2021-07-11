<template>
  <p>
    {{blog.title}} - by {{blog.author}} <br />
    <a :href="blog.url"> {{blog.author}} </a>
  </p>
</template>

<script>
export default {
  name: "Blog",
  props: {
    blog: Object
  }
}
</script>

<style scoped>

</style>
