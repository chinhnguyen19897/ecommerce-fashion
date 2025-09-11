<script setup>
  definePageMeta({
    layout: 'admin'
  })

  const userStore = useUserStore()
  const { userData, userError } = storeToRefs(userStore)

  const { $isAuthenticated } = useNuxtApp()

  await userStore.fetchUsers()
</script>

<template>
  <div class="h-screen">
    <div class="mb-4 flex justify-end pt-4"></div>
    {{ $isAuthenticated(userError) }}
    <UserTable :user-data="userData" />
  </div>
</template>
