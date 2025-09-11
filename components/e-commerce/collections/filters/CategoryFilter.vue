<template>
  <div v-if="categories?.length">
    <div
      :class="[
        'flex cursor-pointer items-center justify-between px-3 py-4 font-semibold leading-none hover:bg-[#E8E1D3]',
        isOpened ? 'bg-[#E8E1D3]' : ''
      ]"
      @click="isOpened = !isOpened"
    >
      <span>Categories</span>
      <Icon
        name="ion:chevron-down-outline"
        class="transform"
        :class="isOpened ? 'rotate-180' : ''"
      />
    </div>
    <div
      v-show="isOpened"
      class="custom-srcollbar my-3 mr-1 grid max-h-[323px] gap-1.5 overflow-auto"
    >
      <div v-for="category in categories" :key="category" class="flex items-center gap-2">
        <input
          :id="category"
          type="checkbox"
          :value="category?.id"
          @change="checkboxChanged(category?.id)"
        />
        <label :for="category" class="cursor-pointer">
          <span v-html="category.name"></span>
          <small v-if="showCount" class="text-gray-400 ml-1 tabular-nums">{{
            categories?.length || 0
          }}</small>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    categories: { type: Array, required: true },
    label: { type: String, default: '' },
    showCount: { type: Boolean, default: false }
  })

  const emit = defineEmits(['fetchProducts'])

  const isOpened = ref(true)
  const selectedCategories = ref([])
  const checkboxChanged = (categoryId) => {
    const idExist = selectedCategories.value.some((id) => id === categoryId)

    if (idExist) {
      const filterArr = selectedCategories.value.filter((id) => id !== categoryId)
      selectedCategories.value = filterArr
      emit('fetchProducts', selectedCategories.value)
    } else {
      selectedCategories.value.push(categoryId)
      emit('fetchProducts', selectedCategories.value)
    }
  }
</script>
