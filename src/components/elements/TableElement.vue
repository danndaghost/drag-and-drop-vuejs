<template>
  <div class="table-element">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="col in props.columns" :key="col.id">
            {{ col.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="col in props.columns" :key="col.id" class="text-muted text-center">
            <small>Vista previa - datos de ejemplo</small>
          </td>
        </tr>
        <tr>
          <td v-for="col in props.columns" :key="col.id" class="text-muted text-center">
            <small>Las filas se agregan en el formulario final</small>
          </td>
        </tr>
      </tbody>
    </table>
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
.table-element {
  .table {
    margin-bottom: 0;
    font-size: 0.875rem;
    
    thead {
      background-color: #f8f9fa;
      
      th {
        font-weight: 600;
        color: #495057;
        padding: 0.75rem;
      }
    }
    
    tbody {
      td {
        padding: 0.75rem;
      }
    }
  }
}
</style>
