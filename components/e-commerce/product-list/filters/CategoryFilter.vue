<template>
  <div v-if="categories?.length">
    <div class="cursor-pointer" @click="isOpened = !isOpened">
      <span>Categories</span>
      <Icon
        name="ion:chevron-down-outline"
        class="transform"
        :class="isOpened ? 'rotate-180' : ''"
      />
    </div>
    <div
      v-show="isOpened"
      class="mt-3 mr-1 max-h-[240px] grid gap-1.5 overflow-auto custom-srcollbar"
    >
      <div v-for="category in categories" :key="category">
        <input
          :id="category"
          type="checkbox"
          :value="category?.id"
          @change="checkboxChanged(category?.id)"
        />
        <label :for="category" class="cursor-pointer">
          <span v-html="category.name" />
          <small v-if="showCount" class="ml-1 text-gray-400 tabular-nums">{{
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
  label: { type: String, default: "" },
  showCount: { type: Boolean, default: false },
});

const emit = defineEmits(["fetchProducts"]);

const isOpened = ref(true);
const selectedCategories = ref([]);
const checkboxChanged = (categoryId) => {
  const idExist = selectedCategories.value.some((id) => id === categoryId);

  if (idExist) {
    const filterArr = selectedCategories.value.filter(
      (id) => id !== categoryId,
    );
    selectedCategories.value = filterArr;
    emit("fetchProducts", selectedCategories);
  } else {
    selectedCategories.value.push(categoryId);
    emit("fetchProducts", selectedCategories);
  }
};
</script>
