<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

definePageMeta({
  layout: "auth",
});

const rules = {
  email: {
    required,
    email,
  },
  password: {
    required,
  },
  name: {
    required,
  },
};

const signupStore = useSignUpStore();
const { registerInput } = storeToRefs(signupStore);

const loading = ref(false);
const v$ = useVuelidate(rules, registerInput);
const router = useRouter();

async function submitForm() {
  const isValid = v$.value.$validate();
  if (!isValid) return;
  try {
    loading.value = true;
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(registerInput.value),
    });

    loading.value = false;
    router.push("/auth/email-verification");
  } catch (error) {
    console.error(error);
    loading.value = false;
    showLoginOrSignupError(error);
  }
}
</script>

<template>
  <div class="bg-white h-screen">
    <div class="flex justify-between">
      <div></div>
      <div class="w-[300px] mt-20">
        <h1 class="text-2xl mb-3">Sign Up</h1>
        <FormError :error="v$.email.$errors">
          <BaseInput
            v-model="registerInput.email"
            :type="'text'"
            :placeholder="'info@gmail.com'"
          />
        </FormError>
        <FormError :error="v$.password.$errors">
          <BaseInput
            v-model="registerInput.password"
            :type="'password'"
            :placeholder="'Password'"
          />
        </FormError>

        <FormError :error="v$.name.$errors">
          <BaseInput
            v-model="registerInput.name"
            :type="'text'"
            :placeholder="'Name'"
          />
        </FormError>
        <BaseBtn @click="submitForm" :loading="loading" label="Sign Up">
        </BaseBtn>
        <p
          class="text-sm font-normal text-center text-gray-700 dark:text-gray-500 sm:text-stat"
        >
          Already have an account?
          <NuxtLink
            to="/auth/signin"
            class="text-indigo-500 hover:text-brand-600 font-semibold"
          >
            Sign In</NuxtLink
          >
        </p>
      </div>
    </div>
    <div></div>
  </div>
</template>
