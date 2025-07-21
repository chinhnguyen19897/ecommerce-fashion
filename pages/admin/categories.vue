<script setup>
import CategoryModal from "~/components/categories/CategoryModal.vue";

definePageMeta({
  layout: "admin",
});
const showModal = ref(false);

function toggleCategoryModal() {
  showModal.value = !showModal.value;
}

const categoryStore = useCategoryStore()
const { edit } = storeToRefs(categoryStore)


const {data,getCategories}= await categoryStore.fetchCategories()

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
