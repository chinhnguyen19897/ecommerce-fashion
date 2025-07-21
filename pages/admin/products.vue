<script setup>
definePageMeta({
  layout: "admin",
});
const showModal = ref(false)

const productStore = useProductStore();
const { productInput, showUploadedImageModal, uploadProductImage, edit, productData, productId, showUploadImage} = storeToRefs(productStore)

function toggleProductModal() {
  showModal.value = !showModal.value
}

const categoryStore = useCategoryStore();
const {data, getCategories} = storeToRefs(categoryStore)

await productStore.fetchProducts();



</script>

<template>
  <div class="h-screen">
    <div class="flex justify-end mb-4 pt-4">
      <ClientOnly>
<!--        <UploadImage @getProducts="productStore.fetchProducts" />
        <UploadedImageModal />-->
        <ProductModal
          :categories="data?.categories"
          @getProducts="productStore.fetchProducts"
          :show="showModal"
          @toggleProductModal="toggleProductModal"
        ></ProductModal>
      </ClientOnly>
    </div>

    <ProductTable
      :productData="productData"

    >
      <template #btn>
        <BaseBtn label="create" @click="toggleProductModal"></BaseBtn>
      </template>
    </ProductTable>
  </div>
</template>
