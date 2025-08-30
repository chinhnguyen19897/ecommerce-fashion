<script lang="ts" setup>
  import FormCustomInput from '~/components/form/FormCustomInput.vue'
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox id="isProductPhysic" />
    <label
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      for="isProductPhysic"
    >
      This is a physical product</label
    >
  </div>
  <div>
    <!--  Packages  -->
  </div>
  <div>
    <FormCustomInput :name="'productWeight'" :type="'number'" />
  </div>
</template>

<style scoped></style>
