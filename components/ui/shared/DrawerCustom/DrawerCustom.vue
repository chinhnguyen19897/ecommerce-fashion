<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title?: string
  side?: 'left' | 'right' | 'bottom'
  width?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
<Drawer direction="right"  :open="modelValue" @update:open="val => emit('update:modelValue', val)">
  <DrawerContent  class="fixed right-0 top-0 h-full w-[300px] rounded-l-lg bg-white shadow-lg">
      <DrawerHeader>
        <DrawerTitle>{{title}}</DrawerTitle>
      </DrawerHeader>
    <div class="px-4 py-2 overflow-y-auto h-[calc(100%-100px)]">
      <slot />
    </div>
  </DrawerContent>
</Drawer>
</template>

<style scoped>

</style>