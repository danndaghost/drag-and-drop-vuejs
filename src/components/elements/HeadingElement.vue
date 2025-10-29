<template>
  <component :is="props.level" class="heading-element" :style="headingStyle">
    {{ props.content }}
  </component>
</template>

<script setup>
import { computed } from 'vue'

const elementProps = defineProps({
  props: {
    type: Object,
    required: true
  }
})

const { props } = elementProps

const headingStyle = computed(() => ({
  fontSize: `${props.fontSize}px`,
  fontWeight: props.fontWeight,
  textAlign: props.textAlign,
  color: props.color
}))
</script>

<style lang="scss" scoped>
.heading-element {
  margin-top: 0;
}
</style>
