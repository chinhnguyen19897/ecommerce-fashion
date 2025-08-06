<template>
  <ClientOnly>
    <StepperForm
      v-model:stepIndex="stepIndex"
      :buttonLabel="buttonLabel"
      :formData="formData"
      :steps="steps"
      :validValue="$v"
      @nextStepForm="nextStepForm"
      @submit="submitForm"
    >
      <template #step-content="{ stepIndex, formData, validValue }">
        <div v-if="stepIndex === 1">
          <ContactPersonForm :formData="formData" :validValue="validValue" />
        </div>
        <div v-if="stepIndex === 2">
          <CheckoutPayments
            v-model:paymentMethod="formData.paymentMethod"
            :cartData="cartData"
            :formData="formData"
            :totalPrice="totalPrice"
          />
        </div>
        <div v-if="stepIndex === 3 && paymentData">
          <ConfirmPayment :paymentData="paymentData" :orderData="orderData" />
        </div>
      </template>
    </StepperForm>
  </ClientOnly>
</template>

<script setup>
  import useVuelidate from '@vuelidate/core'
  import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
  import StepperForm from '~/components/ui/shared/StepperForm/StepperForm.vue'
  import ConfirmPayment from '~/components/e-commerce/checkout/ConfirmPayment.vue'

  const headers = useHeaders()
  const stepIndex = ref(1)
  const paymentData = ref({})
  const checkoutStore = useCheckoutStore()
  const { orderData } = storeToRefs(checkoutStore)
  const cartStore = useCartStore()
  const { totalPrice, cartData } = storeToRefs(cartStore)
  const formData = reactive({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    cityProvince: '',
    wards: '',
    paymentMethod: '',
    amount: ''
  })
  const rules = {
    fullName: {
      required: helpers.withMessage('Name is required', required)
    },
    phoneNumber: {
      required: helpers.withMessage('Phone number is required', required),
      minLength: helpers.withMessage('Phone number must be at least 9 characters', minLength(9)),
      maxLength: helpers.withMessage('Phone number must be at most 10 characters', maxLength(11))
    },
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Email is invalid', email)
    },
    address: {
      required: helpers.withMessage('Address is required', required)
    }
    /*cityProvince: {
required: helpers.withMessage("City/Province is required", required),
},
wards: {
required: helpers.withMessage("Wards is required", required),
},*/
  }

  const createOrder = async (formData) => {
    try {
      const data = await $fetch('/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          address: formData.address,
          totalPrice: totalPrice.value,
          items: cartData.value
        }),
        headers: {
          ...headers
        }
      })
      orderData.value = data?.order
    } catch (e) {
      console.error(e)
    }
  }
  const $v = useVuelidate(rules, formData)

  const submitForm = async () => {
    const result = await $v.value.$validate()
    console.log(formData, stepIndex)
  }

  const nextStepForm = async () => {
    if (stepIndex.value === 1) {
      $v.value.$touch()
      const isValid = await $v.value.$validate()
      if (!isValid) return

      stepIndex.value++
    } else if (stepIndex.value === 2) {
      await createOrder(formData)
    }
  }
  const method = computed(() => {
    return formData.paymentMethod === 'bank_transfer' ? 'bank_transfer' : 'cod'
  })
  watch(
    () => orderData.value?.id,
    async (orderId) => {
      if (!orderId) return
      if (orderId && method.value === 'bank_transfer' && stepIndex.value === 2) {
        try {
          const res = await $fetch('api/payments/create-payment', {
            method: 'POST',
            body: {
              orderId: orderData.value.id,
              amount: totalPrice.value,
              items: cartData.value
            }
          })
          paymentData.value = res.payment
          if(stepIndex.value === 2) {
            stepIndex.value++
          }
          console.log('Payment created', res)
        } catch (err) {
          console.error('Create payment failed', err)
        }
      }
    }
  )
  console.log(paymentData.value, orderData)

  const buttonLabel = computed(() => {
    if (stepIndex.value === 1) return 'Continue to shipping'
    if (stepIndex.value === 2) return 'Continue to payment'
    return 'I already pay'
  })

  const steps = [
    {
      step: 1,
      title: 'PERSONAL INFO',
      description: 'Step 1'
    },
    {
      step: 2,
      title: 'PAYMENTS',
      description: 'Step 2'
    },
    {
      step: 3,
      title: 'CONFIRMATION',
      description: 'Step 3'
    }
  ]
</script>

<style scoped></style>
