<template>
  <table>
    <caption> Users </caption>
    <thead>
      <tr>
        <th> User </th>
        <th> Blogs created </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>
          <router-link :to="`/users/${user.id}`">
            {{user.userName}}
          </router-link>
        </td>
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

<style scoped>
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

table caption {
  margin-bottom: 1em;
  font-weight: bold;
  font-size: 1.4em;
}
</style>
