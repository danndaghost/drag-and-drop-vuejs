<template>
  <div 
    class="form-element"
    :class="{ 'form-element--selected': isSelected }"
    @click.stop="handleSelect"
  >
    <div class="element__toolbar">
      <div class="element__drag-handle" title="Arrastra para reordenar">
        <i class="fas fa-grip-vertical"></i>
      </div>
      <div class="element__actions">
        <button 
          class="element__action" 
          @click.stop="$emit('duplicate')"
          title="Duplicar"
        >
          <i class="fas fa-copy"></i>
        </button>
        <button 
          class="element__action element__action--danger" 
          @click.stop="$emit('remove')"
          title="Eliminar"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>

    <div class="element__content">
      <component 
        :is="elementComponent" 
        :props="element.props"
        :elementId="element.id"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TextElement from './elements/TextElement.vue'
import HeadingElement from './elements/HeadingElement.vue'
import InputElement from './elements/InputElement.vue'
import TextareaElement from './elements/TextareaElement.vue'
import SelectElement from './elements/SelectElement.vue'
import CheckboxElement from './elements/CheckboxElement.vue'
import RadioElement from './elements/RadioElement.vue'
import DateElement from './elements/DateElement.vue'
import DividerElement from './elements/DividerElement.vue'
import ImageElement from './elements/ImageElement.vue'
import SpacerElement from './elements/SpacerElement.vue'
import ContainerElement from './elements/ContainerElement.vue'

const props = defineProps({
  element: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  isNested: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'remove', 'duplicate'])

const elementComponents = {
  text: TextElement,
  heading: HeadingElement,
  input: InputElement,
  textarea: TextareaElement,
  select: SelectElement,
  checkbox: CheckboxElement,
  radio: RadioElement,
  date: DateElement,
  divider: DividerElement,
  image: ImageElement,
  spacer: SpacerElement,
  container: ContainerElement
}

const elementComponent = computed(() => {
  return elementComponents[props.element.type] || TextElement
})

const handleSelect = () => {
  emit('select')
}
</script>

<style lang="scss" scoped>
.form-element {
  position: relative;
  margin-bottom: 1rem;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    border-color: #dee2e6;

    .element__toolbar {
      opacity: 1;
    }
  }

  &--selected {
    border-color: #667eea !important;
    background: #f8f9ff;

    .element__toolbar {
      opacity: 1;
    }
  }
}

.element__toolbar {
  position: absolute;
  top: -12px;
  right: 8px;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
}

.element__drag-handle {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: grab;
  color: #6c757d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:active {
    cursor: grabbing;
  }

  i {
    font-size: 0.875rem;
  }
}

.element__actions {
  display: flex;
  gap: 0.25rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.element__action {
  border: none;
  background: transparent;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  color: #6c757d;
  border-radius: 3px;
  transition: all 0.2s;

  &:hover {
    background: #e9ecef;
    color: #495057;
  }

  &--danger:hover {
    background: #dc3545;
    color: white;
  }

  i {
    font-size: 0.875rem;
  }
}

.element__content {
  padding: 0.5rem;
}
</style>
