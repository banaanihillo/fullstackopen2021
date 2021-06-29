<template>
<span>
  <Header :courseName="course.courseName" />
  
  <Content :parts="course.parts" />

  <Total :parts="course.parts" />

</span>  
</template>

<script>
import Header from "./Header.vue"
import Content from "./Content.vue"
import Total from "./Total.vue"

export default {
  components: {
    Header,
    Content,
    Total
  },
  props: {
    course: Object
  }
}
</script>

<style>

</style>
