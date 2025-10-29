<template>
  <div id="app" class="form-builder">
    <Header />
    <div class="form-builder__workspace">
      <Sidebar />
      <Canvas />
      <PropertiesPanel />
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Canvas from './components/Canvas.vue'
import PropertiesPanel from './components/PropertiesPanel.vue'

useHead({
  title: 'Form Builder - Drag & Drop',
  meta: [
    {
      name: 'description',
      content: 'Constructor de formularios con drag and drop para generar HTML/PDF'
    }
  ]
})
</script>

<style lang="scss">
.form-builder {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__workspace {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
}
</style>
