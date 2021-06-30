<template>
<span>
  <label for="search"> Filter by name </label>
  <input
    type="search"
    id="search"
    v-model="searchQuery"
    @input="onSearch"
  />
</span>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ""
    }
  },
  methods: {
    onSearch() {
      this.$emit("search-people", this.searchQuery)
    }
  }
}
</script>

<style>

</style>
