<script lang="ts" setup>
  import { QuillEditor } from '@vueup/vue-quill'

  const editorData = ref('')
  const options = ref({
    theme: 'snow',
    placeholder: 'Write here'
  })
</script>

<template>
  <ClientOnly>
    <div class="editor-container">
      <QuillEditor
        v-model:content="editorData"
        :options="options"
        contentType="html"
        toolbar="full"
      />
    </div>
  </ClientOnly>
</template>

<style scoped></style>
