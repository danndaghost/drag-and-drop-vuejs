<template>
  <div class="textarea-element">
    <label v-if="props.label" class="form-label">
      {{ props.label }}
      <span v-if="props.required" class="text-danger">*</span>
    </label>
    <textarea 
      class="form-control" 
      :placeholder="props.placeholder"
      :rows="props.rows"
      :required="props.required"
      :style="{ width: props.width }"
      disabled
    ></textarea>
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
.textarea-element {
  .form-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
}
</style>
