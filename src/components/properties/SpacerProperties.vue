<template>
  <div class="properties-form">
    <div class="mb-3">
      <label class="form-label">Altura (px)</label>
      <input 
        type="number" 
        class="form-control" 
        :value="localProps.height"
        @input="updateProp('height', parseInt($event.target.value))"
        min="10"
        max="200"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  element: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update'])

const localProps = ref({ ...props.element.props })

watch(() => props.element.props, (newProps) => {
  localProps.value = { ...newProps }
}, { deep: true })

const updateProp = (key, value) => {
  localProps.value[key] = value
  emit('update', { [key]: value })
}
</script>
