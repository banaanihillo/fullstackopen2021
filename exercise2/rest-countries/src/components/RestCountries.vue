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
    <CountryInformation :country="filteredCountries[0]" />
  </span>

  <span v-else>
    <ul>
      <li
        v-for="country in filteredCountries"
        :key="country.alpha3Code"
      >
        {{country.name}}
        ({{country.nativeName}})

        <span v-if="country === expandedCountry">
          <button @click="toggleCountryInformation(null)">
            Collapse
          </button>
          <CountryInformation :country="country" />
        </span>
        <span v-else>
          <button @click="toggleCountryInformation(country)">
            Expand
          </button>
        </span>
      </li>
    </ul>
  </span>
</span>
</template>

<script>
import CountryInformation from "./CountryInformation.vue"

export default {
  components: {
    CountryInformation
  },
  data() {
    return {
      countries: [],
      searchQuery: "",
      expandedCountry: null
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
  },
  methods: {
    toggleCountryInformation(country) {
      this.expandedCountry = country
    }
  }
}
</script>

<style>
ul {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-left: 0;
}
</style>
