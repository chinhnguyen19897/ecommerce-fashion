<script setup>
  import CategoryModal from '~/components/categories/CategoryModal.vue'

  definePageMeta({
    layout: 'admin'
  })
  const showModal = ref(false)

  function toggleCategoryModal() {
    showModal.value = !showModal.value
  }

  const categoryStore = useCategoryStore()
  const { edit } = storeToRefs(categoryStore)

  const { data, getCategories } = await categoryStore.fetchCategories()
</script>

<template>
  <div class="h-screen">
    <div class="mb-4 flex justify-end pt-4">
      <BaseBtn label="create" @click="toggleCategoryModal" />
      <ClientOnly>
        <CategoryModal
          :show="showModal"
          @toggle-category-modal="toggleCategoryModal"
          @get-categories="getCategories"
        />
      </ClientOnly>
    </div>

    <CategoryTable :categories="data?.categories" @edit-category="editCategory" />
  </div>
</template>
