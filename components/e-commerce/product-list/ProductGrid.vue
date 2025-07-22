<script setup>
const productEcommerceStore = useProductEcommerceStore()
const {productData} = storeToRefs(productEcommerceStore)
await productEcommerceStore.fetchProducts()
</script>

<template>
  <Transition mode="out-in" name="fade">
    <section class="relative w-full">
      <TransitionGroup class="grid grid-cols-3 gap-3" mode="in-out" name="shrink" tag="div">
        <ProductCard :productData="productData"/>
      </TransitionGroup>
    </section>
  </Transition>
</template>

<style lang="postcss" scoped>


.product-grid:empty {
  display: none;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
}

.shrink-move {
  transition: all 400ms;
}

.shrink-leave-active {
  transition: transform 300ms;
  position: absolute;
  opacity: 0;
}

.shrink-enter-active {
  transition: opacity 400ms ease-out 200ms,
  transform 400ms ease-out;
  will-change: opacity, transform;
}

.shrink-enter,
.shrink-leave-to,
.shrink-enter-from {
  opacity: 0;
  transform: scale(0.75) translateY(25%);
}
</style>