<script lang="ts" setup></script>

<template>
  <section id="hero-slider" class="relative w-full overflow-hidden">
    <div
      class="xs:aspect-[3/4] aspect-[4/5] bg-cover bg-center sm:aspect-[5/6] md:aspect-video md:min-h-[70vh] lg:min-h-[85vh]"
      style="background-image: url('/images/hero-banner.jpg')"
    >
      <div class="absolute left-10 top-1/3 z-10 flex max-w-[870px] flex-col gap-4 text-[#fff]">
        <p class="font-regular mb-4 text-base uppercase">
          made in Indonesia, dedicated to Indonesia
        </p>
        <h1 class="font-playfair text-7xl font-medium uppercase leading-[inherit]">
          Discover the Art of Dressing Up
        </h1>
      </div>
      <div class="absolute bottom-10 right-10 z-10">
        <div class="flex w-full max-w-[442px] gap-4 bg-white">
          <img alt="dress" src="/images/dress.jpg" />
          <div class="flex w-full max-w-[226px] flex-col pb-4 pl-0 pr-4 pt-4">
            <div class="flex-1">
              <h5 class="font-regular mb-3 font-playfair text-2xl">Product Name in Here</h5>
              <span class="font-regular text-base text-secondary"> 300.000đ </span>
            </div>

            <a class="justify-end underline">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
