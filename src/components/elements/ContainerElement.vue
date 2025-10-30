<template>
  <div class="container-element" :style="containerStyle">
    <!-- Mostrar columnas siempre -->
    <div v-if="componentProps.props.children" class="container-columns" :style="columnsStyle">
      <ContainerColumn
        v-for="(column, index) in componentProps.props.children"
        :key="`column-${componentProps.elementId}-${index}`"
        :ref="el => columnRefs[index] = el"
        :columnData="column"
        :columnIndex="index"
        :containerId="componentProps.elementId"
        @update="handleColumnUpdate"
        @dragEnd="handleDragEnd"
      />
    </div>
    
    <!-- Fallback solo si children NO existe (nunca debería pasar) -->
    <div 
      v-else
      class="container-placeholder"
    >
      <i class="fas fa-table-cells"></i>
      <span>Inicializando contenedor...</span>
    </div>
  </div>
</template>

<script setup>
import { computed, watchEffect, ref } from 'vue'
import { useFormBuilderStore } from '../../stores/formBuilder'
import ContainerColumn from './ContainerColumn.vue'

const componentProps = defineProps({
  props: {
    type: Object,
    required: true
  },
  elementId: {
    type: String,
    required: true
  }
})

const store = useFormBuilderStore()
const { updateElementProps } = store

// Referencias a los componentes de columnas
const columnRefs = ref([])

// Debug: Log cuando cambian las props
watchEffect(() => {
  console.log('ContainerElement render:', {
    elementId: componentProps.elementId,
    columns: componentProps.props.columns,
    hasChildren: !!componentProps.props.children,
    childrenLength: componentProps.props.children?.length,
    children: componentProps.props.children
  })
})

const containerStyle = computed(() => ({
  minHeight: '80px'
}))

const columnsStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${componentProps.props.columns}, 1fr)`,
  gap: `${componentProps.props.gap}px`
}))

const handleColumnUpdate = (columnIndex, newValue) => {
  console.log('🔄 handleColumnUpdate:', { 
    columnIndex, 
    newValueLength: newValue?.length,
    newValue 
  })
  
  // Crear copia profunda de children para evitar mutaciones
  const newChildren = componentProps.props.children.map((col, idx) => {
    if (idx === columnIndex) {
      // Esta columna cambió, usar el nuevo valor
      return [...newValue]
    }
    // Otras columnas, mantener copia
    return [...col]
  })
  
  console.log('🔄 Actualizando children:', {
    elementId: componentProps.elementId,
    newChildren
  })
  
  updateElementProps(componentProps.elementId, { children: newChildren })
}

const handleDragEnd = (columnIndex) => {
  console.log('🏁 handleDragEnd recibido desde columna:', columnIndex)
  
  // Leer el estado actual de TODAS las columnas
  const newChildren = columnRefs.value.map((colRef, idx) => {
    if (colRef && colRef.localColumn) {
      console.log(`📋 Leyendo columna ${idx}:`, colRef.localColumn.map(el => el.id))
      return [...colRef.localColumn]
    }
    return [...componentProps.props.children[idx]]
  })
  
  console.log('💾 Sincronizando TODAS las columnas:', {
    elementId: componentProps.elementId,
    newChildren: newChildren.map(col => col.map(el => el.id))
  })
  
  updateElementProps(componentProps.elementId, { children: newChildren })
  
  // Forzar re-render de TODAS las columnas
  setTimeout(() => {
    columnRefs.value.forEach((colRef, idx) => {
      if (colRef && colRef.forceRerender) {
        colRef.forceRerender()
      }
    })
  }, 100)
}
</script>

<style lang="scss" scoped>
.container-element {
  min-height: 80px;
  position: relative;
  
  .container-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    color: #adb5bd;
    text-align: center;
    padding: 1rem;
    border: 2px dashed #dee2e6;
    border-radius: 4px;

    i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    span {
      font-size: 0.875rem;
    }
  }

  .container-columns {
    min-height: 80px;
  }
}
</style>
