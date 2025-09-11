<script setup>
  import EditIcon from '~/components/icons/EditIcon.vue'

  const props = defineProps(['categories'])

  const emit = defineEmits(['editCategory'])
</script>
<template>
  <table class="w-full rounded-md border border-gray-300 bg-white shadow-sm">
    <thead>
      <tr class="bg-gray-100 text-left">
        <td class="border border-gray-300 px-4 py-2">#</td>
        <td class="border border-gray-300 px-4 py-2">Name</td>
        <td class="border border-gray-300 px-4 py-2">Action</td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(category, index) in categories" :key="category.id" class="text-left">
        <td class="border border-gray-300 px-4 py-2">
          {{ index + 1 }}
        </td>
        <td class="border border-gray-300 px-4 py-2">
          {{ category?.name }}
        </td>

        <td class="0 border border-gray-300 px-4 py-2">
          <button
            class="text-gray-900 flex items-center justify-center gap-2 rounded px-4 py-2 font-bold hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="loading"
            @click="emit('editCategory', category)"
          >
            <EditIcon />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
