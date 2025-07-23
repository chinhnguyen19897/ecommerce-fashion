<script setup>
const productStore = useProductStore();
const { showUploadedImageModal, uploadProductImages } =
  storeToRefs(productStore);
</script>
<template>
  <BaseModal :show="showUploadedImageModal">
    <template #title>
      <div class="text-2xl font-semibold">Uploaded Images</div>
    </template>

    <template #body>
      <div class="flex flex-wrap gap-4">
        <img
          v-for="image in uploadProductImages"
          :key="image.url"
          :src="`/${image.url}`"
          alt="image"
          style="height: 100px"
        />
      </div>
    </template>

    <template #footer>
      <BaseBtn
        class="bg-slate-400"
        label="Close"
        @click="showUploadedImageModal = false"
      ></BaseBtn>
    </template>
  </BaseModal>
</template>

