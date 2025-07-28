<template>
  <div class="relative flex items-center max-w-[135px] w-full">
    <input
        :aria-label="ariaLabel"
        :max="max"
        :min="min"
        :v-model="valueDefault"
        :value="modelValue"
        class="w-full appearance-none text-xl text-[#3E3E3E] font-lato font-light g-transparent h-[50px] text-center outline-none border border-[#3E3E3E]"
        type="number"
        @change="(event) => onChange(event)"
    />
    <div class="absolute flex items-center inset-y-0 end-0 ps-1">
      <button class="px-2" @click="increse">
        <PlusIcon/>
      </button>
    </div>
    <div class="absolute flex items-center inset-y-0 start-0 ps-1">
      <button class="px-2" @click="decrese">
        <MinusIcon/>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "valueDefault",
  "min",
  "max",
  "modelValue",
  "ariaLabel",
]);
const emit = defineEmits(["update:modelValue"]);

const onChange = (e) => {
  console.log(e);
  emit("update:modelValue", e.target.value);
};
const increse = () => {
  if (props.modelValue < props.max) {
    emit("update:modelValue", props.modelValue + 1);
  }
};
const decrese = () => {
  if (props.modelValue > props.min) {
    emit("update:modelValue", props.modelValue - 1);
  }
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
