<script setup>
const props = defineProps(["errors"]);
</script>

<template>
  <div :class="{ error: props?.errors?.length }">
    <slot />
    <div v-for="error in props.errors" :key="error.$uid" class="input-error">
      <div class="error-msg" style="color: red; font-weight: bold">
        {{ error.$message }}
      </div>
    </div>
  </div>
</template>
