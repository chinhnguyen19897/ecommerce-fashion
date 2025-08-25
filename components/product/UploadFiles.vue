<script lang="ts" setup>
  type LocalImage = {
    id: string
    file: File
    error?: string
    progress: number
    uploadedUrl?: string
    uploading: boolean
    previewUrl: string
  }
  const props = withDefaults(
    defineProps<{
      multiple?: boolean
      accept?: string[]
      maxSize?: number
    }>(),
    {
      multiple: false,
      accept: () => ['image/jpeg', 'image/png', 'image/avif', 'image/webp'],
      maxSize: 5
    }
  )

  const emit = defineEmits<{
    (e: 'uploaded', files: { id: string; url: string; name: string }[]): void
  }>()

  const dragging = ref(false)
  const inputRef = ref<HTMLInputElement | null>(null)
  const items = ref<LocalImage[]>([])

  const selectFile = () => {
    inputRef.value?.click()
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault()
    dragging.value = true
  }

  function onDragLeave(e: DragEvent) {
    e.preventDefault()
    dragging.value = false
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    dragging.value = false
    if (!e.dataTransfer) return
    handleFiles(e.dataTransfer.files)
  }

  function onChoose(e: Event) {
    const target = e.target as HTMLInputElement
    console.log(target)
    if (target.files?.length) handleFiles(target.files)
    target.value = ''
  }

  const handleFiles = (fileList: FileList) => {
    const files = Array.from(fileList)
    console.log(files)
    for (let file of files) {
      const id = crypto.randomUUID()
      const typeOk = props.accept.includes(file.type)
      const sizeOk = file.size <= props.maxSizeMB * 1024 * 1024
      const previewUrl = URL.createObjectURL(file)
      const base: LocalImage = {
        id,
        file,
        previewUrl,
        uploading: false,
        progress: 0
      }
      if (!typeOk) {
        items.value.push({ ...base, error: 'Invalid file type' })
      }
      if (!sizeOk) {
        items.value.push({ ...base, error: `File too large (> ${props.maxSize}MB) ` })
      }
    }
    items.value.push(base)
  }

  function removeItem(id: string) {
    const idx = items.value.findIndex((item) => item.id === id)
    if (idx >= 0) {
      URL.revokeObjectURL(items.value[idx].previewUrl)
      items.value.splice(idx, 1)
    }
  }

  async function uploadAllFiles() {
    const toUpload = items.value.filter((item) => !item.uploadedUrl && !item.error)
    const uploadedMeta: { id: string; url: string; name: string }[] = []
    for (let item of toUpload) {
      try {
        item.uploading = true
        const url = await uploadFile(item.file)
        item.uploadedUrl = url
        uploadedMeta.push({ id: item.id, url, name: item.file.name })
      } catch (e) {
        item.error = 'Failed to upload-url file'
        item.uploading = false
      } finally {
        item.uploading = false
      }
    }
    if (uploadedMeta.length) emit('uploaded', uploadedMeta)
  }

  function uploadFile(file: File): Promise<string> {
    try {
      const url = await uploadToS3(file, (p) => {
        onProgress?.(Math.round(p))
      })
      return url
    } catch (e) {
      throw new Error((err as Error)?.message || 'Failed to upload file')
    }
  }

  async function uploadToS3(file: File, onProgress: (p: number) => void) {
    const { uploadUrl, fileUrl } = await $fetch<{
      uploadUrl: string
      fileUrl: string
    }>('api/upload-url', {
      params: { name: file.name, type: file.type }
    })

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', uploadUrl, true)
      xhr.setRequestHeader('Content-Type', file.type)
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          onProgress(progress)
        }
      }
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve()
        } else {
          reject(new Error('Failed to upload file to S3'))
        }
      }
      xhr.onerror = () => {
        reject(new Error('Failed to upload file to S3'))
      }
      xhr.send(file)
    })
    return fileUrl
  }

  const hasValid = computed(() => items.value.some((item) => !item.error && !item.uploadedUrl))
  const hasItems = computed(() => items.value.length > 0)
  onBeforeMount(() => {
    for (let item of items.value) URL.revokeObjectURL(item.previewUrl)
  })
  watchEffect(() => {
    console.log(items.value)
  }, [hasItems])
</script>

<template>
  <div class="space-y-4">
    <div v-if="hasItems">
      <div class="grid grid-flow-col grid-cols-12">
        <div
          v-for="item in items"
          :key="item.name"
          class="group relative col-span-2 overflow-hidden rounded-xl border bg-card"
        >
          <img
            :alt="item.file.name"
            :src="item.previewUrl"
            class="h-44 w-full object-cover"
            loading="lazy"
          />
          <div
            class="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition group-hover:opacity-100"
          >
            <button
              class="rounded-full bg-white p-2 shadow hover:bg-gray-100"
              type="button"
              @click="previewImage = URL.createObjectURL(f)"
            >
              <ViewIcon :iconClass="'text-gray-700 h-4 w-4'" />
            </button>
            <button
              class="flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none"
              type="button"
              @click="removeItem(item.id)"
            >
              <span class="sr-only">Remove</span>
              <TrashIcon name="trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="dragging ? 'border-foreground bg-muted/40' : 'border-border'"
      aria-label="Image uploader dropzone"
      class="relative w-full cursor-pointer rounded-2xl border border-dashed p-8 text-center transition hover:border-foreground/30 hover:bg-muted/40 dark:hover:bg-muted/30"
      role="button"
      tabindex="0"
      @click="selectFile"
      @dragleave="onDragLeave"
      @dragover="onDragOver"
      @drop="onDrop"
    >
      <input
        ref="inputRef"
        :multiple="multiple"
        accept="image/*"
        class="hidden"
        type="file"
        @change="onChoose"
      />
      <div class="mx-auto max-w-md space-x-2">
        <p class="text-base font-medium">Drag & drop images here</p>
        <p class="text-muted-foreground text-sm">or click to browse ({{ maxSizeMB }}MB max each)</p>
        <div class="mt-4">
          <BaseBtn label="Choose files" type="button" @click.stop.prevent="selectFile" />
        </div>
      </div>
    </div>
    <div
      v-if="previewImage"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div class="relative w-full max-w-3xl px-4">
        <img :src="previewImage" alt="preview" class="mx-auto max-h-[80vh] rounded-lg" />
        <button
          class="absolute right-2 top-2 rounded-full bg-white p-2 shadow"
          @click="previewImage = null"
        >
          <CloseIcon icon-class="text-gray-700 h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
