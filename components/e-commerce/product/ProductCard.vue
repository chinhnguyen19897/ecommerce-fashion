<script lang="ts" setup>

import StarRating from "~/components/e-commerce/product/StarRating.vue";

const props = defineProps(['productData'])
const imgWidth = 280;
const imgHeight = Math.round(imgWidth * 1.125);
const config = useRuntimeConfig()

const FALL_BACK_IMG_URL = config?.public?.FALL_BACK_IMG_URL

</script>

<template>
  <div v-for="products in productData" :key="product?.id" class="relative group">
    <NuxtLink :title="product?.name">
      <NuxtImg :alt="product?.name"
               :height="imgHeight"
               :loading="'lazy'"
               :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
               :src="product?.images?.length >0?product?.images[0]?.url:FALL_BACK_IMG_URL"

               :title="product?.name"
               :width="imgWidth"
               class="rounded-lg object-top object-cover w-full aspect-9/8"

               placeholder-class="blur-xl"/>
    </NuxtLink>
    <div class="p-2">

      <!--      <StarRating :rating="computeProductReview(product)"/>-->

      <NuxtLink :title="product?.name">
        <h2 class="mb-2 font-light leading-tight group-hover:text-primary">{{ product?.name }}</h2>
      </NuxtLink>
      <ProductPrice :regular-price="product?.price" :sale-price="product?.price +' $'" class="text-sm"/>
    </div>
  </div>
</template>

<style scoped>

</style>