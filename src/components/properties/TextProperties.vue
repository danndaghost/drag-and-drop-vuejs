<template>
  <div class="properties-form">
    <div class="mb-3">
      <label class="form-label">Contenido</label>
      <textarea 
        class="form-control" 
        :value="localProps.content"
        @input="updateProp('content', $event.target.value)"
        rows="3"
      ></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Tamaño de fuente (px)</label>
      <input 
        type="number" 
        class="form-control" 
        :value="localProps.fontSize"
        @input="updateProp('fontSize', parseInt($event.target.value))"
        min="8"
        max="72"
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Peso de fuente</label>
      <select 
        class="form-select" 
        :value="localProps.fontWeight"
        @change="updateProp('fontWeight', $event.target.value)"
      >
        <option value="normal">Normal</option>
        <option value="bold">Negrita</option>
        <option value="lighter">Ligera</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Alineación</label>
      <select 
        class="form-select" 
        :value="localProps.textAlign"
        @change="updateProp('textAlign', $event.target.value)"
      >
        <option value="left">Izquierda</option>
        <option value="center">Centro</option>
        <option value="right">Derecha</option>
        <option value="justify">Justificado</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Color</label>
      <input 
        type="color" 
        class="form-control form-control-color" 
        :value="localProps.color"
        @input="updateProp('color', $event.target.value)"
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
