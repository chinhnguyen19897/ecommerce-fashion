<template>
  <div v-for="product in cartData" class="mb-10">
    <div class="flex gap-4">
      <div :class="[cartPage ? 'max-w-[140px]' : 'max-w-[116px]', 'w-full']">
        <NuxtImg
          :src="product.product.images[0]?.url || ''"
          :width="widthImg"
          :height="heightImg"
          title="product-image"
          alt="product-image"
          fetchpriority="high"
          placeholder
        />
      </div>
      <div class="flex flex-col w-full gap-2">
        <h5 class="text-[#3E3E3E] font-light text-xl uppercase">
          {{ product.product.name }}
        </h5>
        <p class="text-[#757575] text-base font-light flex items-center">
          {{
            product?.quantity +
            " X " +
            formatCurrency(Number(product?.product?.price))
          }}
        </p>
      </div>
    </div>
  </div>
  <div class="table table-auto w-full">
    <div class="table-row-group">
      <div class="table-row mb-3">
        <div class="table-cell pb-3 text-left">
          <span class="text-[#757575]">Subtotal</span>
        </div>
        <div class="table-cell pb-3 text-right">
          <span class="text-[#757575]">{{ formatCurrency(totalPrice) }}</span>
        </div>
      </div>
      <div class="table-row mb-3">
        <div class="table-cell pb-3 text-left">
          <span class="text-[#757575]">Voucher</span>
        </div>
        <div class="table-cell pb-3 text-right">
          <span class="text-[#757575]"></span>
        </div>
      </div>
      <div class="table-row mb-3">
        <div class="table-cell pb-3 text-left">
          <span class="text-[#757575]">Shipping</span>
        </div>
        <div class="table-cell pb-3 text-right">
          <span class="text-[#757575]"></span>
        </div>
      </div>
      <div class="table-row font-bold mt-3">
        <div class="table-cell pt-3 text-left">
          <span class="text-[#3E3E3E]">Total</span>
        </div>
        <div class="table-cell pt-3 text-right">
          <span class="text-[#3E3E3E]">{{ formatCurrency(totalPrice) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cartData: {
    type: Array,
    require: true,
  },
  totalPrice: {
    type: Number,
  },
});
</script>

<style lang="scss" scoped></style>
