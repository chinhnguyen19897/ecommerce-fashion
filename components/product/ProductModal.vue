<script setup>

const props = defineProps(["show", "categories"]);
const emit = defineEmits(["toggleProductModal", "getProducts"]);

const productStore = useProductStore();
const { productInput, edit, productColors } = storeToRefs(productStore);
const headers = useHeaders();
const loading = ref(false);

async function submitInput() {
  try {
    loading.value = true;
    const { price, ...othersInput } = productInput.value;
    const productEndpoint = edit.value
      ? "/api/admin/product/update-product"
      : "/api/admin/product/create-product";
    const res = await $fetch(productEndpoint,
      {
        headers: {
          ...headers,
        },
        method: "POST",
        body: JSON.stringify({
          price: parseFloat(price),
          ...othersInput,
        }),
      });
    productInput.value = {};

    loading.value = false;
    edit.value = false;
    emit("getProducts");
    emit("toggleProductModal");
    successMsg(res?.message);
  } catch (error) {
    loading.value = false;
    console.error(error);
    showLoginOrSignUpError(error);
  }
}
</script>
<template>
  <BaseModal v-show="show">
    <template #title>
      <h1 class="text-2xl">Create product</h1>
    </template>

    <template #body>
      <BaseInput
        v-model="productInput.name"
        :placeholder="'Product Name'"
        :type="'text'"
        class="mb-2"
      />

      <BaseInput
        v-model="productInput.price"
        :placeholder="'Product Price'"
        :type="'text'"
        class="mb-2"
        min="1"
      />

      <select
        v-model="productInput.color"
        class="focus:bg-focus-900 mb-2 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:border-gray-700 focus:focus:border-brand-800"
      >
        <option value="">colors</option>
        <option v-for="color in productColors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>

      <select
        v-model="productInput.categoryId"
        class="focus:bg-focus-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:border-gray-700 focus:focus:border-brand-800"
      >
        <option value="">Categories</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </template>

    <template #footer>
      <BaseBtn
        class="bg-slate-400"
        label="Close"
        @click="emit('toggleProductModal')"
      ></BaseBtn>

      <BaseBtn
        :label="edit ? 'Update' : 'Create'"
        :loading="loading"
        @click="submitInput"
      ></BaseBtn>
    </template>
  </BaseModal>
</template>

