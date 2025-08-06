<script setup >
const props = defineProps({
  orderData: Object,
})
</script>

<template>
  <div v-if="orderData?.paymentMethod === 'bank_transfer'">
    <div class="flex flex-col">
      <h1>Payment Success!</h1>
     <p>
          Lean back and relax, knowing our team is hard at work preparing and shipping your package swiftly. Feel free to browse our diverse product selection during this time – you might discover another item you'd like to add to your collection!
        </p>
        <BaseBtn label="Back to home" />
    </div>
  </div>
  <div v-else-if="orderData?.paymentMethod === 'cod'">
      <div class="flex flex-col">
        <h1>Order Success!</h1>
        <p>
          Lean back and relax, knowing our team is hard at work preparing and shipping your package swiftly. Feel free to browse our diverse product selection during this time – you might discover another item you'd like to add to your collection!
        </p>
        <BaseBtn label="Back to home" />
      </div>
  </div>
</template>

<style scoped>

</style>