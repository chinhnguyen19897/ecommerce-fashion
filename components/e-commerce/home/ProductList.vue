<script lang="ts" setup>
  const props = defineProps<{
    title?: string
    description?: string
    products?: any[]
  }>()
  import { useNuxtApp } from '#app'

  const { $gsap } = useNuxtApp()
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      image: '/images/products/product-1.jpg',
      category: 'Product Category'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 199.99,
      image: '/images/products/product-1.jpg',
      category: 'Product Category'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 299.99,
      image: '/images/products/product-1.jpg',
      category: 'Product Category'
    },
    {
      id: 4,
      name: 'Product 4',
      price: 399.99,
      image: '/images/products/product-1.jpg',
      category: 'Product Category'
    }
  ]
  const productGrid = ref<HTMLDivElement | null>(null)

  onMounted(() => {
    if (!productGrid.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $gsap.fromTo(
              productGrid.value!.children,
              { opacity: 0, x: -50 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.15
              }
            )

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(productGrid.value)
  })
</script>

<template>
  <section id="product-list" class="my-10 w-full">
    <div class="w-full px-[42px]">
      <div class="flex flex-col gap-8">
        <h2 class="font-playfair text-7xl font-medium uppercase">{{ props.title }}</h2>
        <div ref="productGrid" class="grid auto-cols-auto grid-flow-col gap-8">
          <div
            v-for="(product, id) in products"
            :key="id"
            class="group relative flex flex-col gap-4"
          >
            <NuxtImg
              :alt="product.name"
              :src="product.image"
              class="h-full w-full object-cover"
              loading="lazy"
              placeholder="blur"
            />
            <div class="flex flex-col gap-2">
              <p class="text-sm text-[#b4b4b4]">{{ product.category }}</p>
              <h3 class="font-playfair text-base uppercase text-secondary">{{ product.name }}</h3>
              <p class="text-sm text-[#b4b4b4]">{{ product.price }}</p>
            </div>
            <div
              class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-20"
            >
              <BaseBtn
                btnClass="bg-[#8B4513] rounded-none tracking-[2px] w-full !p-4 text-white text-center text-lg font-lato uppercase font-normal"
                class="w-full max-w-[282px] translate-y-full transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                label="Add To Cart"
              />
            </div>
          </div>
        </div>
        <div>
          <BaseBtn
            btnClass="!p-3 bg-[#8B4513] max-w-[150px] w-full uppercase text-[#fff] font-regular text-base rounded-none"
            label="SEE MORE"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .group:hover .group-hover\:bg-opacity-20 {
    background-color: rgba(255, 255, 255, 0.5);
  }

  .group:hover .group-hover\:translate-y-0 {
    transform: translateY(0);
  }

  .group:hover .group-hover\:opacity-100 {
    opacity: 1;
  }

  .transition-all {
    transition: all 0.3s ease-in-out;
  }

  .transition-opacity {
    transition: opacity 0.3s ease-in-out;
  }
</style>
