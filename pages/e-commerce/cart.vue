<template>
  <section class="mb-8">
    <div class="mb-5">
      <h1 class="text-[70px] font-playfair font-medium uppercase">Cart</h1>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-8 mx-[4.1667%]">
        <CartCard
          :cartData="cartData"
          cartPage="true"
          widthImg="140"
          heightImg="187"
        />
        <div class="mt-4">
          <p
            @click="toggleShowNote"
            :class="[
              showNote
                ? 'text-[#B4B4B4] normal-case'
                : 'text-[#8B4513] underline',
              'text-xl cursor-pointer',
            ]"
          >
            {{ showNote ? "Notes:" : "Notes" }}
          </p>
          <Textarea
            placeholder="Eg: Please double check before packing."
            v-if="showNote"
            class="w-full !min-h-8 h-12 pt-3 mt-2"
          ></Textarea>
        </div>
      </div>
      <div class="flex flex-col gap-8 col-span-4 col-start-9">
        <h5 class="text-3xl uppercase text-[#3E3E3E] font-normal">
          Shopping Info
        </h5>
        <div class="flex flex-col gap-5">
          <div class="bg-[#EDE5E1] px-4 py-3 flex justify-between">
            <p class="text-[16px] font-normal">
              Hooray! You have promo code!
              <a href="#" class="text-[#8B4513] text-[16px] font-normal"
                >Use promo code</a
              >
            </p>
            <CloseIcon iconClass="size-4" />
          </div>
          <div class="flex flex-col gap-5">
            <div class="flex justify-between">
              <span class="text-2xl text-[#757575]">Subtotal</span>
            </div>
            <div class="flex justify-between">
              <span>Total</span>
            </div>
          </div>
        </div>
        <div>
          <BaseBtn
            btnClass="bg-[#8B4513] rounded-none tracking-[2px] w-full !p-5 text-white text-center text-lg font-lato uppercase font-normal"
            label="Proceed to checkout"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const shoppingCartStore = useCartStore();
const { cartData } = storeToRefs(shoppingCartStore);
const showNote = ref(false);

const toggleShowNote = () => {
  showNote.value = !showNote.value;
};

onMounted(() => {
  shoppingCartStore.fetchCartData();
});
</script>

<style scoped></style>
