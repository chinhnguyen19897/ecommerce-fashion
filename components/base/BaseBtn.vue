<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  btnClass: {
    type: String,
    default: "bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
  },
});
</script>
<template>
  <button
    :class="[
      'flex justify-center rounded text-white px-4 py-2 items-center gap-2',
      btnClass,
    ]"
    :disabled="loading"
  >
    <svg
      v-show="loading"
      class="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
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
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
      ></path>
    </svg>

    {{ label }}
  </button>
</template>
