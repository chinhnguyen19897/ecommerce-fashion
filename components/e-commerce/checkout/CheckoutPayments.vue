<script lang="ts" setup>
const props = defineProps<{
  stepIndex: number
  formData: any
  totalPrice: number
  cartData: any
}>()
import {RadioGroup} from "~/components/ui/radio-group";




const localMethod = ref(props.formData.paymentMethod ?? 'cod')

watch(localMethod, (val) => {
  props.formData.paymentMethod = val
})

</script>

<template>
  <div class="my-10">
 <h3 class="text-[32px] uppercase font-medium mb-10">Payments & Delivery</h3>
<RadioGroup default-value="cod" v-model="localMethod" :orientation="'vertical'">
  <div class="flex items-center gap-4 border border-[#B4B4B4] border-solid p-3">
    <RadioGroupItem value="cod" id="cod"/>
    <div class="flex gap-2">
      <NuxtImg src="/images/logo/cod.png" width="45" height="40" alt="cod" title="cod-logo"/>
      <div class="flex flex-col gap-1">
        <Label class="font-semibold text-[16px]">COD</Label>
        <span class="text-sm text-secondary">
          (Cash of delivery)
        </span>
      </div>
    </div>
  </div>
  <div class="flex items-center gap-4 border border-[#B4B4B4] border-solid p-3">
    <RadioGroupItem value="bank_transfer" id="b_trfs"/>
    <div class="flex gap-2">
      <NuxtImg src="/images/logo/bank-transfer.png" width="45" height="40" alt="bank-transfer" title="bank-transfer"/>
      <div class="flex flex-col gap-1">
        <Label class="font-semibold text-[16px]">Bank Transfer</Label>
        <span class="text-sm text-secondary">
          (Transfer to our bank account)
        </span>
      </div>
    </div>
  </div>
</RadioGroup>
  </div>
</template>
