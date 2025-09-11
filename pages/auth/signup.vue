<script setup>
  import { useVuelidate } from '@vuelidate/core'
  import { required, email } from '@vuelidate/validators'

  definePageMeta({
    layout: 'auth'
  })

  const rules = {
    email: {
      required,
      email
    },
    password: {
      required
    },
    name: {
      required
    }
  }

  const signupStore = useSignUpStore()
  const { registerInput } = storeToRefs(signupStore)

  const loading = ref(false)
  const v$ = useVuelidate(rules, registerInput)
  const router = useRouter()

  async function submitForm() {
    const isValid = v$.value.$validate()
    if (!isValid) return
    try {
      loading.value = true
      const res = await $fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerInput.value)
      })
      console.log(res)
      if (res?.statusCode === 400) {
        throw new Error('Invalid email or password')
      }
      loading.value = false
      await router.push('/auth/email-verification')
    } catch (error) {
      console.error(error)
      loading.value = false
      //showLoginOrSignupError(error);
    }
  }
</script>

<template>
  <div class="h-screen bg-white">
    <div class="flex justify-between">
      <div></div>
      <div class="mt-20 w-[300px]">
        <h1 class="mb-3 text-2xl">Sign Up</h1>
        <FormError :error="v$.email.$errors">
          <BaseInput v-model="registerInput.email" :placeholder="'info@gmail.com'" :type="'text'" />
        </FormError>
        <FormError :error="v$.password.$errors">
          <BaseInput
            v-model="registerInput.password"
            :placeholder="'Password'"
            :type="'password'"
          />
        </FormError>

        <FormError :error="v$.name.$errors">
          <BaseInput v-model="registerInput.name" :placeholder="'Name'" :type="'text'" />
        </FormError>
        <BaseBtn :loading="loading" label="Sign Up" @click="submitForm" />
        <p class="text-gray-700 sm:text-stat text-center text-sm font-normal dark:text-gray-500">
          Already have an account?
          <NuxtLink class="text-indigo-500 hover:text-brand-600 font-semibold" to="/auth/signin">
            Sign In</NuxtLink
          >
        </p>
      </div>
    </div>
    <div></div>
  </div>
</template>
