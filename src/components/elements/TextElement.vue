<template>
  <div class="text-element" :style="textStyle">
    {{ props.content }}
  </div>
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

const textStyle = computed(() => ({
  fontSize: `${props.fontSize}px`,
  fontWeight: props.fontWeight,
  textAlign: props.textAlign,
  color: props.color
}))
</script>

<style lang="scss" scoped>
.text-element {
  line-height: 1.5;
}
</style>
