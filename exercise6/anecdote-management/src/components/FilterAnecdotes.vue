<template>
  <form>
    <label for="filter-input">
      Filter by name
    </label>
    <input
      type="search"
      id="filter-input"
      :value="filter"
      @input="(event) => filterAnecdotes(event.target.value)"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      filter: ""
    }
  },
  methods: {
    filterAnecdotes(searchQuery) {
      this.$store.commit(
        "filterAnecdotes",
        searchQuery
      )
    }
  }
}
</script>

<style>

</style>
