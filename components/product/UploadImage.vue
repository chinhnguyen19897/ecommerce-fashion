<script setup>
const props = defineProps(["show"]);
const emit = defineEmits(["getProducts"]);
const loading = ref(false);
const image = ref(null);

const productStore = useProductStore();
const { productId, showUploadImage } = storeToRefs(productStore);

function selectImage(event) {
  const selectedImage = event.target.files[0];
  const output = document.querySelector("#outputImage");
  output.src = URL.createObjectURL(selectedImage);
  output.onload = function () {
    URL.revokeObjectURL(selectedImage);
  };
  image.value = selectedImage;
}

async function uploadImage() {
  try {
    if (image.value !== null) {
      loading.value = true;
      const requestOptions = await productStore.uploadImagePayload(
        productId.value,
        image.value,
      );
      const res = await $fetch(
        "/api/admin/product/upload-image",
        requestOptions,
      );
      successMsg(res?.message);
      document.querySelector("#outputImage").src = "";
      document.querySelector("#imageInput").value = "";
      emit("getProducts");
      showUploadImage.value = false;
      loading.value = false;
    } else {
      showError("Select the Image");
    }
  } catch (error) {
    showError(error?.message);
    loading.value = false;
  }
}
</script>
<template>
  <BaseModal :show="showUploadImage">
    <template #title>
      <div class="text-2xl font-semibold">Upload Image</div>
    </template>

    <template #body>
      <img id="outputImage" alt="image" style="height: 150px" />
      <label for="">Select image</label>

      <input id="imageInput" type="file" @change="selectImage" />
    </template>

    <template #footer>
      <BaseBtn
        class="bg-slate-400"
        label="Close"
        @click="showUploadImage = false"
      ></BaseBtn>

      <BaseBtn
        :label="'Upload Image'"
        :loading="loading"
        @click="uploadImage"
      ></BaseBtn>
    </template>
  </BaseModal>
</template>

