<template>
  <HeroSectionSlide />
  <GalleryCollections />
  <ProductList :title="'the best dress for the best woman'" />
  <ProductList :title="'Best outfit for your happiness'" />
  <ServiceFeatures />
  <VideoPromoSection />
  <section class="relative z-20 my-10 w-full">
    <ReviewsSection />
  </section>
</template>
<script lang="ts" setup>
  import ServiceFeatures from '~/components/e-commerce/home/ServiceFeatures.vue'
</script>
