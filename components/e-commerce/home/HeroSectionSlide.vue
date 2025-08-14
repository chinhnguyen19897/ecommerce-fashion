<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useNuxtApp } from '#app'

  const { $gsap } = useNuxtApp()
  const heroSection = ref<HTMLElement | null>(null)
  const heroBackground = ref<HTMLElement | null>(null)
  const headline = ref<HTMLElement | null>(null)
  const subheadline = ref<HTMLElement | null>(null)
  const productCard = ref<HTMLElement | null>(null)

  const initAnimations = () => {
    if (
      $gsap &&
      heroSection.value &&
      heroBackground.value &&
      headline.value &&
      subheadline.value &&
      productCard.value
    ) {
      const tl = $gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(heroBackground.value, { scale: 1.5, duration: 2 }, '-=0.5')
      tl.from(
        headline.value.children,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2
        },
        '-=1'
      )
      tl.from(subheadline.value, { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
      tl.from(productCard.value, { x: 100, opacity: 0, duration: 0.8 }, '-=0.4')
    } else {
      console.error('GSAP or required elements not available')
    }
  }

  onMounted(() => {
    nextTick(() => {
      initAnimations()
    })
  })
</script>

<template>
  <section id="hero-slider" ref="heroSection" class="relative w-full overflow-hidden">
    <div
      ref="heroBackground"
      class="xs:aspect-[3/4] aspect-[4/5] bg-cover bg-center sm:aspect-[5/6] md:aspect-video md:min-h-[70vh] lg:min-h-[85vh]"
      style="background-image: url('/images/hero-banner.jpg')"
    >
      <div class="absolute left-10 top-1/3 z-10 flex max-w-[870px] flex-col gap-4 text-[#fff]">
        <p ref="subheadline" class="font-regular mb-4 text-base uppercase">
          made in Indonesia, dedicated to Indonesia
        </p>
        <h1 ref="headline" class="font-playfair text-7xl font-medium uppercase leading-[inherit]">
          <span>Discover</span> <span>the Art</span> <span>of</span> <span>Dressing Up</span>
        </h1>
      </div>
      <div ref="productCard" class="absolute bottom-10 right-10 z-10">
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
