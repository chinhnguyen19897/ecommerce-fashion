<script setup>

const props = defineProps({
  paymentData: {
    type: Object,
    default: () => ({})
  },
  orderData: {
    type: Object
  }
})
const qrCodeData = ref(null)
const bankInfo = {
  bankName: "Vietcombank",
    accountNumber: "0031000334675",
    accountName: "NGUYEN TRAN CHINH",
  note:"TEN + SDT"
}

async function fetchQRCodeData() {
  const res = await $fetch('/api/payments/create-qrcode', {
    method: 'POST',
    body: {
      amount: props.paymentData.amount,
    }
  })
  qrCodeData.value = res.qrCode?.qrDataURL
}

onMounted(() => {
  if (props.paymentData?.amount) {
    fetchQRCodeData()
  }
})



</script>

<template>
  <ClientOnly>
  <div class="my-10">
    <div class="flex justify-between mb-6">
      <div class="flex flex-col gap-1">
        <span class="text-xl font-normal text-[#757575]">Order Number</span>
        <span class="text-xl font-normal text-[#3E3E3E]">{{ props?.orderData?.orderNumber }}</span>
      </div>
      <div class="bg-[#ECC0C0] rounded-full border border-[#FBE0E0] py-2 px-3 flex items-center h-max text-[#CD0909] text-xs normal-case">
        {{props.paymentData?.status}}
      </div>
    </div>
    <div>
      <span class="text-xl font-normal mb-1 text-[#757575]">Payment Information</span>
      <p class="mb-5 text-[#3E3E3E]">
        Upon completing your purchase, please proceed with a bank transfer to make the payment. Below you will find the necessary bank information and the total amount to be paid.
      </p>
      <div class="flex flex-col gap-5">
        <div>
          <p><strong>STK:</strong> {{ bankInfo.accountNumber }}</p>
        <p><strong>Ngân hàng:</strong> {{ bankInfo.bankName }}</p>
        <p><strong>Tên tài khoản:</strong> {{ bankInfo?.accountName }}</p>
        <p><strong>Nội dung chuyển khoản:</strong> {{ bankInfo?.note }}</p>
        </div>
        <img v-if="qrCodeData" :src="qrCodeData" alt="QR code chuyển khoản" width="50%"  />
      </div>
    </div>
  </div>
    </ClientOnly>
</template>

<style scoped></style>
