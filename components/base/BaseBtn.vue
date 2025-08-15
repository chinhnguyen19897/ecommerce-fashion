<script setup>
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    btnClass: {
      type: String,
      default: 'bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
    },
    iconBtn: {
      type: Object,
      default: null
    },
    iconProps: {
      type: Object,
      default: () => ({})
    }
  })
</script>
<template>
  <button
    :class="['flex items-center justify-center gap-2 rounded px-4 py-2 text-white', btnClass]"
    :disabled="loading"
  >
    <svg
      v-show="loading"
      class="h-5 w-5 animate-spin text-white"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
        fill="currentColor"
      ></path>
    </svg>

    {{ label }}
    <component :is="iconBtn" v-if="iconBtn" v-bind="iconProps" />
  </button>
</template>
