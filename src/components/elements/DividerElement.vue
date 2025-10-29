<template>
  <hr class="divider-element" :style="dividerStyle" />
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

const dividerStyle = computed(() => ({
  height: `${props.height}px`,
  backgroundColor: props.color,
  border: 'none'
}))
</script>
