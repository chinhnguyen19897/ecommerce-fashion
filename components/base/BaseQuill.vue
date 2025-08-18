<script lang="ts" setup>
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import '@vueup/vue-quill/dist/vue-quill.bubble.css'
  import { QuillEditor } from '@vueup/vue-quill'
</script>

<template>
  <ClientOnly>
    <QuillEditor theme="snow" />
  </ClientOnly>
</template>

<style scoped></style>
