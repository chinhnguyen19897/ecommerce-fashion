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
      <div class="flex w-full flex-col gap-2">
        <h5 class="text-xl font-light uppercase text-[#3E3E3E]">
          {{ product.product.name }}
        </h5>
        <p class="flex items-center text-base font-light text-[#757575]">
          {{ product?.quantity + ' X ' + formatCurrency(Number(product?.product?.price)) }}
        </p>
      </div>
    </div>
  </div>
  <div class="table w-full table-auto">
    <div class="table-row-group">
      <div class="mb-3 table-row">
        <div class="table-cell pb-3 text-left">
          <span class="text-[#757575]">Subtotal</span>
        </div>
        <div class="table-cell pb-3 text-right">
          <span class="text-[#757575]">{{ formatCurrency(totalPrice) }}</span>
        </div>
      </div>
      <div class="mb-3 table-row">
        <div class="table-cell pb-3 text-left">
          <span class="text-[#757575]">Voucher</span>
        </div>
        <div class="table-cell pb-3 text-right">
          <span class="text-[#757575]"></span>
        </div>
      </div>
      <div class="mb-3 table-row">
        <div class="table-cell pb-3 text-left">
          <span class="text-[#757575]">Shipping</span>
        </div>
        <div class="table-cell pb-3 text-right">
          <span class="text-[#757575]"></span>
        </div>
      </div>
      <div class="mt-3 table-row font-bold">
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
      require: true
    },
    totalPrice: {
      type: Number
    }
  })
</script>

<style lang="scss" scoped></style>
