<script lang="ts" setup></script>

<template>
  <div class="mt-12 container mx-auto px-[42px]">
    <div class="w-full">
      <h1 class="text-7xl font-medium mb-8">All Product</h1>
      <div class="grid grid-cols-[1.2fr_3.8fr] gap-6">
        <Filter />
        <ProductGrid />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
