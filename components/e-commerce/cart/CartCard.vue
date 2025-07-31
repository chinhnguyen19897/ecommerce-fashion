<template>
  <div v-for="product in cartData">
    <div class="flex gap-4">
      <div :class="[cartPage ? 'max-w-[140px]' : 'max-w-[116px]', 'w-full']">
        <NuxtImg
          :src="product.product.images[0]?.url || ''"
          :width="widthImg"
          :height="heightImg"
          title="product-image"
          alt="product-image"
          fetchpriority="high"
          placeholder
        />
      </div>
      <div class="flex flex-col w-full gap-2">
        <h5
          :class="[
            cartPage ? 'text-2xl' : 'text-lg',
            'text-[#3E3E3E] font-light',
          ]"
        >
          {{ product.product.name }}
        </h5>
        <p
          :class="[
            cartPage ? 'text-2xl' : 'text-sm',
            'text-[#757575] font-light',
          ]"
        >
          {{ formatCurrency(Number(product?.product?.price)) }}
        </p>
        <div class="flex justify-between">
          <BaseInputNumber
            v-model="product.quantity"
            :max="10"
            :min="1"
            :maxWidth="[cartPage ? '150px' : '100px']"
            :inputClass="[
              cartPage ? 'text-lg h-[56px]' : 'text-xs',
              'h-[35px]',
            ]"
            aria-label="Quantity"
            :iconClass="[cartPage ? 'size-6' : 'size-4']"
            :iconClassMinus="[cartPage ? 'size-6' : 'size-4']"
          />
          <div
            class="flex items-center text-xs text-[#929292] gap-2 cursor-pointer underline"
          >
            <TrashIcon :iconClass="[cartPage ? 'size-6' : 'size-4']" />
            <span :class="[cartPage ? 'text-lg' : 'text-sm']">Delete</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cartData: {
    type: Array,
    required: true,
  },
  widthImg: {
    type: String,
    default: "116",
  },
  heightImg: {
    type: String,
    default: "155",
  },
  cartPage: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
