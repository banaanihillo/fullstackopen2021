<template>
  <p class="input">
    <label :for="`${label}-input`">
      {{label}}
    </label>
    
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
    } //
  },
  data() {
    return {
      value: ""
    }
  }
}
</script>

<style scoped>
.input {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.input label {
  width: 5em;
}

input[maxLength] {
  width: 30em;
}
</style>
