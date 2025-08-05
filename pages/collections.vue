<script lang="ts" setup>
const productEcommerceStore = useProductEcommerceStore();
const { productData } = storeToRefs(productEcommerceStore);
await productEcommerceStore.fetchProducts();
</script>

<template>
  <div class="w-full">
    <h1 class="text-7xl font-medium mb-8">All Product</h1>
    <div class="grid grid-cols-[1.2fr_3.8fr] gap-6">
      <Filter />
      <ProductGrid :productData="productData"/>
    </div>
  </div>
</template>

<style scoped></style>
