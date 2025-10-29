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
      <label class="form-label">Placeholder</label>
      <input 
        type="text" 
        class="form-control" 
        :value="localProps.placeholder"
        @input="updateProp('placeholder', $event.target.value)"
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Filas</label>
      <input 
        type="number" 
        class="form-control" 
        :value="localProps.rows"
        @input="updateProp('rows', parseInt($event.target.value))"
        min="2"
        max="20"
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
      </select>
    </div>

    <div class="mb-3 form-check">
      <input 
        type="checkbox" 
        class="form-check-input" 
        :checked="localProps.required"
        @change="updateProp('required', $event.target.checked)"
        id="required-textarea"
      />
      <label class="form-check-label" for="required-textarea">
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
