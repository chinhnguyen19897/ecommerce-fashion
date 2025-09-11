<script setup>
  const props = defineProps(['type', 'placeholder', 'modelValue'])

  const emit = defineEmits(['update:modelValue'])

  function updateInput(event) {
    const val = event.target.value
    emit('update:modelValue', val)
  }
</script>
<template>
  <input
    id=""
    :value="modelValue"
    :type="typeof type !== 'undefined' ? type : 'text'"
    name=""
    :placeholder="placeholder"
    class="focus:bg-focus-900 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-gray-700"
    @input="updateInput"
  />
</template>
