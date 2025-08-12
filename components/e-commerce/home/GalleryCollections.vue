<script setup lang="ts">

</script>

<template>
  <section id="gallery-collections" class="my-10 w-full">
   <div class="w-full px-[42px]">
       <div class="grid grid-cols-2 gap-8">
      <div class="grid grid-rows-2 gap-8">
        <NuxtLink to="/" class="relative">
          <NuxtImg src="/images/gallery-1.jpg" alt="gallery-1" class="w-full h-full object-cover"/>
          <p class="absolute top-1/2 -translate-y-1/2 left-10 text-[#fff] font-medium font-playfair text-5xl uppercase">Formal Woman</p>
        </NuxtLink>
         <NuxtLink to="/" class="relative">
<NuxtImg src="/images/gallery-2.jpg" alt="gallery-2" class="w-full h-full object-cover" />
           <p class="absolute top-1/2 -translate-y-1/2 left-10 text-[#fff] font-medium font-playfair text-5xl uppercase">Formal Men</p>
        </NuxtLink>
      </div>
      <NuxtLink to="/" class="relative">
  <NuxtImg src="/images/gallery-3.jpg" alt="gallery-3"
          class="w-full h-full object-cover" />
        <p class="absolute top-1/2 -translate-y-1/2 left-16 text-[#fff] font-medium font-playfair text-5xl uppercase">Casual Style</p>
</NuxtLink>
    </div>
   </div>
  </section>
</template>

<style scoped>

</style>