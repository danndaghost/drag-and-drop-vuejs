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

    <div class="mb-3">
      <label class="form-label">Ancho</label>
      <select 
        class="form-select" 
        :value="localProps.width"
        @change="updateProp('width', $event.target.value)"
      >
        <option value="100%">100%</option>
        <option value="75%">75%</option>
        <option value="50%">50%</option>
        <option value="25%">25%</option>
      </select>
    </div>

    <div class="mb-3 form-check">
      <input 
        type="checkbox" 
        class="form-check-input" 
        :checked="localProps.required"
        @change="updateProp('required', $event.target.checked)"
        id="required-date"
      />
      <label class="form-check-label" for="required-date">
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
