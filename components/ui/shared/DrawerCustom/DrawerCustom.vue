<script lang="ts" setup>
  import { cn } from '~/lib/utils'
  import { DrawerContent, DrawerTitle, DrawerPortal, DrawerOverlay, DrawerClose } from 'vaul-vue'
  import { computed } from 'vue'
  import { X } from 'lucide-vue-next'
  import { Separator } from '@/components/ui/separator'
  const props = defineProps<{
    modelValue: boolean
    title?: string
    side?: 'left' | 'right' | 'bottom'
    width?: string
    class?: string
  }>()

  const emit = defineEmits(['update:modelValue'])

  const drawerDirection = computed(() => props.side ?? 'right')

  const onOpenChange = (val: boolean) => {
    emit('update:modelValue', val)
  }
</script>

<template>
  <ClientOnly>
    <Drawer :direction="drawerDirection" :open="modelValue" @update:open="onOpenChange">
      <DrawerPortal>
        <DrawerOverlay class="fixed inset-0 z-50 bg-black/80" />
        <DrawerContent
          :class="
            cn(
              drawerDirection === 'right'
                ? 'fixed right-0 top-0 h-full w-[400px] rounded-l-[10px]'
                : 'fixed inset-x-0 bottom-0 h-auto rounded-t-[10px]',
              'z-50 flex flex-col border bg-white',
              props.class
            )
          "
        >
          <DrawerHeader class="flex w-full items-center justify-between">
            <DrawerTitle class="font-playfair text-4xl font-medium uppercase text-[#3E3E3E]">{{
              title
            }}</DrawerTitle>
            <DrawerClose>
              <X clas="h-3 w-3" />
            </DrawerClose>
          </DrawerHeader>
          <Separator class="my-[5px] border-[1px]" />
          <div class="overflow-y-auto px-4 py-2">
            <slot></slot>
          </div>
          <DrawerFooter>
            <slot name="footer"></slot>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  </ClientOnly>
</template>

<style scoped></style>
