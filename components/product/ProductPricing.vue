<script lang="ts" setup>
  const props = defineProps<{
    formData: any
  }>()
</script>

<template>
  <div class="flex gap-8">
    <FormInput
      :id="'regularPrice'"
      :forLabel="'regularPrice'"
      :label="'Regular Price'"
      :placeholder="'VND'"
    />
    <FormInput
      :id="'salePrice'"
      :forLabel="'salePrice'"
      :label="'Compare at price'"
      :placeholder="'VND'"
    />
  </div>
</template>

<style scoped></style>
