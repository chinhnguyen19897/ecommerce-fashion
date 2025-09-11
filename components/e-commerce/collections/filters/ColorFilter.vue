<template>
  <div
    :class="[
      'flex cursor-pointer items-center justify-between px-3 py-4 font-semibold leading-none hover:bg-[#E8E1D3]',
      isOpened ? 'bg-[#E8E1D3]' : ''
    ]"
    @click="isOpened = !isOpened"
  >
    <span>{{ filterTitle }}</span>
    <Icon
      name="ion:chevron-down-outline"
      class="transform transition-transform duration-300 ease-in-out"
      :class="isOpened ? 'rotate-0' : '-rotate-90'"
    />
  </div>
  <div
    v-show="isOpened"
    class="swatches custom-scrollbar mb-3 mr-6 mt-3 grid max-h-[323px] gap-1.5 overflow-auto"
  >
    <div v-for="color in colors" :key="color" :style="{ '--color': color }" :title="color">
      <input
        :id="color"
        class="hidden"
        type="checkbox"
        :value="color"
        @change="checkboxChanged(color)"
      />
      <label :for="color" class="m-0 cursor-pointer"></label>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['colors'])

  const selectedColors = ref([])
  const filterTitle = ref('Color')
  const isOpened = ref(true)

  const emit = defineEmits(['fetchProducts'])

  const checkboxChanged = (color) => {
    const colorExist = selectedColors.value.some((c) => c === color)
    if (colorExist) {
      const filterArr = selectedColors.value.filter((c) => c !== color)
      selectedColors.value = filterArr
      emit('fetchProducts', selectedColors.value)
    } else {
      selectedColors.value.push(color)
      emit('fetchProducts', selectedColors.value)
    }
  }
</script>

<style scoped lang="postcss">
  .swatches {
    grid-template-columns: repeat(auto-fit, minmax(24px, 1fr));
  }

  .swatches label {
    @apply relative m-0 mb-1 block w-full cursor-pointer rounded-md shadow-sm;
    background-color: var(--color, #eee);
    filter: saturate(0.75);
    aspect-ratio: 1/1;
    transition: all 0.2s ease;
  }

  .swatches label:hover,
  .swatches input:checked + label {
    filter: saturate(1);
  }

  /* tick */
  .swatches input:checked + label::after {
    content: '';
    width: 25%;
    height: 40%;
    border-right: 2.5px solid #fff;
    border-bottom: 2.5px solid #fff;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  /* Make tick black if the color is white */
  .swatches input:checked + label[for='white']::after,
  .swatches input:checked + label[for='yellow']::after {
    border-color: #666;
  }
</style>
