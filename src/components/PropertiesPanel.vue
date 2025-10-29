<template>
  <aside class="properties-panel" v-if="selectedElement">
    <div class="properties-panel__header">
      <h5><i class="fas fa-sliders-h"></i> Propiedades</h5>
      <button class="btn-close-panel" @click="closePanel">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="properties-panel__content">
      <component 
        :is="propertiesComponent" 
        :element="selectedElement"
        @update="handleUpdate"
      />
    </div>
  </aside>
  
  <aside v-else class="properties-panel properties-panel--empty">
    <div class="properties-panel__empty">
      <i class="fas fa-mouse-pointer"></i>
      <p>Selecciona un elemento para editar sus propiedades</p>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFormBuilderStore } from '../stores/formBuilder'
import TextProperties from './properties/TextProperties.vue'
import HeadingProperties from './properties/HeadingProperties.vue'
import InputProperties from './properties/InputProperties.vue'
import TextareaProperties from './properties/TextareaProperties.vue'
import SelectProperties from './properties/SelectProperties.vue'
import CheckboxProperties from './properties/CheckboxProperties.vue'
import RadioProperties from './properties/RadioProperties.vue'
import DateProperties from './properties/DateProperties.vue'
import DividerProperties from './properties/DividerProperties.vue'
import ImageProperties from './properties/ImageProperties.vue'
import SpacerProperties from './properties/SpacerProperties.vue'
import ContainerProperties from './properties/ContainerProperties.vue'

const store = useFormBuilderStore()
const { selectedElement } = storeToRefs(store)
const { updateElementProps, selectElement } = store

const propertiesComponents = {
  text: TextProperties,
  heading: HeadingProperties,
  input: InputProperties,
  textarea: TextareaProperties,
  select: SelectProperties,
  checkbox: CheckboxProperties,
  radio: RadioProperties,
  date: DateProperties,
  divider: DividerProperties,
  image: ImageProperties,
  spacer: SpacerProperties,
  container: ContainerProperties
}

const propertiesComponent = computed(() => {
  if (!selectedElement.value) return null
  return propertiesComponents[selectedElement.value.type] || TextProperties
})

const handleUpdate = (props) => {
  if (selectedElement.value) {
    updateElementProps(selectedElement.value.id, props)
  }
}

const closePanel = () => {
  selectElement(null)
}
</script>

<style lang="scss" scoped>
.properties-panel {
  width: 320px;
  background: #f8f9fa;
  border-left: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &--empty {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__header {
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
    flex: 1;
  }

  &__empty {
    text-align: center;
    color: #adb5bd;
    padding: 2rem;

    i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    p {
      font-size: 0.9rem;
      margin: 0;
    }
  }
}

.btn-close-panel {
  background: transparent;
  border: none;
  color: #6c757d;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #e9ecef;
    color: #495057;
  }

  i {
    font-size: 1rem;
  }
}
</style>
