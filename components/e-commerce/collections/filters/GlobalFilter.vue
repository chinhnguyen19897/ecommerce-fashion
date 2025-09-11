<template>
  <div
    class="mt-8 flex cursor-pointer items-center justify-between font-semibold leading-none"
    @click="isOpened = !isOpened"
  >
    <span>{{ filterTitle }}</span>
    <Icon name="ion:chervon-down-outline" class="transform" :class="isOpened ? 'rotate-180' : ''" />
  </div>
  <div v-show="isOpened" class="custom-scroolbar mr-1 mt-3 grid max-h-[240px] gap-1 overflow-auto">
    <div v-for="term in attribute.terms" :key="term.slug" class="flex items-center gap-2">
      <input
        :id="term.slug"
        v-model="selectedTerms"
        type="checkbox"
        :value="term.slug"
        @change="checkboxChanged"
      />
      <label :for="term.slug" class="m-0 flex cursor-pointer flex-wrap items-center text-sm">
        <span v-html="term.name"></span>
        <small class="text-gray-400 ml-1 tabular-nums" aria-hidden="true">(0)</small>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
  const attribute = ref({
    terms: [
      { slug: 'black', name: 'black' },
      { slug: 'red', name: 'black' },
      { slug: 'green', name: 'black' },
      { slug: 'blue', name: 'black' }
    ]
  })
  const selectedTerms = ref([])
  const filterTitle = ref<string>('/')
  const isOpened = ref<boolean>(true)

  const checkboxChanged = () => console.log('')
</script>

<style scoped></style>
