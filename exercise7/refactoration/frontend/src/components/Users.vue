<template>
  <table>
    <thead>
      <tr>
        <th> User </th>
        <th> Blogs created </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td> {{user.userName}} </td>
        <td> {{user.blogs.length}} </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.users
    }
  }
}
</script>

<style>
table {
  margin: auto;
}

td {
  min-width: 10em;
}

tr:nth-of-type(even) {
  background-color: #220000;
  color: hotpink;
}
</style>
