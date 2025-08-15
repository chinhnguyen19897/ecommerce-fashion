<script lang="ts" setup>
  import { ref, onMounted, nextTick } from 'vue'
  import gsap from 'gsap'

  const galleryItems = ref<HTMLElement[]>([])
  const sectionRef = ref<HTMLElement | null>(null)

  const galleryData = [
    { id: 1, src: '/images/gallery-1.jpg', alt: 'gallery-1', text: 'Formal Woman' },
    { id: 2, src: '/images/gallery-2.jpg', alt: 'gallery-2', text: 'Formal Men' },
    { id: 3, src: '/images/gallery-3.jpg', alt: 'gallery-3', text: 'Casual Style' }
  ]

  const animateGallery = () => {
    if (!galleryItems.value.length) return

    galleryItems.value.forEach((item) => {
      const image = item.querySelector('img')
      const text = item.querySelector('p')

      if (image && text) {
        item.addEventListener('mouseenter', () => {
          gsap.to(image, { scale: 1.05, duration: 0.3 })
          gsap.to(text, { y: -10, duration: 0.3 })
        })

        item.addEventListener('mouseleave', () => {
          gsap.to(image, { scale: 1, duration: 0.3 })
          gsap.to(text, { y: 0, duration: 0.3 })
        })
      }
    })
  }
  const animateGalleryEntrance = () => {
    gsap.fromTo(
      galleryItems.value,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.15
      }
    )
  }
  onMounted(() => {
    nextTick(() => {
      animateGallery()

      const screenWidth = window.innerWidth

      if (screenWidth < 1440) {
        animateGalleryEntrance()
      } else {
        if (sectionRef.value) {
          const observer = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  animateGalleryEntrance()
                  obs.unobserve(entry.target)
                }
              })
            },
            { threshold: 0.2 }
          )
          observer.observe(sectionRef.value)
        }
      }
    })
  })
</script>

<template>
  <section id="gallery-collections" ref="sectionRef" class="my-10 w-full">
    <div class="w-full px-[42px]">
      <div class="grid grid-cols-2 gap-8">
        <!-- Left column -->
        <div class="grid grid-rows-2 gap-8">
          <div
            v-for="(item, id) in galleryData.slice(0, 2)"
            :key="item.id"
            :ref="(el) => (galleryItems[id] = el as HTMLElement)"
            class="relative cursor-pointer overflow-hidden"
          >
            <NuxtLink to="/">
              <NuxtImg
                :alt="item.alt"
                :src="item.src"
                class="h-full w-full object-cover"
                loading="lazy"
                placeholder="blur"
              />
              <p
                class="absolute left-10 top-1/2 -translate-y-1/2 font-playfair text-5xl font-medium uppercase text-white"
              >
                {{ item.text }}
              </p>
            </NuxtLink>
          </div>
        </div>

        <!-- Right column -->
        <div
          :ref="(el) => (galleryItems[2] = el as HTMLElement)"
          class="relative cursor-pointer overflow-hidden"
        >
          <NuxtLink to="/">
            <NuxtImg
              :alt="galleryData[2].alt"
              :src="galleryData[2].src"
              class="h-full w-full object-cover"
              loading="lazy"
              placeholder="blur"
            />
            <p
              class="absolute left-16 top-1/2 -translate-y-1/2 font-playfair text-5xl font-medium uppercase text-white"
            >
              {{ galleryData[2].text }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .overflow-hidden {
    overflow: hidden;
  }
</style>
