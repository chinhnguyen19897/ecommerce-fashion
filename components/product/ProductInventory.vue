<script lang="ts" setup>
  import { Checkbox } from '~/components/ui/checkbox'
  import FormCustomInput from '~/components/form/FormCustomInput.vue'

  const props = defineProps<{
    formData: any
  }>()
</script>

<template>
  <div>
    <p>Inventory</p>
    <div class="flex items-center space-x-2">
      <Checkbox id="track-quantity" />
      <label
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        for="track-quantity"
      >
        Track Quantity
      </label>
    </div>
    <div>
      <p>Quantity</p>
      <div class="my-2 w-full px-2"></div>
      <div class="flex justify-between">
        <!-- Location store -->
        <p>Gia Lam, Ha Noi</p>
        <FormCustomInput :name="'quantity'" :type="'number'" />
      </div>
      <div>
        <div class="flex items-center space-x-2">
          <Checkbox id="continue-selling" />
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="continue-selling"
          >
            Continue selling when out of stock
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <Checkbox id="has-SKU" />
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="has-SKU"
          >
            This product has a SKU or barcode
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
