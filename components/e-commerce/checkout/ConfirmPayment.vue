<script lang="ts" setup>

const props = defineProps<{
  paymentData: any
}>()
const qrCodeData = ref<any>()
watchEffect(() => {
  console.log(props.paymentData, props.paymentData?.amount)
})
const bankInfo = {
  bankName: "Vietcombank",
    accountNumber: "0031000334675",
    accountName: "NGUYEN TRAN CHINH",
    acqId: "970436"
}

onMounted(() => {
   $fetch('https://api.vietqr.io/v2/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      accountNo: bankInfo.accountNumber,
      accountName: bankInfo.accountName,
      acqId: bankInfo.acqId,
      amount: props.paymentData?.amount,
      format: 'text',
      template: 'compact2',
    },
  }).then((res: any) => {
    console.log(res)
  })
})



</script>

<template>
  <div class="my-10">
    <div class="flex justify-between">
      <div>
        <span>Order Number</span>
        <span>Number</span>
      </div>
      <div>
        <span>Status</span>
        <span>{{props.paymentData?.status}}</span>
      </div>
    </div>
    <div>
      <span>Payment information</span>
      <p>
        Please make the bank transfer using the bank details provided below:
      </p>
      <div>
        <p><strong>STK:</strong> {{ qrCodeData?.accountNumber }}</p>
        <p><strong>Ngân hàng:</strong> {{ qrCodeData?.bankName }}</p>
        <p><strong>Tên tài khoản:</strong> {{ qrCodeData?.accountName }}</p>
        <p><strong>Nội dung chuyển khoản:</strong> {{ qrCodeData?.note }}</p>
        <img :src="qrCodeData.qrCodeUrl" alt="QR code chuyển khoản" class="w-60 h-60" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
