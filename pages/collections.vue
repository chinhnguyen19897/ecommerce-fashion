<script lang="ts" setup>
  const productEcommerceStore = useProductEcommerceStore()
  const { productData } = storeToRefs(productEcommerceStore)
  await productEcommerceStore.fetchProducts()
</script>

<template>
  <div class="w-full">
    <h1 class="mb-8 text-7xl font-medium">All Product</h1>
    <div class="grid grid-cols-[1.2fr_3.8fr] gap-6">
      <Filter />
      <ProductGrid :product-data="productData" />
    </div>
  </div>
</template>

<style scoped></style>
