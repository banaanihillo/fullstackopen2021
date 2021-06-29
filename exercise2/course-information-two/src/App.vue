<template>
<span>
  <h1> Web Development </h1>
  <span v-for="course in courses" :key="course.id">
    <Course :course="course" />
  </span>
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
      courses: [
        {
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
            },
            {
              name: "Adding exercises",
              exercises: 10,
              id: "057dd2867202769"
            }
          ]
        },
        {
          id: 2,
          courseName: "The other Half Stack application development",
          parts: [
            {
              name: "Routes",
              exercises: 3,
              id: "90f9a897g89a7g7a87g7a07g89a8g7a07g8a7g0ag"
            },
            {
              name: "Middlewares",
              exercises: 7,
              id: "8a8a8s8878a7d8aggggggggggggggg"
            }
          ]
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
