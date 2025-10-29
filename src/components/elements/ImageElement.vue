<template>
  <div class="image-element">
    <img 
      :src="props.src" 
      :alt="props.alt"
      :style="{ width: props.width }"
      class="img-fluid"
    />
  </div>
</template>

<script setup>
defineProps({
  props: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.image-element {
  img {
    display: block;
  }
}
</style>
