<template>
  <div :style="{ maxWidth: maxWidth }" class="relative flex w-full items-center">
    <input
      :aria-label="ariaLabel"
      :max="max"
      :min="min"
      :v-model="valueDefault"
      :value="modelValue"
      :class="['w-full appearance-none border text-center outline-none', inputClass]"
      type="number"
      @change="(event) => onChange(event)"
    />
    <div class="absolute inset-y-0 end-0 flex items-center ps-1">
      <button class="px-2" @click="increse">
        <PlusIcon :icon-class="iconClass" />
      </button>
    </div>
    <div class="absolute inset-y-0 start-0 flex items-center ps-1">
      <button class="px-2" :iconClassMinus="iconClassMinus" @click="decrese">
        <MinusIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps([
    'valueDefault',
    'min',
    'max',
    'modelValue',
    'ariaLabel',
    'maxWidth',
    'inputClass',
    'iconClass',
    'iconClassMinus'
  ])
  const emit = defineEmits(['update:modelValue'])

  const onChange = (e) => {
    console.log(e)
    emit('update:modelValue', e.target.value)
  }
  const increse = () => {
    if (props.modelValue < props.max) {
      emit('update:modelValue', props.modelValue + 1)
    }
  }
  const decrese = () => {
    if (props.modelValue > props.min) {
      emit('update:modelValue', props.modelValue - 1)
    }
  }
</script>

<style scoped>
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
