<template>
  <div class="properties-form">
    <div class="mb-3">
      <label class="form-label">
        <i class="fas fa-columns me-1"></i>
        Número de columnas
      </label>
      <select 
        class="form-select" 
        :value="localProps.columns"
        @change="updateProp('columns', parseInt($event.target.value))"
      >
        <option :value="1">1 columna</option>
        <option :value="2">2 columnas</option>
        <option :value="3">3 columnas</option>
        <option :value="4">4 columnas</option>
        <option :value="5">5 columnas</option>
        <option :value="6">6 columnas</option>
      </select>
      <small class="text-muted">Define cuántas columnas tendrá el contenedor</small>
    </div>

    <div class="mb-3">
      <label class="form-label">
        <i class="fas fa-arrows-left-right me-1"></i>
        Espaciado entre columnas (px)
      </label>
      <input 
        type="range" 
        class="form-range" 
        :value="localProps.gap"
        @input="updateProp('gap', parseInt($event.target.value))"
        min="0"
        max="50"
      />
      <div class="d-flex justify-content-between">
        <small class="text-muted">0px</small>
        <small class="text-primary fw-bold">{{ localProps.gap }}px</small>
        <small class="text-muted">50px</small>
      </div>
    </div>

    <div class="alert alert-info mt-3" style="font-size: 0.75rem;">
      <i class="fas fa-info-circle me-1"></i>
      <strong>Tip:</strong> Arrastra elementos desde el sidebar directamente a cada columna del contenedor.
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

<style lang="scss" scoped>
.form-range {
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    background: #667eea;
  }
  
  &::-moz-range-thumb {
    background: #667eea;
  }
}

.alert-info {
  background-color: #e7f3ff;
  border-color: #b3d9ff;
  color: #004085;
}
</style>
