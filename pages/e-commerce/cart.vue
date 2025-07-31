<template>
  <section>
    <div>
      <h1>Cart</h1>
    </div>
    <div>
      <div v-for="product in cartData">
        <div>
          <NuxtImg />
        </div>
        <div>
          <h5>{{ product.product.name }}</h5>
          <p>{{ product.product.price }}</p>
          <div>
            <BaseInputNumber />
            <div>
              <TrashIcon />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const shoppingCartStore = useCartStore();
const { cartData } = storeToRefs(shoppingCartStore);
await shoppingCartStore.fetchProduct();
</script>

<style scoped></style>
