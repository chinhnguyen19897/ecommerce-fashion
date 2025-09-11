<template>
  <section id="checkout">
    <div class="grid grid-cols-12">
      <div class="col-span-7">
        <div id="checkout-logo" class="mb-16">
          <Logo />
        </div>
        <div class="mb-10">
          <h1 class="font-playfair text-[76px] font-normal uppercase">Checkout form</h1>
        </div>
        <div>
          <CheckoutForm :cart-data="cartData" :total-price="totalPrice" />
        </div>
      </div>
      <div class="col-span-4 col-start-9">
        <div class="flex flex-col">
          <h5 class="mb-10 text-[32px] font-semibold uppercase text-[#3E3E3E]">Order Summary</h5>
          <div class="mb-8">
            <div class="flex justify-between bg-[#EDE5E1] px-4 py-3">
              <p class="text-base font-normal">
                Hooray! You have promo code!
                <a href="#" class="text-base font-normal text-[#8B4513]">Use promo code</a>
              </p>
              <CloseIcon icon-class="size-4" />
            </div>
          </div>
          <CartOrderInfo :cart-data="cartData" :total-price="totalPrice" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  definePageMeta({
    layout: 'checkout'
  })

  const cartStore = useCartStore()
  const { cartData, totalPrice } = storeToRefs(cartStore)

  await cartStore.fetchCartData()
</script>

<style lang="scss" scoped></style>
