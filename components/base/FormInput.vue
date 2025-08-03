<script lang="ts" setup>
  defineProps({
    forLabel: {
      type: String
    },
    id: {
      type: String
    },
    label: {
      type: String
    },
    name: {
      type: String
    },
    modelValue: {
      type: String
    },
    type: {
      type: String
    },
    placeholder: String,
    focus: {
      type: Function,
      default: undefined
    }
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'onblur'): void
  }>()
</script>

<template>
  <Label :for="forLabel" class="mb-1 inline-block text-xl font-medium uppercase">{{ label }}</Label>
  <Input
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    class="font-regular h-16 rounded-none border-[#3E3E3E] p-3 text-xl placeholder:text-[#B4B4B4]"
    @blur="emit('onblur')"
    @input="(e: any) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
  />
</template>
