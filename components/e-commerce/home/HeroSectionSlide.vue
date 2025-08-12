<script setup lang="ts">
</script>

<template>
<section id="hero-slider" class="relative min-h-screen bg-cover bg-center object-cover"
  style="background-image: url('/images/hero-banner.jpg'); aspect-ratio: 16/9;">
  <div class="absolute flex flex-col gap-4 top-1/3 left-10 z-10 max-w-[870px] text-[#fff]">
    <p class="mb-4 text-base font-regular uppercase">
      made in Indonesia, dedicated to Indonesia
    </p>
    <h1 class="uppercase font-medium font-playfair text-7xl leading-[inherit]">
      Discover the Art of Dressing Up
    </h1>
  </div>
  <div class="absolute right-10 bottom-10 z-10">
<div class="flex bg-white gap-4 max-w-[442px] w-full">
  <img src="/images/dress.jpg" alt="dress"/>
  <div class="flex flex-col pl-0 pr-4 pt-4 pb-4 max-w-[226px] w-full">
    <div class="flex-1">
       <h5 class="font-playfair font-regular text-2xl mb-3">
        Product Name in Here
    </h5>
    <span class="font-regular text-base text-secondary">
    300.000đ
    </span>
    </div>

    <a class="justify-end underline">Shop Now</a>
  </div>
</div>
  </div>
    </section>
</template>

<style scoped>

</style>