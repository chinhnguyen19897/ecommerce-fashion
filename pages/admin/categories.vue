<script setup>
definePageMeta({
  layout: "admin",
});
</script>

<template>
  <div class="h-screen">
    <div class="flex justify-end mb-4 pt-4">
      <BaseBtn label="create" @click="toggleCategoryModal" />
      <ClientOnly>
        <CategoryModal
          :show="showModal"
          @toggleCategoryModal="toggleCategoryModal"
          @getCategories="getCategories"
        ></CategoryModal>
      </ClientOnly>
    </div>

    <CategoryTable @editCategory="editCategory" :categories="data?.categories">
    </CategoryTable>
  </div>
</template>
