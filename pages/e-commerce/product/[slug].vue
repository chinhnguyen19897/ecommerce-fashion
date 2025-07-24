<template>
  <div class="mb-11">
    <div class="flex flex-col gap-12 md:flex-row">
      <ProductImageGallery
        class="xl:max-w-[656px] w-full"
        :images="singleProductData?.products?.images"
      />
      <div class="lg:max-w-md xl:max-w-[670px] md:py-2 w-full">
        <div class="flex justify-between">
          <span class="text-gray-400 text-2xl">
            {{ singleProductData?.products?.category?.name }}
          </span>
          <span> </span>
        </div>
        <div class="mt-3">
          <h1
            class="text-7xl font-medium mb-4 text-[#3E3E3E] font-playfair uppercase py-4"
          >
            {{ singleProductData?.products?.name }}
          </h1>
        </div>
        <div class="flex gap-10">
          <ProductPrice
            :isSingleProductPage="true"
            :regular-price="
              formatCurrency(Number(singleProductData?.products?.price))
            "
            :sale-price="
              formatCurrency(Number(singleProductData?.products?.price))
            "
            class="text-sm"
          />
        </div>
        <div class="my-8">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non
            fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa,
            scelerisque vitae, consequat in, pretium a, enim. Pellentesque
            congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum
            bibendum augue. Praesent egestas leo in pede. Praesent blandit odio
            eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque
            fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
          </p>
        </div>
        <div class="my-8 flex gap-3 items-center">
          <div
            v-for="size in sizes"
            :key="size"
            value="size"
            class="w-full cursor-pointer max-w-[64px] bg-[#C7B8B0] p-3 text-xl text-white text-center focus:bg-[#8B4513] cur"
          >
            {{ size }}
          </div>
        </div>
        <div class="my-8">
          <p class="text-xl text-[#B4B4B4]">Quantity</p>
          <div class="flex gap-6">
            <input
              v-model="defaultQuantity"
              type="number"
              min="1"
              aria-label="Quantity"
            />
            <AddToCartButton
              class="flex-1 w-full md:max-w-xs"
              @click="shoppingCartStore.addToCart(singleProductData?.products)"
              :disabled="false"
              :class="{ loading: true }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const slug = useRoute().params.slug;
const quantity = ref(1);
const sizes = ref(["XXS", "S", "M", "L", "XL", "XXL"]);
const productEcomStore = useProductEcommerceStore();
const { singleProductData } = storeToRefs(productEcomStore);
const productReviewStore = useProductReviewStore();
const { productReviews } = storeToRefs(productReviewStore);
const shoppingCartStore = useCartStore();
const { cartData, showCart, defaultQuantity } = storeToRefs(shoppingCartStore);

productEcomStore.fetchSingleProductData(slug).then(async () => {
  console.log(singleProductData.value);
  const categoryId = singleProductData?.value?.products?.categoryId;
  const productId = singleProductData?.value?.products?.id;

  await productReviewStore.fetchProductReviews(productId);
});
</script>

<style scoped></style>
