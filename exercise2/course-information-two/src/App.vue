<template>
<span>
  <Course :course="course" />
</span>
</template>

<script>
import Course from "./components/Course.vue"

export default {
  name: 'App',
  components: {
    Course
  },
  data() {
    return {
      course: {
        id: 1,
        courseName: "Half Stack application development",
        parts: [
          {
            name: "Fundamentals of front-end frameworks",
            exercises: 10,
            id: "aaabbabsbsbbabab177aba7a77a7dnba7ab"
          },
          {
            name: "Using data properties within templates",
            exercises: 7,
            id: "8a7s8a878aa7d"
          },
          {
            name: "State of a component",
            exercises: 14,
            id: "aAAAAAAAAAa8s8s8s8s"
          },
          {
            name: "Modular components",
            exercises: 1,
            id: "oaoaoao0ao0ao0ao0so0os0os0o0o0o0o0o0o0o0"
          }
        ]
      }
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
