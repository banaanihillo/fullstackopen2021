<template>
<span>
  <h2> {{country.name}} </h2>
  <p>
    Native name: {{country.nativeName}} <br />
    Capital: {{country.capital}} <br />
    Population: {{country.population}} <br />
  </p>

  <h3> Languages </h3>
  <ul>
    <li
      v-for="language in country.languages"
      :key="language.iso639_2"
    >
      {{language.name}} ({{language.nativeName}})
    </li>
  </ul>

  <img
    :src="country.flag"
    :alt="'Flag of ' + country.name"
    width="100"
  />
</span>
</template>

<script>
export default {
  props: {
    country: Object
  }
}
</script>

<style>

</style>
