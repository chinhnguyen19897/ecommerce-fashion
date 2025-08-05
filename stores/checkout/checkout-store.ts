import { defineStore } from "pinia";

export const useCheckoutStore = defineStore('checkout-store', () => {
    const qrCodeData = ref<any>()
    const orderData = ref<any>()
    async function createQRCode(formData: any){
        const {data} = await useFetch('/api/payments/create-qrcode', {
            method: "POST",
            body: formData
        })
        console.log(data)
        qrCodeData.value = data.value
    }


    return {createQRCode, qrCodeData, orderData}
})