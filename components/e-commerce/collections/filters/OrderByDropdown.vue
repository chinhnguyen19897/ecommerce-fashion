<script lang="ts" setup>
  const orderBy = ref('')
  const order = ref('')
</script>

<template>
  <div class="rounded-m isolate ml-auto inline-flex -space-x-px shadow-sm">
    <button
      aria-label="Sort"
      class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
      @click="order = order === 'ASC' ? 'DESC' : 'ASC'"
    >
      <Icon
        :class="order === 'ASC' ? 'rotate-180' : ''"
        class="transform-origin-center transform transition-transform"
        name="ion:filter-outline"
        size="18"
      />
    </button>
    <select
      id="orderby-dropdown"
      v-model="orderby"
      aria-label="Order by"
      class="rounded-l-none bg-white"
    >
      <option value="date">Latest</option>
      <option value="alphabetically">A</option>
      <option value="price">Price</option>
      <option value="rating">Rating</option>
      <option value="discount">Discount</option>
    </select>
  </div>
</template>
