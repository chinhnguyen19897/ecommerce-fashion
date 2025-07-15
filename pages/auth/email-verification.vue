<script setup lang="ts">
import VOtp from "vue3-otp-input";

const otpInput = ref<InstanceType<typeof VOtpInput | null>>(null);
const bindModal = ref("");

const signUpStore = useSignupStore();
const { registerInput } = storeToRefs(signUpStore);

const handleOnComplete = (otp: string) => {
  registerInput.value.otpCode = otp;
};

const handleOnChange = (value: string) => {};

const clearInput = () => {
  otpInput.value?.clearInput();
};

const fillInput = (value: string) => {
  otpInput.value?.fillInput(value);
};
const loading = ref(false);
const router = useRouter();

async function verifyEmail() {
  try {
    loading.value = true;
    const res = await $fetch("/api/auth/email-verification", {
      method: "POST",
      body: JSON.stringify(registerInput.value),
    });

    loading.value = false;
    successMsg(res?.message);
    window.location.href = "/auth/signin";
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
}
</script>

<template>
  <div class="bg-white h-screen">
    <div class="flex justify-between">
      <div></div>
      <div class="w- mt-20">
        <h1 class="text-2xl mb-3">Email Verification</h1>
        <v-otp-input
          ref="otpInput"
          input-classes="opt-input"
          :conditionalClass="['one', 'two', 'three', 'four']"
          separator=""
          inputType="letter-numeric"
          :num-inputs="6"
          v-model:value="bindValue"
          :should-auto-focus="true"
          :should-focus-order="true"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
          :placeholder="['*', '*', '*', '*']"
        />
        <BaseBtn
          class="w-[100%]"
          @click="verifyEmail"
          :loading="loading"
          label="Verify your Email Address"
        ></BaseBtn>
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
