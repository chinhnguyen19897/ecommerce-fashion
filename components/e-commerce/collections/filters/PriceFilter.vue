<script setup>
import Slider from "@vueform/slider";

const emit = defineEmits(["fetchProducts"]);
const minPrice = 0;
const maxPrice = 10000000;
const currencySymbol = "đ";

const activeFilter = ref(null);
const price = ref([minPrice, maxPrice]);
const isOpened = ref(true);
const applyPrice = async () => {
  await emit("fetchProducts", price.value);
};
</script>

<template>
  <div>
    <div
      :class="[
        'cursor-pointer flex font-semibold py-4 px-3 hover:bg-[#E8E1D3] transition duration-300 ease-in-out leading-none justify-between items-center',
        isOpened ? 'bg-[#E8E1D3]' : '',
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
    <div v-show="isOpened" class="mt-3 mb-3 grid gap-4 grid-cols-2">
      <div class="flex relative items-center">
        <input
          id="price-from"
          v-model="price[0]"
          class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
          min="0"
          placeholder="From"
          type="number"
        />
        <label
          class="leading-none px-2 text-gray-400 absolute"
          for="price-from"
          v-html="currencySymbol"
        />
      </div>
      <div class="flex relative items-center">
        <input
          id="price-to"
          v-model="price[1]"
          class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
          min="1"
          placeholder="Up to"
          type="number"
        />
        <label
          class="leading-none px-2 text-gray-400 absolute"
          for="price-to"
          v-html="currencySymbol"
        />
      </div>
      <div class="mx-1 mt-1 col-span-full">
        <Slider
          v-model="price"
          :max="maxPrice"
          :min="0"
          :tooltips="false"
          ariaLabelledby="price-from price-to"
          @update="applyPrice"
        />
      </div>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

