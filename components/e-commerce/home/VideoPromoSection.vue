<script lang="ts" setup>
  import { ref } from 'vue'
  import { Play } from 'lucide-vue-next'

  const isPlaying = ref(false)

  const thumbnailSrc = '/images/video-thumbnail.jpg'
  const videoSrc =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

  function playVideo() {
    isPlaying.value = true
  }
</script>

<template>
  <div class="w-full px-[42px]">
    <div class="w-full">
      <div class="relative overflow-hidden">
        <template v-if="!isPlaying">
          <img
            :src="thumbnailSrc"
            alt="Promotional video thumbnail"
            class="h-auto w-full cursor-pointer"
            @click="playVideo"
          />
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <button
              aria-label="Play video"
              class="flex h-20 w-20 items-center justify-center rounded-full bg-white transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              @click="playVideo"
            >
              <Play class="text-gray-900 h-10 w-10" fill="currentColor" />
            </button>
          </div>
        </template>
        <template v-else>
          <video :src="videoSrc" autoplay class="h-auto w-full" controls></video>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Additional scoped styles can be added here if needed. */
</style>
