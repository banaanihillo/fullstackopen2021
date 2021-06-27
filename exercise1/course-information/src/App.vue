<template>
<span>
  <Header :courseName="courseName" />
  <Content :parts="parts" />
  <Total :numberOfExercises="numberOfExercises" />
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
      parts: {
        partOne: {
          name: "Fundamentals of front-end frameworks",
          exercises: 10
        },
        partTwo: {
          name: "Using data properties within templates",
          exercises: 7
        },
        partThree: {
          name: "State of a component",
          exercises: 14
        }
      }
    }
  },
  computed: {
    numberOfExercises() {
      return Object.values(this.parts).reduce((accumulator, part) => {
        return (accumulator + part.exercises)
      }, 0)
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
