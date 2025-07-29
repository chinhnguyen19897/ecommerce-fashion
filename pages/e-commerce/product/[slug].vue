<template>
  <div class="mb-11">
    <div class="flex flex-col gap-12 md:flex-row">
      <ProductImageGallery
        :images="singleProductData?.products?.images"
        class="xl:max-w-[656px] w-full"
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
            :class="[
              'w-full cursor-pointer max-w-[64px] p-3 text-xl text-white text-center',
              sizeSelected === size ? 'bg-[#8B4513]' : 'bg-[#C7B8B0]',
            ]"
            @click="() => selectSize(size)"
          >
            {{ size }}
          </div>
        </div>
        <div class="my-8">
          <p class="text-xl mb-4 text-[#B4B4B4]">Quantity</p>
          <div class="flex w-full">
            <BaseInputNumber
              v-model="valueInput"
              :max="10"
              :min="1"
              aria-label="Quantity"
              class="mr-6"
            />
            <AddToCartButton
              :class="{ loading: loading.value }"
              :disabled="false"
              class="flex-1 w-full"
              @click="addToCart(singleProductData?.products?.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <DrawerCustom v-model:modelValue="open" side="right" title="Cart" width="w-[400px]">
    <div>
      <div v-for="product in cartData" >{{product}}</div>
    </div>
  </DrawerCustom>
</template>

<script setup>
import DrawerCustom from "~/components/ui/shared/DrawerCustom/DrawerCustom.vue";

const slug = useRoute().params.slug;
const valueInput = ref(1);
const open = ref(false);
const loading = ref(false);
const sizes = ref(["XXS", "S", "M", "L", "XL", "XXL"]);
const sizeSelected = ref("XXS");
const productEcomStore = useProductEcommerceStore();
const { singleProductData } = storeToRefs(productEcomStore);
const productReviewStore = useProductReviewStore();
const { productReviews } = storeToRefs(productReviewStore);
const shoppingCartStore = useCartStore();
const { cartData, showCart } = storeToRefs(shoppingCartStore);
productEcomStore.fetchSingleProductData(slug).then(async () => {
  const categoryId = singleProductData?.value?.products?.categoryId;
  const productId = singleProductData?.value?.products?.id;

  await productReviewStore.fetchProductReviews(productId);
});

const addToCart = async (productId) => {
  loading.value = true;
  try {
    await $fetch("/api/e-commerce/cart", {
      method: "POST",
      body: {
        productId: productId,
        quantity: valueInput.value,
      },
    });
    await shoppingCartStore.fetchCartData();
    open.value = true;
    loading.value = false;
  } catch (e) {
    loading.value = false;
    console.error(e);
  }
};

const selectSize = (size) => {
  console.log(size);
  sizeSelected.value = size;
};
</script>

<style scoped></style>
