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
        <h5
          :class="[
            cartPage ? 'text-2xl' : 'text-lg',
            'text-[#3E3E3E] font-light',
          ]"
        >
          {{ product.product.name }}
        </h5>
        <p
          :class="[
            cartPage ? 'text-2xl' : 'text-sm',
            'text-[#757575] font-light flex items-center',
          ]"
        >
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
        <div class="table-cell pb-3 text-left"><span>Subtotal</span></div>
        <div class="table-cell pb-3 text-right">
          <span>{{ formatCurrency(totalPrice) }}</span>
        </div>
      </div>
      <div class="table-row mb-3">
        <div class="table-cell pb-3 text-left"><span>Voucher</span></div>
        <div class="table-cell pb-3 text-right"><span></span></div>
      </div>
      <div class="table-row mb-3">
        <div class="table-cell pb-3 text-left"><span>Shipping</span></div>
        <div class="table-cell pb-3 text-right"><span></span></div>
      </div>
      <div class="table-row font-bold mt-3">
        <div class="table-cell pt-3 text-left"><span>Total</span></div>
        <div class="table-cell pt-3 text-right">
          <span>{{ formatCurrency(totalPrice) }}</span>
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
