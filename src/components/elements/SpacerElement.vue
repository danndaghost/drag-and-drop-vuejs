<template>
  <div class="spacer-element" :style="{ height: `${props.height}px` }"></div>
</template>

<script setup>
defineProps({
  props: {
    type: Object,
    required: true
  }
})
</script>
