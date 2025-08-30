<script lang="ts" setup>
  const props = defineProps<{
    formData: any
  }>()
</script>

<template>
  <div class="flex gap-8">
    <FormCustomInput :label="'Regular Price'" :name="'regularPrice'" :placeholder="'VND'" />
    <FormCustomInput :label="'Compare at price'" :name="'salePrice'" :placeholder="'VND'" />
  </div>
</template>

<style scoped></style>
