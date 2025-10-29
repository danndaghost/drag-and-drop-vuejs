<template>
  <div class="select-element">
    <label v-if="props.label" class="form-label">
      {{ props.label }}
      <span v-if="props.required" class="text-danger">*</span>
    </label>
    <select 
      class="form-select" 
      :required="props.required"
      :style="{ width: props.width }"
      disabled
    >
      <option value="">Seleccione...</option>
      <option v-for="(option, index) in optionsList" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const elementProps = defineProps({
  props: {
    type: Object,
    required: true
  }
})

const { props } = elementProps

const optionsList = computed(() => {
  return props.options.split('\n').filter(opt => opt.trim())
})
</script>

<style lang="scss" scoped>
.select-element {
  .form-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
}
</style>
