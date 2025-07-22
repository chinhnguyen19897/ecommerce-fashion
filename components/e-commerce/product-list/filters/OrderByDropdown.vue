<script lang="ts" setup>
const orderBy = ref('')
const order = ref('')
</script>

<template>
  <div class="inline-flex ml-auto -space-x-px shadow-sm rounded-m isolate">
    <button
        aria-label="Sort"
        class="relative inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20"
        @click="order = order === 'ASC' ? 'DESC' : 'ASC'">
      <Icon :class="order === 'ASC' ? 'rotate-180' : ''" class="transition-transform transform transform-origin-center" name="ion:filter-outline"
            size="18"/>
    </button>
    <select id="orderby-dropdown" v-model="orderby" aria-label="Order by" class="bg-white rounded-l-none">
      <option value="date">Latest</option>
      <option value="alphabetically">A</option>
      <option value="price">Price</option>
      <option value="rating">Rating</option>
      <option value="discount">Discount</option>
    </select>
  </div>
</template>

