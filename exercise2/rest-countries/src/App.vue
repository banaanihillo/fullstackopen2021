<template>
<span>
  <h1> REST countries </h1>
  <RestCountries />
</span>
</template>

<script>
import RestCountries from "./components/RestCountries.vue"

export default {
  name: 'App',
  components: {
    RestCountries
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: black;
  color: magenta;
  margin-top: 60px;
}

input {
  background-color: plum;
}
</style>
