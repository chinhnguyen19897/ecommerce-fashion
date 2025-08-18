<script lang="ts" setup>
  import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

  const props = defineProps<{
    title: {
      type: string
    }
  }>()
</script>

<template>
  <Card class="flex w-full justify-between gap-24">
    <CardHeader>
      <CardTitle>{{ props.title }}</CardTitle>
    </CardHeader>
    <CardContent class="w-full max-w-[800px]">
      <slot />
    </CardContent>
  </Card>
</template>

<style scoped></style>
