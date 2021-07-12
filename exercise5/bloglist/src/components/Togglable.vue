<template>
  <div>
    <span v-if="formVisible">
      <slot></slot>
      <button @click="toggleVisibility">
        Close
      </button>
    </span>
    <span v-else>
      <button @click="toggleVisibility">
        {{buttonLabel}}
      </button>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    buttonLabel: String,
    formVisible: Boolean
  },
  methods: {
    toggleVisibility() {
      // The parent component controls the visibility,
      // since it needs access to the slots directly
      // - this is probably simpler than passing the emission along,
      // which would create a property passage two levels deep;
      // this togglable element does not know about the forms,
      // nor their individual state
      this.$emit("toggle-visibility")
    }
  }
}
</script>

<style>

</style>
