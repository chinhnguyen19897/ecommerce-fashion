<script setup>
  import { useVuelidate } from '@vuelidate/core'
  import { required, email } from '@vuelidate/validators'

  definePageMeta({
    layout: 'auth'
  })

  const loginInput = ref({
    email: '',
    password: ''
  })
  const rules = {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }

  const v$ = useVuelidate(loginInput, rules)

  const loading = ref(false)
  const router = useRouter()

  const userCookie = useCookie('user', userCookieSettings)

  async function submitForm() {
    const isValid = v$.value.$validate()
    if (!isValid) return
    try {
      loading.value = true
      const res = await $fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInput.value),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      loading.value = false
      const userRole = res?.data?.user?.role
      if (userRole === 'CUSTOMER') {
        userCookie.value = res
        // router.push("/");
        router.push('/admin/dashboard')
      } else {
        console.log(res)
        router.push('/admin/dashboard')
        userCookie.value = res
      }
    } catch (error) {
      console.error(error)
      loading.value = false
      // showLoginOrSignupError(error);
    }
  }
</script>

<template>
  <div class="h-screen bg-white">
    <div class="flex justify-between">
      <div></div>
      <div class="mt-20 w-[300px]">
        <h1 class="mb-3 text-2xl">Sign In</h1>

        <FormError :error="v$.email.$errors">
          <BaseInput v-model="loginInput.email" :placeholder="'info@gmail.com'" :type="'text'" />
        </FormError>

        <FormError :error="v$.password.$errors">
          <BaseInput v-model="loginInput.password" :placeholder="'Password'" :type="'password'" />
        </FormError>

        <BaseBtn :loading="loading" label="Sign In" @click="submitForm" />
        <p class="text-gray-700 sm:text-stat text-center text-sm font-normal dark:text-gray-500">
          Don't have an account?
          <NuxtLink class="text-indigo-500 hover:text-brand-600 font-semibold" to="/auth/signup"
            >Sign Up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
