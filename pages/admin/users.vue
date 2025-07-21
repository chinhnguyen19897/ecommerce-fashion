<script setup>
definePageMeta({
  layout: "admin",
});

const userStore = useUserStore();
const { userData, userError } = storeToRefs(userStore);

const { $isAuthenticated } = useNuxtApp();

await userStore.fetchUsers();
</script>

<template>
  <div class="h-screen">
    <div class="flex justify-end mb-4 pt-4">
      <UserTable :userData="userData" />
    </div>
  </div>
</template>
