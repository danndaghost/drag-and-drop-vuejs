<template>
  <main class="canvas">
    <div class="canvas__header">
      <h5><i class="fas fa-file-alt"></i> Canvas del Formulario</h5>
      <div v-if="elements.length > 0" class="canvas__info">
        {{ elements.length }} elemento{{ elements.length !== 1 ? 's' : '' }}
      </div>
    </div>

    <div 
      class="canvas__content"
      @dragover.prevent="handleDragOver"
      @drop="handleDrop"
      :class="{ 'canvas__content--empty': elements.length === 0 }"
    >
      <div v-if="elements.length === 0" class="canvas__empty">
        <i class="fas fa-hand-pointer"></i>
        <p>Arrastra elementos aquí para comenzar a construir tu formulario</p>
      </div>

      <VueDraggable 
        v-else
        v-model="elements"
        class="canvas__elements"
        :animation="200"
        ghostClass="canvas__ghost"
        handle=".element__drag-handle"
      >
        <FormElement 
          v-for="element in elements"
          :key="element.id"
          :element="element"
          :isSelected="selectedElementId === element.id"
          @select="selectElement(element.id)"
          @remove="removeElement(element.id)"
          @duplicate="duplicateElement(element.id)"
        />
      </VueDraggable>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'
import { useFormBuilderStore } from '../stores/formBuilder'
import FormElement from './FormElement.vue'

const store = useFormBuilderStore()
const { elements, selectedElementId } = storeToRefs(store)
const { addElement, selectElement, removeElement, duplicateElement } = store

const handleDragOver = (event) => {
  event.dataTransfer.dropEffect = 'copy'
}

const handleDrop = (event) => {
  event.preventDefault()
  const elementType = event.dataTransfer.getData('elementType')
  if (elementType) {
    addElement(elementType)
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  overflow: hidden;

  &__header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;

    h5 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #495057;

      i {
        margin-right: 0.5rem;
        color: #667eea;
      }
    }
  }

  &__info {
    font-size: 0.875rem;
    color: #6c757d;
    background: #e9ecef;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    background: #f8f9fa;

    &--empty {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__empty {
    text-align: center;
    color: #adb5bd;

    i {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    p {
      font-size: 1.125rem;
      margin: 0;
    }
  }

  &__elements {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    min-height: 400px;
  }

  &__ghost {
    opacity: 0.5;
    background: #e9ecef;
  }
}
</style>
