<script lang="ts" setup>
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
    overrideClass?: boolean
  }>()
</script>

<template>
  <div
    :class="
      overrideClass
        ? props.class
        : cn('text-card-foreground rounded-xl border bg-card shadow', props.class)
    "
  >
    <slot />
  </div>
</template>
