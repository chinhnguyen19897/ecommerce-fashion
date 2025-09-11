<script lang="ts" setup>
  import { Navigation, A11y } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/navigation'

  import { Star } from 'lucide-vue-next'

  const modules = [Navigation, A11y]
  const containerRef = ref(null)

  const reviews = [
    {
      name: 'CYNTHIA CAROLINE',
      date: '15 July 2023',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla duis. Faucibus pharetra dictum quis feugiat eu augue semper et nulla. Lectus turpis ut et eros tortor placerat rhoncus. Imperdiet purus eu ornare vel. Donec commodo elementum.'
    },
    {
      name: 'CYNTHIA CAROLINE',
      date: '15 July 2023',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla duis. Faucibus pharetra dictum quis feugiat eu augue semper et nulla. Lectus turpis ut et eros tortor placerat rhoncus. Imperdiet purus eu ornare vel. Donec commodo elementum.'
    },
    {
      name: 'CYNTHIA CAROLINE',
      date: '15 July 2023',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla duis. Faucibus pharetra dictum quis feugiat eu augue semper et nulla. Lectus turpis ut et eros tortor placerat rhoncus. Imperdiet purus eu ornare vel. Donec commodo elementum.'
    },
    {
      name: 'CYNTHIA CAROLINE',
      date: '15 July 2023',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla duis. Faucibus pharetra dictum quis feugiat eu augue semper et nulla. Lectus turpis ut et eros tortor placerat rhoncus. Imperdiet purus eu ornare vel. Donec commodo elementum.'
    },
    {
      name: 'CYNTHIA CAROLINE',
      date: '15 July 2023',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla duis. Faucibus pharetra dictum quis feugiat eu augue semper et nulla. Lectus turpis ut et eros tortor placerat rhoncus. Imperdiet purus eu ornare vel. Donec commodo elementum.'
    },
    {
      name: 'CYNTHIA CAROLINE',
      date: '15 July 2023',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla duis. Faucibus pharetra dictum quis feugiat eu augue semper et nulla. Lectus turpis ut et eros tortor placerat rhoncus. Imperdiet purus eu ornare vel. Donec commodo elementum.'
    }
  ]
  const swiper = useSwiper(containerRef, {
    loop: true,
    autoplay: {
      delay: 3000
    },
    breakpoints: {
      480: { slidesPerView: 1.2, spaceBetween: 16 },
      640: { slidesPerView: 1.5, spaceBetween: 18 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
      1280: { slidesPerView: 3.5, spaceBetween: 24 }
    },
    slidesPerView: 1,
    spaceBetween: 16,
    modules: modules
  })
  onMounted(() => {
    console.log(swiper.instance)
  })
</script>

<template>
  <div class="mx-[42px] bg-[#F2F2F2] py-16">
    <ClientOnly>
      <swiper-container ref="containerRef" :init="false">
        <swiper-slide v-for="(review, index) in reviews" :key="index">
          <article class="h-full bg-white p-6">
            <header class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="mr-4 h-12 w-12 rounded-full bg-red-900"></div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-800">
                    {{ review.name }}
                  </h3>
                  <p class="text-xs text-gray-500">
                    {{ review.date }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <Star
                  v-for="i in review.rating"
                  :key="i"
                  class="text-yellow-400 h-5 w-5"
                  fill="currentColor"
                />
              </div>
            </header>
            <p class="mt-4 text-sm text-gray-600">
              {{ review.text }}
            </p>
          </article>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
