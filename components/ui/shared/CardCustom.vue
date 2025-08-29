<script lang="ts" setup>
  import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

  const props = defineProps<{
    title: {
      type: String
    }
  }>()
</script>

<template>
  <Card
    class="my-10 rounded-2xl bg-white px-6 py-8 shadow-[0_2px_8px_0_rgba(0,0,0,0.08),0_8px_20px_-4px_rgba(0,0,0,0.12)]"
    overrideClass
  >
    <div class="flex w-full justify-between gap-16">
      <CardHeader class="w-56 shrink-0 p-0">
        <CardTitle class="text-gray-900 text-lg font-semibold">{{ props.title }}</CardTitle>
        <p v-if="$slots.description" class="mt-1 text-sm text-gray-500">
          <slot name="description" />
        </p>
      </CardHeader>
      <CardContent class="w-full max-w-[820px] p-0">
        <slot />
      </CardContent>
    </div>
  </Card>
</template>

<style scoped></style>
