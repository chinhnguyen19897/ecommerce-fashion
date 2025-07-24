<script setup>
const inputValue = ref("");
function handleChangeInput(e) {
  inputValue.value = e.target.value;
}
</script>

<template>
  <div class="relative w-[214px]">
    <div class="bg-[#FAFAFA absolute z-10 left-2 top-1/2 -translate-y-1/2">
      <SearchIcon />
    </div>
    <input
      class="pl-8 bg-[#FAFAFA] py-1 w-full placeholder:text-[#B6B6B6] placeholder:text-sm focus:outline-none text-gray-800"
      name="search"
      id="input-search"
      :value="inputValue"
      @change="handleChangeInput"
      placeholder="Search"
    />
  </div>
</template>
