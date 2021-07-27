<template>
  <span v-if="loggedIn">
    <h2> Add blog </h2>
    <Togglable
      buttonLabel="Add blog"
      :formVisible="formVisible"
      @toggle-visibility="toggleVisibility"
    >
      <AddBlog @toggle-visibility="toggleVisibility" />
    </Togglable>
  </span> <!---->
</template>

<script> //
import AddBlog from "../components/AddBlog.vue"
import Togglable from "../components/Togglable.vue" //

export default {
  components: { //
    AddBlog,
    Togglable
  },
  data() {
    return {
      formVisible: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    }
  },
  methods: { //
    toggleVisibility() {
      this.formVisible = !this.formVisible
    }
  }
}
</script>

<style>

</style>
