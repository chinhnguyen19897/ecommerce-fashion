<script lang="ts" setup>
  import { RadioGroup } from '~/components/ui/radio-group'
  const props = defineProps<{
    stepIndex: number
    formData: any
    totalPrice: number
    cartData: any
    paymentMethod: string
  }>()

  const emit = defineEmits<{
    (e: 'update:paymentMethod', value: string): void
  }>()

  const localMethod = ref(props.paymentMethod ?? 'cod')

  watch(localMethod, (val) => {
    emit('update:paymentMethod', val)
  })
</script>

<template>
  <div class="my-10">
    <h3 class="mb-10 text-[32px] font-medium uppercase">Payments & Delivery</h3>
    <RadioGroup v-model="localMethod" :orientation="'vertical'" default-value="cod">
      <div class="flex items-center gap-4 border border-solid border-[#B4B4B4] p-3">
        <RadioGroupItem id="cod" value="cod" />
        <div class="flex gap-2">
          <NuxtImg alt="cod" height="40" src="/images/logo/cod.png" title="cod-logo" width="45" />
          <div class="flex flex-col gap-1">
            <Label class="text-base font-semibold">COD</Label>
            <span class="text-sm text-secondary"> (Cash of delivery) </span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4 border border-solid border-[#B4B4B4] p-3">
        <RadioGroupItem id="b_trfs" value="bank_transfer" />
        <div class="flex gap-2">
          <NuxtImg
            alt="bank-transfer"
            height="40"
            src="/images/logo/bank-transfer.png"
            title="bank-transfer"
            width="45"
          />
          <div class="flex flex-col gap-1">
            <Label class="text-base font-semibold">Bank Transfer</Label>
            <span class="text-sm text-secondary"> (Transfer to our bank account) </span>
          </div>
        </div>
      </div>
    </RadioGroup>
  </div>
</template>
