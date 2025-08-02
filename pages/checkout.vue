<template>
  <section id="checkout">
    <div class="grid grid-cols-12">
      <div class="col-span-7">
        <div id="checkout-logo" class="mb-16">
          <Logo />
        </div>
        <div class="mb-10">
          <h1 class="font-normal text-[76px] font-playfair uppercase">
            Checkout form
          </h1>
        </div>
        <div>
          <CheckoutForm />
        </div>
      </div>
      <div class="col-span-4 col-start-9">
        <div class="flex flex-col">
          <h5 class="mb-10 text-[32px] font-semibold uppercase text-[#3E3E3E]">
            Order Summary
          </h5>
          <div class="mb-8">
            <div class="bg-[#EDE5E1] px-4 py-3 flex justify-between">
              <p class="text-[16px] font-normal">
                Hooray! You have promo code!
                <a href="#" class="text-[#8B4513] text-[16px] font-normal"
                  >Use promo code</a
                >
              </p>
              <CloseIcon iconClass="size-4" />
            </div>
          </div>
          <CartOrderInfo :cartData="cartData" :totalPrice="totalPrice" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "checkout",
});

const cartStore = useCartStore();
const { cartData, totalPrice } = storeToRefs(cartStore);

await cartStore.fetchCartData();
</script>

<style lang="scss" scoped></style>
