<template>
  <div class="radio-element">
    <label v-if="props.label" class="form-label">
      {{ props.label }}
      <span v-if="props.required" class="text-danger">*</span>
    </label>
    <div v-for="(option, index) in optionsList" :key="index" class="form-check">
      <input 
        class="form-check-input" 
        type="radio" 
        :name="`radio-${elementId}`"
        :required="props.required"
        disabled
      />
      <label class="form-check-label">
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const elementProps = defineProps({
  props: {
    type: Object,
    required: true
  },
  elementId: {
    type: String,
    required: true
  }
})

const { props } = elementProps

const optionsList = computed(() => {
  return props.options.split('\n').filter(opt => opt.trim())
})
</script>

<style lang="scss" scoped>
.radio-element {
  .form-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .form-check {
    margin-bottom: 0.5rem;
  }
}
</style>
