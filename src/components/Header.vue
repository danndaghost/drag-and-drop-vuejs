<template>
  <header class="header">
    <div class="header__brand">
      <i class="fas fa-cube"></i>
      <span class="header__title">Form Builder</span>
    </div>
    
    <div class="header__actions">
      <button 
        class="btn btn-outline-light btn-sm me-2" 
        @click="clearForm"
        :disabled="!hasElements"
      >
        <i class="fas fa-trash"></i> Limpiar
      </button>
      <button 
        class="btn btn-light btn-sm" 
        @click="exportHTML"
        :disabled="!hasElements"
      >
        <i class="fas fa-download"></i> Exportar HTML
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useFormBuilderStore } from '../stores/formBuilder'
import { generateHTML } from '../utils/htmlGenerator'

const store = useFormBuilderStore()

const hasElements = computed(() => store.elements.length > 0)

const clearForm = () => {
  if (confirm('¿Estás seguro de que deseas limpiar el formulario?')) {
    store.clearAll()
  }
}

const exportHTML = () => {
  const html = generateHTML(store.elements)
  
  // Crear un blob y descargarlo
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `formulario-${Date.now()}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style lang="scss" scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &__brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;

    i {
      font-size: 1.5rem;
    }
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
