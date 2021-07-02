<template>
<span>
  <h2> Names and numbers </h2>
  <ul>
    <li v-for="person in filteredPeople" :key="person.name">
      {{person.name}} ({{person.number}})

      <button @click="removePerson(person.id)">
        Remove
      </button>
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
    removePerson(id) {
      if (!confirm("Are you sure you want this obtrusive dialog?")) {
        return
      }
      this.$emit(
        "remove-person",
        id
      )
    }
  },
  computed: {
    
  }
}
</script>

<style>

</style>
