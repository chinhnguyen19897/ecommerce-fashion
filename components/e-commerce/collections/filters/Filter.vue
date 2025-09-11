<script setup lang="ts">
  const attributesWithTerms = ref([{ slug: 'pa_colour', name: 'red' }])

  const categoryStore = useCategoryStore()
  const { data } = await categoryStore.fetchCategories()
  const productStore = useProductStore()
  const { productColors } = storeToRefs(productStore)

  const productEcomStore = useProductEcommerceStore()
  const { selectedCategories, selectedPrices, selectedColors, selectedStar } =
    storeToRefs(productEcomStore)

  async function fetchProductByCategories(categories: number[]) {
    selectedCategories.value = categories
    await productEcomStore.fetchProducts(
      selectedCategories.value,
      selectedPrices.value,
      selectedColors.value
    )
  }
  async function fetchProductByColors(colors: string[]) {
    selectedColors.value = colors
    await productEcomStore.fetchProducts(
      selectedCategories.value,
      selectedPrices.value,
      selectedColors.value,
      selectedStar.value
    )
  }

  async function fetchProductByPrice(prices: number[]) {
    selectedPrices.value = prices
    await productEcomStore.fetchProducts(
      selectedCategories.value,
      selectedPrices.value,
      selectedColors.value,
      selectedStar.value
    )
  }

  async function fetchProductByStars(starRating: number) {
    selectedStar.value = starRating
    await productEcomStore.fetchProducts(
      selectedCategories.value,
      selectedPrices.value,
      selectedColors.value,
      selectedStar.value
    )
  }
</script>

<template>
  <aside id="filters">
    <OrderByDropdown class="block w-full md:hidden" />
    <div class="relative z-30 mb-12 grid divide-y">
      <PriceFilter @fetch-products="fetchProductByPrice" />
      <CategoryFilter :categories="data?.categories" @fetch-products="fetchProductByCategories" />

      <div v-for="attribute in attributesWithTerms" :key="attribute.slug">
        <ColorFilter :colors="productColors" @fetch-products="fetchProductByColors" />
      </div>

      <LazyStarRatingFilter @fetch-products="fetchProductByStars" />
      <LazyResetFiltersButton />
    </div>
  </aside>
  <!-- @click="removeBodyClass('show-filters')" -->
  <div class="filter-overlay fixed inset-0 z-50 hidden bg-black opacity-25"></div>
</template>

<style lang="postcss">
  .show-filters .filter-overlay {
    @apply block;
  }
  .show-filters {
    overflow: hidden;
  }

  #filters {
    @apply w-[323px];

    & .slider-connect {
      @apply bg-primary;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .price-input {
    @apply w-full rounded-xl border p-2 leading-tight outline-none transition-all;

    &.active {
      @apply border-gray-400 pl-6;
    }
  }

  @media (max-width: 768px) {
    #filters {
      @apply fixed bottom-0 left-4 h-full -translate-x-[110vw] transform overflow-auto bg-white p-8 pl-2 transition-all duration-300 ease-in-out;

      box-shadow:
        -100px 0 0 white,
        -200px 0 0 white,
        -300px 0 0 white;
      z-index: 60;
    }

    .show-filters #filters {
      @apply transform-none;
    }
  }
</style>
