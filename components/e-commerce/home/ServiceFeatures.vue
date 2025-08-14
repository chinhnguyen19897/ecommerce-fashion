<script lang="ts" setup>
  import { ref, onMounted, nextTick } from 'vue'
  import gsap from 'gsap'

  const sectionRef = ref<HTMLElement | null>(null)
  const featureCards = ref<HTMLElement[]>([])

  const animateFeatures = () => {
    gsap.from(featureCards.value, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    })
  }

  onMounted(() => {
    nextTick(() => {
      if (sectionRef.value) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateFeatures()
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.2 }
        )

        observer.observe(sectionRef.value)
      }
    })
  })
</script>

<template>
  <section ref="sectionRef" class="my-10 w-full">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div
          :ref="(el) => (featureCards[0] = el as HTMLElement)"
          class="bg-[#F2F2F2] p-6 md:col-span-1 lg:col-span-1"
        >
          <div class="flex h-full flex-col items-center bg-white p-6 text-center">
            <div class="bg-brown-500 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <LikeIcon />
            </div>
            <h3 class="font-regular mb-2 font-serif text-3xl leading-[39px]">
              100% Satisfaction Guaranteed
            </h3>
            <p class="font-regular text-base text-secondary">
              Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi
              vulputate. Quisque bibendum eget id diam elementum fringilla duis.
            </p>
          </div>
        </div>

        <div
          :ref="(el) => (featureCards[1] = el as HTMLElement)"
          class="space-y-8 md:col-span-2 lg:col-span-2"
        >
          <div class="bg-[#F2F2F2] p-6">
            <div class="flex items-center gap-4 bg-white p-6">
              <div
                class="bg-brown-500 mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              >
                <PhoneIcon />
              </div>
              <div>
                <h3 class="font-regular mb-4 font-serif text-3xl leading-[39px]">
                  24/7 Online Service
                </h3>
                <p class="font-regular text-base text-secondary">
                  Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi
                  vulputate. Quisque bibendum eget id diam elementum fringilla duis.
                </p>
              </div>
            </div>
          </div>
          <div class="bg-[#F2F2F2] p-6">
            <div class="flex items-center gap-4 bg-white p-6">
              <div class="bg-brown-500 mb-4 flex h-16 w-16 items-center justify-center">
                <RocketIcon />
              </div>
              <div>
                <h3 class="font-regular mb-4 font-serif text-3xl leading-[39px]">Fast Delivery</h3>
                <p class="font-regular text-base text-secondary">
                  Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi
                  vulputate. Quisque bibendum eget id diam elementum fringilla duis.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          :ref="(el) => (featureCards[2] = el as HTMLElement)"
          class="bg-[#F2F2F2] p-6 md:col-span-1 lg:col-span-1"
        >
          <div class="flex h-full flex-col items-center bg-white p-6">
            <div class="bg-brown-500 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <CardIcon />
            </div>
            <h3 class="font-regular mb-2 font-serif text-3xl leading-[39px]">
              Payment With Secure System
            </h3>
            <p class="font-regular text-base text-secondary">
              Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi
              vulputate. Quisque bibendum eget id diam elementum fringilla duis.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
