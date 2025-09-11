<script lang="ts" setup>
  import { useCartStore } from '~/stores/e-commerce/cart-store'
  import { useNuxtApp } from '#app'
  import CartIcon from '@/components/icons/CartIcon.vue'
  import CartDrawer from '~/components/e-commerce/cart/CartDrawer.vue'
  import { storeToRefs } from 'pinia'
  import WishlistIcon from '~/components/icons/WishlistIcon.vue'
  import ViewIcon from '~/components/icons/ViewIcon.vue'
  import a from 'ansis'

  const props = defineProps<{
    title?: string
    description?: string
    products?: any[]
  }>()
  const router = useRouter()
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
  const buttonAddToCart = ref<HTMLButtonElement[] | null>(null)
  const loading = ref<boolean>(false)
  const showCartBtn = ref<boolean>(false)
  const cartStore = useCartStore()
  const { cartData } = storeToRefs(cartStore)

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

  const addToCart = async (productId: number) => {
    loading.value = true
    try {
      await $fetch('/api/e-commerce/cart', {
        method: 'POST',
        body: {
          productId: productId,
          quantity: 1
        }
      })
      await shoppingCartStore.fetchCartData()
      showCartBtn.value = true
    } catch (error) {
      showCartBtn.value = false
      console.error('Error adding product to cart:', error)
    } finally {
      loading.value = false
    }
  }
  const navigateCart = () => {
    router.push('/cart')
  }
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
            <div class="pointer-events-none absolute left-0 top-0 flex flex-col items-center">
              <div
                class="pointer-events-auto -translate-x-3 transform p-2 opacity-0 transition-all delay-100 duration-300 ease-out group-hover:translate-x-3 group-hover:opacity-100"
              >
                <WishlistIcon :color="'#000'" :size="30" />
              </div>
              <div
                class="pointer-events-auto -translate-x-3 transform p-2 opacity-0 transition-all delay-200 duration-300 ease-out group-hover:translate-x-3 group-hover:opacity-100"
              >
                <ViewIcon :color="'#000'" :size="30" />
              </div>
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <BaseBtn
                :icon-btn="CartIcon"
                :icon-props="{ color: '#FFFFFF', size: 24 }"
                :label="!showCartBtn ? 'Add To Cart' : 'View Cart'"
                :loading="loading"
                btn-class="flex items-center justify-center gap-8 bg-[#8B4513] rounded-none tracking-[2px] w-full !p-4 text-white text-center text-lg font-lato uppercase font-normal"
                class="w-full max-w-[90%] translate-y-56 transform opacity-0 transition-all duration-300 group-hover:translate-y-48 group-hover:opacity-100"
                @click="!showCartBtn ? addToCart(product.id) : navigateCart()"
              />
            </div>
          </div>
        </div>
        <div>
          <BaseBtn
            btn-class="!p-3 bg-[#8B4513] max-w-[150px] w-full uppercase text-[#fff] font-regular text-base rounded-none flex items-center justify-center !gap-5"
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
