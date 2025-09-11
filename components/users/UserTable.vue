<script setup>
  const props = defineProps(['userData'])

  const userStore = useUserStore()
  const { userData, search } = storeToRefs(userStore)

  const searchUsers = _debounce(async function (event) {
    search.value = event[0].target.value
    await userStore.fetchUsers()
  }, 1000)
</script>
<template>
  <div class="mb-1 flex justify-between">
    <input
      v-model="search"
      placeholder="Search..."
      type="text"
      class="mb-2 rounded-md border px-2 py-2 shadow-md"
      @keydown="searchUsers"
    />
    <slot name="btn"></slot>
  </div>
  <table class="w-full rounded-md border border-gray-300 bg-white shadow-sm">
    <thead>
      <tr class="bg-gray-100 text-left">
        <td class="border border-gray-300 px-4 py-2">#</td>

        <td class="border border-gray-300 px-4 py-2">Name</td>
        <td class="border border-gray-300 px-4 py-2">E-mail</td>
        <td class="border border-gray-300 px-4 py-2">Is Valid Email</td>

        <!-- <td class="border border-gray-300 py-2 px-4">Action</td> -->
      </tr>
    </thead>

    <tbody>
      <tr v-for="(user, index) in userData?.users" :key="user.id" class="text-left">
        <td class="border border-gray-300 px-4 py-2">
          {{ index + 1 }}
        </td>

        <td class="border border-gray-300 px-4 py-2">{{ user?.name }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
        <td class="border border-gray-300 px-4 py-2">
          <span
            v-if="user.isValidEmail == 1"
            class="rounded-md bg-green-200 px-1 py-1 text-sm font-semibold"
            >Valid Email</span
          >
          <span v-else class="rounded-md bg-red-200 px-1 py-1 text-sm font-semibold"
            >Invalid email</span
          >
        </td>

        <!-- <td class="flex border border-gray-300 py-2 px-4">


        </td> -->
      </tr>
    </tbody>
  </table>

  <div class="mt-4 flex items-center justify-between">
    <div>
      <button
        class="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        :disabled="userData?.metadata?.page === 1"
        @click="userStore.changePage(userData?.metadata?.page - 1)"
      >
        Prev
      </button>

      <span>Page {{ userData?.metadata?.page }} of {{ userData?.metadata?.totalPages }}</span>

      <button
        class="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        :disabled="userData?.metadata?.page === userData?.metadata?.totalPages"
        @click="userStore.changePage(userData?.metadata?.page + 1)"
      >
        Next
      </button>
    </div>
    <div></div>
  </div>
</template>
