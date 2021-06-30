<template>
<span>
  <h2> Names and numbers </h2>
  <ul>
    <li v-for="person in filteredPeople" :key="person.name">
      {{person.name}} ({{person.number}})
    </li>
  </ul>


</span>
</template>

<script>

export default {
  props: {
    filteredPeople: Array
  },
  data() {
    return {
      
    }
  },
  methods: {

  },
  computed: {
    
  }
}
</script>

<style>

</style>
