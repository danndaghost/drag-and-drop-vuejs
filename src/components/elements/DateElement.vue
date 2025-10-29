<template>
  <div class="date-element">
    <label v-if="props.label" class="form-label">
      {{ props.label }}
      <span v-if="props.required" class="text-danger">*</span>
    </label>
    <input 
      type="date" 
      class="form-control" 
      :required="props.required"
      :style="{ width: props.width }"
      disabled
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
.date-element {
  .form-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
}
</style>
