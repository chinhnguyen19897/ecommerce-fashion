<template>
  <div v-for="product in cartData">
    <div class="flex gap-4">
      <div :class="[cartPage ? 'max-w-[140px]' : 'max-w-[116px]', 'w-full']">
        <NuxtImg
          :height="heightImg"
          :src="product.product.images[0]?.url || ''"
          :width="widthImg"
          alt="product-image"
          fetchpriority="high"
          placeholder
          title="product-image"
        />
      </div>
      <div class="flex w-full flex-col gap-2">
        <h5 :class="[cartPage ? 'text-2xl' : 'text-lg', 'font-light text-[#3E3E3E]']">
          {{ product.product.name }}
        </h5>
        <p :class="[cartPage ? 'text-2xl' : 'text-sm', 'font-light text-[#757575]']">
          {{ formatCurrency(Number(product?.product?.price)) }}
        </p>
        <div class="flex justify-between">
          <BaseInputNumber
            v-model="product.quantity"
            :icon-class="[cartPage ? 'size-6' : 'size-4']"
            :icon-class-minus="[cartPage ? 'size-6' : 'size-4']"
            :input-class="[cartPage ? 'text-lg h-[56px]' : 'text-xs', 'h-[35px]']"
            :max="10"
            :max-width="[cartPage ? '150px' : '100px']"
            :min="1"
            aria-label="Quantity"
          />
          <div class="flex cursor-pointer items-center gap-2 text-xs text-[#929292] underline">
            <TrashIcon :icon-class="[cartPage ? 'size-6' : 'size-4']" />
            <span :class="[cartPage ? 'text-lg' : 'text-sm']">Delete</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { ICartData } from '~/types/cart.js'

  const props = defineProps({
    cartData: {
      type: Array<ICartData>,
      required: true
    },
    widthImg: {
      type: String,
      default: '116'
    },
    heightImg: {
      type: String,
      default: '155'
    },
    cartPage: {
      type: Boolean,
      default: false
    }
  })
</script>

<style scoped></style>
