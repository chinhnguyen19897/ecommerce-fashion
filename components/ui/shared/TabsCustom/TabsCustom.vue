<script lang="ts" setup>
  import { cn } from '~/lib/utils'

  type TabsItem = {
    id: string | number
    value: string
    name: string
  }
  type TabsContent = {
    id: string | number
    name: string
    value: string
    component?: Component
    props?: Record<string, any>
  }
  const props = defineProps<{
    tabsList: Array<TabsItem>
    tabsContent: Array<TabsContent>
    typeTab?: string
    tabClass?: string
    triggerClass?: string
    contentClass?: string
    listClass?: string
    selectedTab?: string
    defaultValue: string
  }>()
  const emit = defineEmits<{
    (e: 'update:selectedTab', value: string): void
  }>()

  const selected = ref<string>(
    props.selectedTab ?? props.defaultValue ?? props.tabsContent?.[0]?.value ?? ''
  )

  watch(
    () => props.tabsContent,
    (items) => {
      if (!items.length) return
      if (!items.some((i) => i.value === selected.value)) {
        selected.value = items[0].value
      }
    },
    { immediate: true }
  )
  watch(
    () => props.selectedTab,
    (v) => {
      if (v != null && v !== selected.value) selected.value = v
    }
  )
  watch(selected, (v) => emit('update:selectedTab', v))
</script>

<template>
  <Tabs
    :class="cn('w-full', props.tabClass)"
    :default-value="defaultValue"
    orientation="typeTab ?? 'horizontal'"
  >
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
      <KeepAlive>
        <component :is="content.component" v-if="content.component" v-bind="content.props" />
      </KeepAlive>
    </TabsContent>
  </Tabs>
</template>

<style scoped></style>
