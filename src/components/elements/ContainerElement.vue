<template>
  <div class="container-element" :style="containerStyle">
    <!-- Mostrar columnas siempre si children existe, incluso si están vacías -->
    <div v-if="props.children && props.children.length > 0" class="container-columns" :style="columnsStyle">
      <div 
        v-for="(column, index) in props.children"
        :key="`column-${index}`"
        class="container-column"
        @dragover.prevent="handleDragOver"
        @drop="(e) => handleDrop(e, index)"
      >
        <div 
          v-if="column.length === 0" 
          class="column-placeholder"
          @dragover.prevent="handleDragOver"
          @drop="(e) => handleDrop(e, index)"
        >
          <i class="fas fa-plus"></i>
          <span>Columna {{ index + 1 }}</span>
        </div>
        
        <VueDraggable 
          v-else
          v-model="props.children[index]"
          class="column-items"
          :animation="200"
          ghostClass="column-ghost"
          handle=".element__drag-handle"
          group="nested-elements"
        >
          <FormElement 
            v-for="child in column"
            :key="child.id"
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
    
    <!-- Fallback si no hay children inicializados -->
    <div 
      v-else
      class="container-placeholder"
      @dragover.prevent="handleDragOver"
      @drop="(e) => handleDrop(e, 0)"
    >
      <i class="fas fa-table-cells"></i>
      <span>Arrastra elementos aquí ({{ props.columns }} columna{{ props.columns > 1 ? 's' : '' }})</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'
import { useFormBuilderStore } from '../../stores/formBuilder'

const elementProps = defineProps({
  props: {
    type: Object,
    required: true
  },
  elementId: {
    type: String,
    required: true
  }
})

const { props, elementId } = elementProps

const store = useFormBuilderStore()
const { selectedElementId } = storeToRefs(store)
const { addElement, selectElement, removeElement, duplicateElement } = store

// Importar FormElement de forma diferida para evitar dependencia circular
const FormElement = () => import('../FormElement.vue')

const containerStyle = computed(() => ({
  borderRadius: `${props.borderRadius}px`,
  minHeight: '80px'
}))

const columnsStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  gap: `${props.gap}px`
}))

const handleDragOver = (event) => {
  event.preventDefault()
  event.stopPropagation()
  event.dataTransfer.dropEffect = 'copy'
}

const handleDrop = (event, columnIndex) => {
  event.preventDefault()
  event.stopPropagation()
  
  const elementType = event.dataTransfer.getData('elementType')
  console.log('Drop en contenedor:', { elementType, elementId, columnIndex })
  
  if (elementType && elementType !== 'container') {
    // No permitir contenedores anidados
    console.log('Agregando elemento:', elementType, 'al contenedor:', elementId, 'columna:', columnIndex)
    addElement(elementType, elementId, columnIndex)
  } else if (elementType === 'container') {
    console.warn('No se permiten contenedores anidados')
  }
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

  .container-column {
    min-height: 60px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    padding: 0.5rem;
    border: 1px dashed transparent;
    transition: all 0.2s;

    &:hover {
      border-color: #dee2e6;
    }

    .column-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60px;
      color: #adb5bd;
      font-size: 0.75rem;
      border: 1px dashed #dee2e6;
      border-radius: 4px;
      background: white;

      i {
        font-size: 1.25rem;
        margin-bottom: 0.25rem;
      }
    }

    .column-items {
      min-height: 40px;
    }
  }

  .column-ghost {
    opacity: 0.5;
    background: #e9ecef;
  }
}
</style>
