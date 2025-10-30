<template>
  <div 
    class="container-column"
    :class="{ 'column-drag-over': isDragOver }"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- Placeholder cuando está vacío -->
    <div 
      v-if="localColumn.length === 0" 
      class="column-placeholder"
    >
      <i class="fas fa-plus"></i>
      <span>Columna {{ columnIndex + 1 }}</span>
    </div>
    
    <!-- Wrapper estático que siempre existe -->
    <div class="column-items">
      <VueDraggable 
        v-model="localColumn"
        :animation="200"
        ghostClass="column-ghost"
        handle=".element__drag-handle"
        :group="{ name: 'nested-elements', pull: true, put: true }"
        @start="handleDragStart"
        @end="handleDragEnd"
        @change="handleDragChange"
        @add="(evt) => console.log('➕ ADD event:', props.columnIndex, evt)"
        @remove="(evt) => console.log('➖ REMOVE event:', props.columnIndex, evt)"
        @update="(evt) => console.log('🔄 UPDATE event:', props.columnIndex, evt)"
      >
        <FormElement 
          v-for="child in localColumn"
          :key="`${child.id}-${dragCounter}`"
          :element="child"
          :isSelected="selectedElementId === child.id"
          :isNested="true"
          @select="selectElement(child.id)"
          @remove="removeElement(child.id)"
          @duplicate="duplicateElement(child.id)"
        />
      </VueDraggable>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'
import { useFormBuilderStore } from '../../stores/formBuilder'
import FormElement from '../FormElement.vue'

const props = defineProps({
  columnData: {
    type: Array,
    required: true
  },
  columnIndex: {
    type: Number,
    required: true
  },
  containerId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update', 'dragEnd'])

const store = useFormBuilderStore()
const { selectedElementId } = storeToRefs(store)
const { selectElement, removeElement, duplicateElement, addElement } = store

// Estado local
const localColumn = ref([...(props.columnData || [])])
const isDragOver = ref(false)
const isUpdatingFromProps = ref(false)
const isDragging = ref(false)
const dragCounter = ref(0) // Contador para forzar re-render después de drag

// Exponer localColumn y método para forzar re-render
defineExpose({
  localColumn,
  forceRerender: () => {
    dragCounter.value++
    console.log('🔄 ForceRerender llamado en columna:', props.columnIndex, 'counter:', dragCounter.value)
  }
})

// Sincronizar props → local (SOLO cuando NO estamos arrastrando)
watch(() => props.columnData, async (newData, oldData) => {
  // Si estamos arrastrando, NO actualizar desde props
  if (isDragging.value) {
    console.log('🚫 Drag en progreso, ignorando actualización de props:', props.columnIndex)
    return
  }
  
  // Comparar si realmente cambió para evitar loops
  const newDataJson = JSON.stringify(newData || [])
  const localJson = JSON.stringify(localColumn.value || [])
  
  console.log('📥 watch(props.columnData) ejecutado:', {
    columnIndex: props.columnIndex,
    newLength: newData?.length,
    oldLength: localColumn.value?.length,
    areEqual: newDataJson === localJson
  })
  
  // Si son iguales, saltar (evita loops infinitos)
  // NOTA: Después de un drag, pueden ser iguales porque VueDraggable ya modificó localColumn
  if (newDataJson === localJson) {
    console.log('⏭️ props.columnData sin cambios reales, saltando actualización:', props.columnIndex)
    return
  }
  
  console.log('✅ Actualizando localColumn desde props:', props.columnIndex)
  
  isUpdatingFromProps.value = true
  localColumn.value = [...(newData || [])]
  
  await nextTick()
  isUpdatingFromProps.value = false
}, { deep: true })

// Handler cuando empieza el drag
const handleDragStart = (event) => {
  console.log('🚀 Drag iniciado en columna:', props.columnIndex)
  isDragging.value = true
}

// Handler cuando cambia el array durante el drag
const handleDragChange = (event) => {
  console.log('🔄 Cambio detectado durante drag:', {
    columnIndex: props.columnIndex,
    added: event.added,
    removed: event.removed,
    moved: event.moved,
    localColumn: localColumn.value.map(el => el.id)
  })
  
  // Si hubo un cambio (agregar o remover), notificar al padre inmediatamente
  if (event.added || event.removed) {
    console.log('📤 Emitiendo update por cambio en drag:', props.columnIndex)
    // Esperar a que VueDraggable termine de actualizar
    setTimeout(() => {
      emit('update', props.columnIndex, localColumn.value)
    }, 10)
  }
}

// Handler cuando termina el drag
const handleDragEnd = (event) => {
  console.log('🎯 Drag terminado en columna:', {
    columnIndex: props.columnIndex,
    elements: localColumn.value.map(el => el.id)
  })
  
  // Incrementar counter para forzar re-render de FormElements
  dragCounter.value++
  
  // Resetear flag de dragging
  setTimeout(() => {
    isDragging.value = false
    console.log('✅ Drag completado, isDragging = false:', props.columnIndex)
  }, 100)
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.stopPropagation()
  event.dataTransfer.dropEffect = 'copy'
  isDragOver.value = true
}

const handleDragLeave = (event) => {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = false
}

const handleDrop = (event) => {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = false
  
  const elementType = event.dataTransfer.getData('elementType')
  console.log('Drop en columna:', { elementType, containerId: props.containerId, columnIndex: props.columnIndex })
  
  if (elementType && elementType !== 'container') {
    addElement(elementType, props.containerId, props.columnIndex)
  } else if (elementType === 'container') {
    console.warn('No se permiten contenedores anidados')
  }
}
</script>

<style lang="scss" scoped>
.container-column {
  min-height: 60px;
  background: rgba(248, 249, 250, 0.5);
  border-radius: 4px;
  padding: 0.5rem;
  border: 2px dashed #dee2e6;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: #adb5bd;
    background: rgba(248, 249, 250, 0.8);
  }

  &.column-drag-over {
    border-color: #0d6efd;
    border-style: solid;
    background: rgba(13, 110, 253, 0.1);
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
  }

  .column-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #adb5bd;
    font-size: 0.75rem;
    pointer-events: none;
    z-index: 0;

    i {
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
    }
  }

  .column-items {
    min-height: 60px;
    position: relative;
    z-index: 1;
    
    // Asegurar que VueDraggable ocupe todo el espacio
    > div {
      min-height: 60px;
    }
  }
}

:deep(.column-ghost) {
  opacity: 0.5;
  background: #e9ecef;
}

</style>
