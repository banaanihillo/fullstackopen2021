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

  <h4> Weather in {{country.capital}} </h4>
  <p v-if="weather">
    Temperature: {{weather.current.temp_c + "\u00B0"}} <br />
    Wind: {{weather.current.wind_kph}} km/h
    (Gusts up to {{weather.current.gust_kph}} km/h) <br />
    Precipitation: {{weather.current.precip_mm}} mm <br />
    Last updated at {{weather.current.last_updated}} (Local)
  </p>
</span>
</template>

<script>
export default {
  props: {
    country: Object
  },
  data() {
    return {
      weather: null
    }
  },
  async created() {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${
        process.env.VUE_APP_WEATHER_API_KEY
      }&q=${this.country.capital}`
    )
    if (!response.ok) {
      throw new Error("Response not OK")
    }
    const weather = await response.json()
    this.weather = weather
  }
}
</script>

<style>

</style>
