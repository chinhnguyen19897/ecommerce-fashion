<template>
  <div
    class="cursor-pointer flex font-semibold mt-8 leading-none justify-between items-center"
    @click="isOpened = !isOpened"
  >
    <span>{{ filterTitle }}</span>
    <Icon
      name="ion:chervon-down-outline"
      class="transform"
      :class="isOpened ? 'rotate-180' : ''"
    />
  </div>
  <div
    v-show="isOpened"
    class="mt-3 mr-1 max-h-[240px] grid gap-1 overflow-auto custom-scroolbar"
  >
    <div
      v-for="term in attribute.terms"
      :key="term.slug"
      class="flex gap-2 items-center"
    >
      <input
        :id="term.slug"
        v-model="selectedTerms"
        type="checkbox"
        :value="term.slug"
        @change="checkboxChanged"
      />
      <label
        :for="term.slug"
        class="cursor-pointer m-0 text-sm flex items-center flex-wrap"
      >
        <span v-html="term.name" />
        <small class="ml-1 text-gray-400 tabular-nums" aria-hidden="true"
          >(0)</small
        >
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const attribute = ref({
  terms: [
    { slug: "black", name: "black" },
    { slug: "red", name: "black" },
    { slug: "green", name: "black" },
    { slug: "blue", name: "black" },
  ],
});
const selectedTerms = ref([]);
const filterTitle = ref<string>("/");
const isOpened = ref<boolean>(true);

const checkboxChanged = () => console.log("");
</script>

<style scoped></style>
