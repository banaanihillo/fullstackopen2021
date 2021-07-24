<template>
  <p>
    <label :for="`${label}-input`">
      {{label}}
    </label>
    <br v-if="lineBreak" />
    <input
      :type="type"
      :id="`${label}-input`"
      :required="required"
      :minLength="minLength"
      :maxLength="maxLength"
      :value="value"
      @input="(event) => $emit('input', event.target.value)"
    />
  </p>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    required: {
      type: Boolean,
      required: false
    },
    minLength: {
      type: String,
      required: false
    },
    maxLength: {
      type: String,
      required: false
    },
    lineBreak: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      value: ""
    }
  }
}
</script>

<style scoped>
input[type="text"] {
  width: 30em;
}
</style>
