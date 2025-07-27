<script setup>
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const isLoading = ref(false);
</script>

<template>
  <button
    type="submit"
    class="flex bg-[#8B4513] text-white text-center text-lg font-lato uppercase font-normal tracking-[2px] p-2.5 gap-4 items-center justify-center focus:outline-none"
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
