<script lang="ts" setup>
  const props = defineProps<{
    title?: string
    description?: string
    products?: any[]
  }>()
</script>

<template>
  <section id="product-list" class="my-10 w-full">
    <div class="w-full px-[42px]">
      <div class="flex flex-col gap-8">
        <h2 class="font-playfair text-7xl font-medium uppercase">{{ props.title }}</h2>
        <div class="grid auto-cols-auto grid-flow-col gap-8">
          <div class="flex flex-col gap-4">
            <NuxtImg
              alt="product-1"
              class="h-full w-full object-cover"
              src="/images/products/product-1.jpg"
            />
            <div class="flex flex-col gap-2">
              <p class="text-sm text-[#b4b4b4]">Product Category</p>
              <h3 class="font-playfair text-base uppercase text-secondary">Product Name</h3>
              <p class="text-sm text-[#b4b4b4]">300.000đ</p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <NuxtImg
              alt="product-1"
              class="h-full w-full object-cover"
              src="/images/products/product-1.jpg"
            />
            <div class="flex flex-col gap-2">
              <p class="text-sm text-[#b4b4b4]">Product Category</p>
              <h3 class="font-playfair text-base uppercase text-secondary">Product Name</h3>
              <p class="text-sm text-[#b4b4b4]">300.000đ</p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <NuxtImg
              alt="product-1"
              class="h-full w-full object-cover"
              src="/images/products/product-1.jpg"
            />
            <div class="flex flex-col gap-2">
              <p class="text-sm text-[#b4b4b4]">Product Category</p>
              <h3 class="font-playfair text-base uppercase text-secondary">Product Name</h3>
              <p class="text-sm text-[#b4b4b4]">300.000đ</p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <NuxtImg
              alt="product-1"
              class="h-full w-full object-cover"
              src="/images/products/product-1.jpg"
            />
            <div class="flex flex-col gap-2">
              <p class="text-sm text-[#b4b4b4]">Product Category</p>
              <h3 class="font-playfair text-base uppercase text-secondary">Product Name</h3>
              <p class="text-sm text-[#b4b4b4]">300.000đ</p>
            </div>
          </div>
        </div>
        <div>
          <BaseBtn
            btnClass="!p-3 bg-[#8B4513] max-w-[150px] w-full uppercase text-[#fff] font-regular text-base rounded-none"
            label="SEE MORE"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
