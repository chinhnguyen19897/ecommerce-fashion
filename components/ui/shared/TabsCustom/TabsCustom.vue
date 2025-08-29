<script lang="ts" setup>
  import { cn } from '~/lib/utils'

  type TabsItem = {
    id: string | number
    value: string
    name: string
  }
  type TabsContent = {
    id: string | number
    value: string
    content: Component
  }
  const props = defineProps<{
    tabsList: Array<TabsItem>
    tabsContent: Array<TabsContent>
    orientation: {
      type: string
      default: 'horizontal'
    }
    tabClass?: string
    triggerClass?: string
    contentClass?: string
    listClass?: string
  }>()
</script>

<template>
  <Tabs :class="cn('w-full', props.tabClass)" :orientation="props.orientation">
    <TabsList :class="cn('', props.listClass)">
      <TabsTrigger
        v-for="item in props.tabsList"
        :key="item.id"
        :class="cn('px-4 py-2', props.triggerClass)"
        :value="item.value"
        >{{ item.name }}
      </TabsTrigger>
    </TabsList>
    <TabsContent
      v-for="content in props.tabsContent"
      :key="content.id"
      :class="cn('mt-4', props.contentClass)"
      :value="content.value"
    >
      <component :is="content.content" />
    </TabsContent>
  </Tabs>
</template>

<style scoped></style>
