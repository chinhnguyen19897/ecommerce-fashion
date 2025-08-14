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
  import VideoPromoSection from '~/components/e-commerce/home/VideoPromoSection.vue'
  import ReviewsSection from '~/components/e-commerce/home/ReviewsSection.vue'
</script>
