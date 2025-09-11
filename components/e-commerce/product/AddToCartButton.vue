<script setup>
  const props = defineProps({
    disabled: { type: Boolean, default: false }
  })
  const isLoading = ref(false)
</script>

<template>
  <button
    type="submit"
    class="flex items-center justify-center gap-4 bg-[#8B4513] p-2.5 text-center font-lato text-lg font-normal uppercase tracking-[2px] text-white focus:outline-none"
    :class="{ disabled: false }"
    :disabled="disabled"
  >
    <p class="w-full">Add to cart</p>
    <CartIcon size="12" color="#fff" class="mr-3" />
    <LoadingIcon v-if="isLoading" size="12" color="#fff" />
  </button>
</template>

<style lang="postcss" scoped>
  button {
    outline: none !important;
    transition: all 150ms ease-in;
  }

  button.disabled {
    @apply cursor-not-allowed bg-gray-400;
  }
</style>
