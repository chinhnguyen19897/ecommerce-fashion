<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      :class="iconClassMinus"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
    </svg>
  </div>
</template>

<script setup>
  defineProps({
    iconClassMinus: {
      type: String,
      default: 'size-6'
    }
  })
</script>
