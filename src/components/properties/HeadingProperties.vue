<template>
  <div class="properties-form">
    <div class="mb-3">
      <label class="form-label">Contenido</label>
      <input 
        type="text" 
        class="form-control" 
        :value="localProps.content"
        @input="updateProp('content', $event.target.value)"
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Nivel</label>
      <select 
        class="form-select" 
        :value="localProps.level"
        @change="updateProp('level', $event.target.value)"
      >
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="h4">H4</option>
        <option value="h5">H5</option>
        <option value="h6">H6</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Tamaño de fuente (px)</label>
      <input 
        type="number" 
        class="form-control" 
        :value="localProps.fontSize"
        @input="updateProp('fontSize', parseInt($event.target.value))"
        min="12"
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
