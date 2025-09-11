<script setup>
  import Slider from '@vueform/slider'

  const emit = defineEmits(['fetchProducts'])
  const minPrice = 0
  const maxPrice = 10000000
  const currencySymbol = 'đ'

  const activeFilter = ref(null)
  const price = ref([minPrice, maxPrice])
  const isOpened = ref(true)
  const applyPrice = async () => {
    await emit('fetchProducts', price.value)
  }
</script>

<template>
  <div>
    <div
      :class="[
        'flex cursor-pointer items-center justify-between px-3 py-4 font-semibold leading-none transition duration-300 ease-in-out hover:bg-[#E8E1D3]',
        isOpened ? 'bg-[#E8E1D3]' : ''
      ]"
      @click="isOpened = !isOpened"
    >
      <span>Price</span>
      <Icon
        :class="isOpened ? 'rotate-0' : '-rotate-90'"
        class="transform transition-transform duration-300 ease-in-out"
        name="ion:chevron-down-outline"
      />
    </div>
    <div v-show="isOpened" class="mb-3 mt-3 grid grid-cols-2 gap-4">
      <div class="relative flex items-center">
        <input
          id="price-from"
          v-model="price[0]"
          class="w-auto max-w-full rounded-lg border border-gray-200 bg-white p-2 pl-6 leading-none md:text-sm"
          min="0"
          placeholder="From"
          type="number"
        />
        <label
          class="text-gray-400 absolute px-2 leading-none"
          for="price-from"
          v-html="currencySymbol"
        ></label>
      </div>
      <div class="relative flex items-center">
        <input
          id="price-to"
          v-model="price[1]"
          class="w-auto max-w-full rounded-lg border border-gray-200 bg-white p-2 pl-6 leading-none md:text-sm"
          min="1"
          placeholder="Up to"
          type="number"
        />
        <label
          class="text-gray-400 absolute px-2 leading-none"
          for="price-to"
          v-html="currencySymbol"
        ></label>
      </div>
      <div class="col-span-full mx-1 mt-1">
        <Slider
          v-model="price"
          :max="maxPrice"
          :min="0"
          :tooltips="false"
          aria-labelledby="price-from price-to"
          @update="applyPrice"
        />
      </div>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>
