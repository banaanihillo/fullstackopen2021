<template>
<span>
  <label for="search"> Search for countries </label>
  <br />
  <input type="search" id="search" v-model="searchQuery" />

  <span v-if="!searchQuery">
    <p>
      Search for countries by name using the search field above.
    </p>
  </span>

  <span v-else-if="filteredCountries.length > 10">
    <p>
      Too many matches. <br />
      The search returns ten (10) results at most. <br />
      The current query matches {{filteredCountries.length}} countries.
    </p>
  </span>

  <span v-else-if="filteredCountries.length === 0">
    <p>
      No matches.
    </p>
  </span>

  <span v-else-if="filteredCountries.length === 1">
    <h2> {{filteredCountries[0].name}} </h2>
    <p>
      Native name: {{filteredCountries[0].nativeName}} <br />
      Capital: {{filteredCountries[0].capital}} <br />
      Population: {{filteredCountries[0].population}} <br />
    </p>

    <h3> Languages </h3>
    <ul>
      <li
        v-for="language in filteredCountries[0].languages"
        :key="language.iso639_2"
      >
        {{language.name}} ({{language.nativeName}})
      </li>
    </ul>

    <img
      :src="filteredCountries[0].flag"
      :alt="'Flag of ' + filteredCountries[0].name"
      width="100"
    />
  </span>

  <span v-else>
    <ul>
      <li
        v-for="country in filteredCountries"
        :key="country.alpha3Code"
      >
        {{country.name}} ({{country.nativeName}})
      </li>
    </ul>
  </span>
</span>
</template>

<script>
export default {
  data() {
    return {
      countries: [],
      searchQuery: ""
    }
  },
  async created() {
    const response = await fetch(
      "https://restcountries.eu/rest/v2/all"
    )
    if (!response.ok) {
      throw new Error(`Response not OK. ${response.status}`)
    }
    const countries = await response.json()
    this.countries = countries
  },
  computed: {
    filteredCountries() {
      if (!this.searchQuery) {
        return this.countries
      } else {
        return this.countries.filter((country) => {
          return (
            country.name.toLowerCase().includes(
              this.searchQuery.toLowerCase()
            )
            || country.nativeName.toLowerCase().includes(
              this.searchQuery.toLowerCase()
            )
          )
        })
      }
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-left: 0;
}
</style>
