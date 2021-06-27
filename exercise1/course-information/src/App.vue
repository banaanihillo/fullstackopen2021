<template>
<span>
  <Header :courseName="courseName" />
  <Content :parts="parts" />
  <Total :parts="parts" />
</span>
</template>

<script>
import Header from "./components/Header.vue"
import Content from "./components/Content.vue"
import Total from "./components/Total.vue"

export default {
  name: 'App',
  components: {
    Header,
    Content,
    Total
  },
  data() {
    return {
      courseName: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of front-end frameworks",
          exercises: 10
        },
        {
          name: "Using data properties within templates",
          exercises: 7
        },
        {
          name: "State of a component",
          exercises: 14
        }
      ]
    }
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: black;
  text-align: center;
  color: magenta;
  margin-top: 60px;
}
</style>
