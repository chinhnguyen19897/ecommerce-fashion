<template>
  <div>
    <NuxtImg
      class="rounded-lg object-top object-cover w-full md:max-w-[656px] aspect-9/8"
      placeholder-class="blur-xl"
      :src="mainImgUrl"
      :width="imgWidth"
      :height="imgHeight"
      title="product-image"
      alt="product-image"
      fetchpriority="high"
      placeholder
    />
    <div class="my-4 gallery-images">
      <NuxtImg
        v-for="image in images"
        :key="image?.id"
        class="cursor-pointer rounded-xl"
        :width="imgWidth"
        :height="imgHeight"
        :src="image?.url || FALL_BACK_IMG_URL"
        :title="image?.title"
        :alt="image?.title"
        @click="handleSelectImage(image?.url)"
        fetchpriority="high"
        placeholder
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const FALL_BACK_IMG_URL = config?.public?.FALL_BACK_IMG_URL;

const props = defineProps(["images"]);

const imgWidth = 656;

const mainImgUrl = ref(
  props?.images?.length > 0 ? props?.images[0]?.url : FALL_BACK_IMG_URL,
);

function selectImage(imageUrl) {
  mainImgUrl.value = imageUrl;
}
</script>

<style scoped>
.gallery-images {
  display: flex;
  overflow: auto;
  gap: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
}

.gallery-images img {
  width: 72px;
  aspect-ratio: 5/6;
  object-fit: cover;
}

@media (min-width: 768px) {
  .gallery-images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));

    img {
      width: 100%;
    }
  }
}
</style>
