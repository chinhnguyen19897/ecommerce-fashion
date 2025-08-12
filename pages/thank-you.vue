<script setup>
  definePageMeta({
    layout: 'thank-you'
  })
  const router = useRouter()
  const checkoutStore = useCheckoutStore()
  const { orderData } = storeToRefs(checkoutStore)
  console.log(orderData)
  // v-else-if="orderData?.paymentMethod === 'cod'"
</script>

<template>
  <div v-if="orderData?.paymentMethod === 'bank_transfer'">
    <div class="flex flex-col items-center justify-between gap-1">
      <p>
        <IconCheckSuccess />
      </p>

      <h1 class="font-playfair text-7xl font-medium">Payment Success!</h1>
      <p class="text-base text-[#757575]">
        Lean back and relax, knowing our team is hard at work preparing and shipping your package
        swiftly. Feel free to browse our diverse product selection during this time – you might
        discover another item you'd like to add to your collection!
      </p>
      <BaseBtn
        class="w-full max-w-[565px] rounded-none !bg-[#8B4513] p-6 text-center text-2xl uppercase text-[#ffffff]"
        label="Back to home"
        @click="router.push('/')"
      />
    </div>
  </div>
  <div class="flex flex-col items-center gap-10">
    <div class="flex flex-col items-center justify-between gap-1">
      <p>
        <IconCheckSuccess />
      </p>
      <h1 class="font-playfair text-7xl font-medium uppercase">Order Success!</h1>
      <p class="text-base text-[#757575]">
        Lean back and relax, knowing our team is hard at work preparing and shipping your package
        swiftly. Feel free to browse our diverse product selection during this time – you might
        discover another item you'd like to add to your collection!
      </p>
    </div>
    <BaseBtn
      class="h-[72px] w-full max-w-[565px] rounded-none !bg-[#8B4513] !p-6 text-center !text-2xl !font-light uppercase tracking-widest text-[#ffffff]"
      label="Back to home"
      @click="router.push('/')"
    />
  </div>
</template>

<style scoped></style>
