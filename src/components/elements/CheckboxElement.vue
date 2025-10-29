<template>
  <div class="checkbox-element">
    <div class="form-check">
      <input 
        class="form-check-input" 
        type="checkbox" 
        :required="props.required"
        disabled
      />
      <label class="form-check-label">
        {{ props.label }}
        <span v-if="props.required" class="text-danger">*</span>
      </label>
    </div>
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
.checkbox-element {
  .form-check-label {
    font-weight: 500;
  }
}
</style>
