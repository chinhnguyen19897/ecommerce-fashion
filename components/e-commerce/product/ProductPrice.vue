<script lang="ts" setup>
interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
  isSingleProductPage?: boolean;
}

const { regularPrice, salePrice, isSingleProductPage } =
  defineProps<ProductPriceProps>();
</script>

<template>
  <div
    :class="['flex font-semibold', isSingleProductPage ? 'flex-col gap-2' : '']"
  >
    <span
      :class="[
        isSingleProductPage ? 'text-2xl' : '',
        { 'text-gray-400 line-through font-normal': salePrice },
      ]"
      v-html="regularPrice"
    />
    <span
      v-if="salePrice"
      :class="[
        'text-[#E90000]',
        isSingleProductPage ? 'ml-0 text-[32px]' : 'ml-2',
      ]"
      v-html="salePrice"
    />
  </div>
</template>
