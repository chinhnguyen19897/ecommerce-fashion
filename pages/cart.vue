<template>
  <section class="mb-8">
    <div class="mb-5">
      <h1 class="font-playfair text-[70px] font-medium uppercase">Cart</h1>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-8 mx-[4.1667%]">
        <CartCard :cart-data="cartData" cart-page="true" height-img="187" width-img="140" />
        <div class="mt-4">
          <p
            :class="[
              showNote ? 'normal-case text-[#B4B4B4]' : 'text-[#8B4513] underline',
              'cursor-pointer text-xl'
            ]"
            @click="toggleShowNote"
          >
            {{ showNote ? 'Notes:' : 'Notes' }}
          </p>
          <Textarea
            v-if="showNote"
            class="mt-2 h-12 !min-h-8 w-full pt-3"
            placeholder="Eg: Please double check before packing."
          />
        </div>
      </div>
      <div class="col-span-4 col-start-9 flex flex-col gap-8">
        <h5 class="text-3xl font-normal uppercase text-[#3E3E3E]">Shopping Info</h5>
        <div class="flex flex-col gap-5">
          <div class="flex justify-between bg-[#EDE5E1] px-4 py-3">
            <p class="text-base font-normal">
              Hooray! You have promo code!
              <a class="text-base font-normal text-[#8B4513]" href="#">Use promo code</a>
            </p>
            <CloseIcon icon-class="size-4" />
          </div>
          <div class="flex flex-col gap-5">
            <div class="flex justify-between">
              <span class="text-2xl text-[#757575]">Subtotal</span>
            </div>
            <div class="flex justify-between">
              <span class="text-2xl font-semibold">Total</span>
              <span class="text-2xl font-semibold">{{ formatCurrency(totalPrice) }}</span>
            </div>
          </div>
        </div>
        <div>
          <BaseBtn
            btn-class="bg-[#8B4513] rounded-none tracking-[2px] w-full !p-5 text-white text-center text-lg font-lato uppercase font-normal"
            label="Proceed to checkout"
            @click="$router.push('/checkout')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  const shoppingCartStore = useCartStore()
  const { cartData, totalPrice } = storeToRefs(shoppingCartStore)
  const showNote = ref(false)
  const toggleShowNote = () => {
    showNote.value = !showNote.value
  }
  await shoppingCartStore.fetchCartData()
</script>

<style scoped></style>
