<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <h5><i class="fas fa-th-large"></i> Elementos</h5>
    </div>
    
    <div class="sidebar__content">
      <div 
        v-for="element in availableElements" 
        :key="element.type"
        class="sidebar__element"
        draggable="true"
        @dragstart="handleDragStart($event, element.type)"
      >
        <i :class="`fas ${element.icon}`"></i>
        <span>{{ element.label }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useFormBuilderStore } from '../stores/formBuilder'

const store = useFormBuilderStore()
const { availableElements } = store

const handleDragStart = (event, elementType) => {
  event.dataTransfer.effectAllowed = 'copy'
  event.dataTransfer.setData('elementType', elementType)
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &__header {
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
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

  &__content {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  &__element {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: grab;
    transition: all 0.2s;
    user-select: none;

    &:hover {
      border-color: #667eea;
      background: #f8f9ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(102, 126, 234, 0.15);
    }

    &:active {
      cursor: grabbing;
    }

    i {
      font-size: 1.5rem;
      color: #667eea;
    }

    span {
      font-size: 0.75rem;
      font-weight: 500;
      color: #495057;
      text-align: center;
    }
  }
}
</style>
