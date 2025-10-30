<template>
  <div class="properties-form">
    <div class="mb-3">
      <label class="form-label">
        <i class="fas fa-columns me-1"></i>
        Columnas de la tabla
      </label>
      
      <div v-for="(col, index) in localProps.columns" :key="col.id" class="mb-2">
        <div class="input-group input-group-sm">
          <input 
            type="text" 
            class="form-control" 
            :value="col.name"
            @input="updateColumnName(index, $event.target.value)"
            placeholder="Nombre de columna"
          />
          <button 
            class="btn btn-outline-danger" 
            type="button"
            @click="removeColumn(index)"
            :disabled="localProps.columns.length <= 1"
            title="Eliminar columna"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <button 
        class="btn btn-sm btn-outline-primary w-100 mt-2" 
        @click="addColumn"
      >
        <i class="fas fa-plus me-1"></i>
        Agregar columna
      </button>
    </div>

    <div class="alert alert-info mt-3" style="font-size: 0.75rem;">
      <i class="fas fa-info-circle me-1"></i>
      <strong>Nota:</strong> En el formulario final, los usuarios podrán agregar y eliminar filas dinámicamente.
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

function updateProp(key, value) {
  localProps.value[key] = value
  emit('update', localProps.value)
}

function updateColumnName(index, newName) {
  const newColumns = [...localProps.value.columns]
  newColumns[index] = { ...newColumns[index], name: newName }
  updateProp('columns', newColumns)
}

function addColumn() {
  const newColumns = [...localProps.value.columns]
  const newId = `col${Date.now()}`
  newColumns.push({ id: newId, name: `Columna ${newColumns.length + 1}` })
  updateProp('columns', newColumns)
}

function removeColumn(index) {
  if (localProps.value.columns.length > 1) {
    const newColumns = [...localProps.value.columns]
    newColumns.splice(index, 1)
    updateProp('columns', newColumns)
  }
}
</script>

<style lang="scss" scoped>
.properties-form {
  .input-group {
    .btn {
      padding: 0.25rem 0.5rem;
    }
  }
}
</style>
