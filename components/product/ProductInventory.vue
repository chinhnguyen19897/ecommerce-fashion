<script lang="ts" setup>
  import { Checkbox } from '~/components/ui/checkbox'
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
    </div>
  </div>
</template>

<style scoped></style>
