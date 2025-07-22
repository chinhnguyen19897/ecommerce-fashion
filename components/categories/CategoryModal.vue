<script lang="ts" setup>
import BaseModal from "~/components/base/BaseModal.vue";

const props = defineProps(["show"])
const emit = defineEmits(['toggleCategoryModal', 'getCategories'])
const headers = useHeaders()
const categoryStore = useCategoryStore()
const {categoryInput, edit} = storeToRefs(categoryStore)
const loading = ref(false)

async function submitInput() {
  try {
    loading.value = true;
    const categoryEndpoint = edit?.value ?
        "/api/admin/category/update-category" :
        "/api/admin/category/create-category"
    const res = await $fetch<{ message: string }>(categoryEndpoint, {
      method: "POST",
      body: JSON.stringify(categoryInput.value),
      headers: {
        ...headers
      }
    });
    loading.value = false;
    emit("getCategories")
    emit("toggleCategoryModal");
    successMsg(res?.message)
  } catch (err) {
    loading.value = false;
    showLoginOrSignUpError(err)
  }
}
</script>

<template>
  <BaseModal v-show="show">
    <template #title>
      <h1 class="text-2xl">Create category</h1>
    </template>

    <template #body>
      <BaseInput
          v-model="categoryInput.name"
          :placeholder="''"
          :type="'text'"
      />
    </template>

    <template #footer>

      <BaseBtn class="bg-slate-400"
               label="Close"
               @click="emit('toggleCategoryModal')"></BaseBtn>

      <BaseBtn :label="edit?'Update':'Create'" :loading="loading"
               @click="submitInput"></BaseBtn>
    </template>
  </BaseModal>
</template>

<style scoped>

</style>