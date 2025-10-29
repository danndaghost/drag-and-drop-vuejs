<template>
  <div class="properties-form">
    <div class="mb-3">
      <label class="form-label">Etiqueta</label>
      <input 
        type="text" 
        class="form-control" 
        :value="localProps.label"
        @input="updateProp('label', $event.target.value)"
      />
    </div>

    <div class="mb-3 form-check">
      <input 
        type="checkbox" 
        class="form-check-input" 
        :checked="localProps.required"
        @change="updateProp('required', $event.target.checked)"
        id="required-checkbox"
      />
      <label class="form-check-label" for="required-checkbox">
        Campo requerido
      </label>
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
