<script setup>
const props = defineProps(["error"]);
</script>

<template>
  <div :class="{ error: props.error.length }">
    <slot />
    <div class="input-error" v-for="error in props.errors" :key="error.$uid">
      <div class="error-msg" style="color: red; font-weight: bold">
        {{ error.message }}
      </div>
    </div>
  </div>
</template>
