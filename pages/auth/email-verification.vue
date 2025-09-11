<script setup lang="ts">
  import VOtpInput from 'vue3-otp-input'
  definePageMeta({
    layout: 'auth'
  })

  const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null)
  const bindModal = ref('')

  const signUpStore = useSignUpStore()
  const { registerInput } = storeToRefs(signUpStore)

  const handleOnComplete = (otp: string) => {
    registerInput.value.otpCode = otp
  }

  const handleOnChange = (value: string) => {}

  const clearInput = () => {
    otpInput.value?.clearInput()
  }

  const fillInput = (value: string) => {
    otpInput.value?.fillInput(value)
  }
  const loading = ref(false)
  const router = useRouter()

  async function verifyEmail() {
    try {
      loading.value = true
      const res = await $fetch('/api/auth/email-verification', {
        method: 'POST',
        body: JSON.stringify(registerInput.value)
      })

      loading.value = false
      successMsg(res?.message)
      window.location.href = '/auth/signin'
    } catch (error) {
      console.error(error)
      loading.value = false
    }
  }
</script>

<template>
  <div class="h-screen bg-white">
    <div class="flex justify-between">
      <div></div>
      <div class="w- mt-20">
        <h1 class="mb-3 text-2xl">Email Verification</h1>
        <v-otp-input
          ref="otpInput"
          v-model:value="bindValue"
          input-classes="opt-input"
          :conditional-class="['one', 'two', 'three', 'four']"
          separator=""
          input-type="letter-numeric"
          :num-inputs="6"
          :should-auto-focus="true"
          :should-focus-order="true"
          :placeholder="['*', '*', '*', '*']"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
        />
        <BaseBtn
          class="w-[100%]"
          :loading="loading"
          label="Verify your Email Address"
          @click="verifyEmail"
        />
      </div>
    </div>
    <div></div>
  </div>
</template>

<style>
  .opt-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  .otp-input.is-complete {
    background-color: #e4e4e4;
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input::placeholder {
    font-size: 15px;
    text-align: center;
    font-weight: 600;
  }
</style>
