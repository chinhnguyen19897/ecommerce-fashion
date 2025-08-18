<script setup>
  import { useProductStore } from '~/stores/admin/product-store.ts'

  const props = defineProps(['productData'])

  const emit = defineEmits(['editProduct', 'deleteProduct', 'uploadImage', 'showUploadedImages'])
  const productStore = useProductStore()
  const { search } = storeToRefs(productStore)

  const searchProduct = _debounce(async function (event) {
    search.value = event[0].target.value
    await productStore.fetchProducts()
  }, 1000)
</script>
<template>
  <div class="mb-1 flex justify-between">
    <input
      v-model="search"
      class="mb-2 rounded-md border px-2 py-2 shadow-md"
      placeholder="Search..."
      type="text"
      @keydown="searchProduct"
    />
    <slot name="btn"></slot>
  </div>
  <table class="w-full rounded-md bg-white shadow-sm">
    <thead>
      <tr class="bg-[#F8F9FA] text-left">
        <td class="px-4 py-3"></td>

        <td class="px-4 py-3">Name</td>
        <td class="px-4 py-3">Stock</td>
        <td class="py-3">Price</td>
        <td class="py-3">SKU</td>
        <td class="py-3">Status</td>
        <td class="py-3">Action</td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(product, index) in productData?.products" :key="product.id" class="text-left">
        <td class="border border-gray-300 px-4 py-2">
          {{ index + 1 }}
        </td>

        <td class="border border-gray-300 px-4 py-2">{{ product?.name }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ product?.category?.name }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ product?.color }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ product?.price }} $</td>

        <td class="flex border border-gray-300 px-4 py-2">
          <button
            :disabled="loading"
            class="text-gray-900 flex items-center justify-center gap-2 rounded px-4 py-2 font-bold hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            @click="emit('editProduct', product)"
          >
            <EditIcon />
          </button>
          <button
            :disabled="loading"
            class="text-gray-900 flex items-center justify-center gap-2 rounded px-4 py-2 font-bold hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            @click="emit('deleteProduct', product)"
          >
            <TrashIcon />
          </button>

          <button
            :disabled="loading"
            class="text-gray-900 flex items-center justify-center gap-2 rounded px-4 py-2 font-bold hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            @click="emit('uploadImage', product)"
          >
            <ImageIcon />
          </button>

          <button
            :disabled="loading"
            class="text-gray-900 flex items-center justify-center gap-2 rounded px-4 py-2 font-bold hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            @click="emit('showUploadedImages', product)"
          >
            <EyeIcon />
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="mt-4 flex items-center justify-between">
    <div>
      <button
        :disabled="productData?.metadata?.page === 1"
        class="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        @click="productStore.changePage(productData?.metadata?.page - 1)"
      >
        Prev
      </button>

      <span>Page {{ productData?.metadata?.page }} of {{ productData?.metadata?.totalPages }}</span>

      <button
        :disabled="productData?.metadata?.page === productData?.metadata?.totalPages"
        class="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        @click="productStore.changePage(productData?.metadata?.page + 1)"
      >
        Next
      </button>
    </div>
    <div></div>
  </div>
</template>
