<script setup>
  import CardCustom from '~/components/ui/shared/CardCustom.vue'

  const Editor = defineAsyncComponent(() => import('~/components/base/Editor.vue'))

  definePageMeta({
    layout: 'admin'
  })
  const showModal = ref(false)

  const productStore = useProductStore()
  const {
    productInput,
    showUploadedImageModal,
    uploadProductImages,
    edit,
    productData,
    productId,
    showUploadImage
  } = storeToRefs(productStore)

  function toggleProductModal() {
    showModal.value = !showModal.value
  }

  const categoryStore = useCategoryStore()
  const { data, getCategories } = await categoryStore.fetchCategories()

  await productStore.fetchProducts()

  async function deleteProduct(product) {
    promptUser('Do you want to delete this product?')
      .then(async () => {
        await productStore.deleteProduct(product?.id)
        productStore.fetchProducts()
      })
      .catch((error) => console.error(error))
  }

  function editProduct(product) {
    productInput.value = product
    edit.value = true
    toggleProductModal()
  }

  function uploadImage(product) {
    productId.value = product?.id
    showUploadImage.value = true
  }

  function showUploadedImages(product) {
    uploadProductImages.value = product?.images
    showUploadedImageModal.value = true
  }
</script>

<template>
  <div class="h-screen">
    <!--    <div class="mb-4 flex justify-end pt-4">
          <ClientOnly>
            &lt;!&ndash;        <UploadImage @getProducts="productStore.fetchProducts" />
                    <UploadedImageModal />
                    <ProductModal
                      :categories="data?.categories"
                      :show="showModal"
                      @getProducts="productStore.fetchProducts"
                      @toggleProductModal="toggleProductModal"
                    ></ProductModal>&ndash;&gt;

          </ClientOnly>
        </div>-->
    <div v-if="!showModal">
      <ProductTable
        :productData="productData"
        @deleteProduct="deleteProduct"
        @editProduct="editProduct"
        @showUploadedImages="showUploadedImages"
        @uploadImage="uploadImage"
      >
        <template #btn>
          <BaseBtn label="create" @click="toggleProductModal"></BaseBtn>
        </template>
      </ProductTable>
    </div>
    <div v-else>
      <h2>Create a new product</h2>
      <div>Dashboard > Products > Create</div>
      <div>
        <CardCustom title="Basic details">
          <div class="space-y-6">
            <div>
              <BaseInput :placeholder="'Product Name'" />
            </div>
            <div>
              <span>Description</span>
              <ClientOnly>
                <Editor />
              </ClientOnly>
            </div>
          </div>
        </CardCustom>
        <CardCustom title="Product Images">
          <UploadFiles />
        </CardCustom>
      </div>
      <BaseBtn label="Cancel" @click="toggleProductModal" />
    </div>
  </div>
</template>
