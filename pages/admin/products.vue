<script setup>
  import CardCustom from '~/components/ui/shared/CardCustom.vue'
  import TabsCustom from '~/components/ui/shared/TabsCustom/TabsCustom.vue'
  import ProductPricing from '~/components/product/ProductPricing.vue'
  import { useCategoryStore } from '~/stores/admin/category-store.js'
  import ProductInventory from '~/components/product/ProductInventory.vue'
  import ProductShipping from '~/components/product/ProductShipping.vue'
  import { useForm } from 'vee-validate'
  import FormCustomInput from '~/components/form/FormCustomInput.vue'

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

  const tabsTrigger = [
    {
      id: 1,
      name: 'Pricing',
      value: 'pricing'
    },
    {
      id: 2,
      name: 'Inventory',
      value: 'inventory'
    },
    {
      id: 3,
      name: 'Shipping',
      value: 'shipping'
    }
  ]

  const tabContent = [
    {
      id: 1,
      name: 'Pricing',
      value: 'pricing',
      component: ProductPricing
    },
    {
      id: 2,
      name: 'Inventory',
      value: 'inventory',
      component: ProductInventory
    },
    {
      id: 3,
      name: 'Shipping',
      value: 'shipping',
      component: ProductShipping
    }
  ]

  const options = reactive(['color', 'size', 'material'])
  const selectColor = ref('')
  const selectSize = ref('')
  const selectMaterial = ref('')
  const { handleSubmit, defineField } = useForm({})

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

  const addVariant = () => {
    if (selectColor.value === '') {
      selectColor.value = 'color'
    } else if (selectSize.value === '') {
      selectSize.value = 'size'
    } else if (selectMaterial.value === '') {
      selectMaterial.value = 'material'
    }
  }

  const deleteOption = (option) => {
    if (option === 'color') {
      selectColor.value = ''
    }
    if (option === 'size') {
      selectSize.value = ''
    }
    if (option === 'material') {
      selectMaterial.value = ''
    }
  }

  const onSubmit = handleSubmit((values) => {
    console.log(values)
    console.log(JSON.stringify(values, null, 2))
  })
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
          <BaseBtn label="create" @click="toggleProductModal" />
        </template>
      </ProductTable>
    </div>
    <div v-else>
      <h2>Create a new product</h2>
      <div>Dashboard > Products > Create</div>
      <ClientOnly>
        <form @submit.prevent="onSubmit">
          <div class="grid grid-cols-12 gap-8">
            <div class="col-span-8">
              <CardCustom title="Product Details">
                <div class="space-y-6">
                  <div>
                    <FormCustomInput :name="'productName'" :placeholder="'Product Name'" />
                  </div>
                  <div>
                    <span>Description</span>
                    <Editor />
                  </div>
                </div>
              </CardCustom>
              <CardCustom title="Product Images">
                <UploadFiles />
              </CardCustom>
              <CardCustom title="Product categories">
                <TabsCustom
                  :default-value="'pricing'"
                  :tabsContent="tabContent"
                  :tabsList="tabsTrigger"
                  :type-tab="'vertical'"
                />
              </CardCustom>
            </div>
            <div class="col-span-4">
              <CardCustom title="Product Variants">
                <div v-if="selectColor === 'color'">
                  <div>
                    <label> Option name: </label>
                    <FormCustomInput :name="'color'" :placeholder="'Color'" />
                  </div>
                  <div>
                    <label>Option values</label>
                    <FormCustomInput :name="'colorValue'" :placeholder="'Red'" />
                  </div>
                  <div class="mt-3 flex justify-between">
                    <BaseBtn label="Delete" @click="deleteOption('color')" />
                    <BaseBtn label="Done" />
                  </div>
                </div>
                <div v-if="selectColor && selectSize === 'size'">
                  <div>
                    <label>Option name:</label>
                    <FormCustomInput :name="'size'" :placeholder="'Size'" />
                  </div>
                  <div>
                    <label>Option values</label>
                    <FormCustomInput :name="'sizeValue'" :placeholder="'Medium'" />
                  </div>
                  <div class="mt-3 flex justify-center">
                    <BaseBtn label="Delete" @click="deleteOption('size')" />
                    <BaseBtn label="Done" />
                  </div>
                </div>
                <div v-if="selectColor && selectSize && selectMaterial === 'material'">
                  <div>
                    <label>Option nameL:</label>
                    <FormCustomInput :name="'material'" :placeholder="'Material'" />
                  </div>
                  <div>
                    <label>Option values</label>
                    <FormCustomInput :name="'materialValue'" :placeholder="'Rubber'" />
                  </div>
                  <div class="mt-3 flex justify-center">
                    <BaseBtn label="Delete" @click="deleteOption('material')" />
                    <BaseBtn label="Done" />
                  </div>
                </div>
                <Button
                  v-show="!selectColor || !selectSize || !selectMaterial"
                  @click="addVariant(options)"
                  >Add
                </Button>
              </CardCustom>
            </div>
          </div>
          <BaseBtn label="Cancel" @click="toggleProductModal" />
          <BaseBtn label="Save" type="submit" />
        </form>
      </ClientOnly>
    </div>
  </div>
</template>
