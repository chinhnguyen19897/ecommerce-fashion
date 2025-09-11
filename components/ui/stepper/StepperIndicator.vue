<script lang="ts" setup>
  import type { StepperIndicatorProps } from 'reka-ui'
  import type { HTMLAttributes } from 'vue'
  import { reactiveOmit } from '@vueuse/core'
  import { StepperIndicator, useForwardProps } from 'reka-ui'
  import { cn } from '@/lib/utils'

  const props = defineProps<StepperIndicatorProps & { class?: HTMLAttributes['class'] }>()

  const delegatedProps = reactiveOmit(props, 'class')

  const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperIndicator
    v-bind="forwarded"
    :class="
      cn(
        'text-muted-foreground/50 inline-flex h-8 w-8 items-center justify-center rounded-full',
        // Disabled
        'group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50',
        // Active
        'group-data-[state=active]:text-primary-foreground group-data-[state=active]:bg-primary',
        // Completed
        'group-data-[state=completed]:text-accent-foreground group-data-[state=completed]:bg-accent',
        props.class
      )
    "
  >
    <slot></slot>
  </StepperIndicator>
</template>
