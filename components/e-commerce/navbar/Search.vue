<script setup>
  const inputValue = ref('')
  function handleChangeInput(e) {
    inputValue.value = e.target.value
  }
</script>

<template>
  <div class="relative w-[214px]">
    <div class="bg-[#FAFAFA absolute left-2 top-1/2 z-10 -translate-y-1/2">
      <SearchIcon />
    </div>
    <input
      id="input-search"
      class="w-full bg-[#FAFAFA] py-1 pl-8 text-gray-800 placeholder:text-sm placeholder:text-[#B6B6B6] focus:outline-none"
      name="search"
      :value="inputValue"
      placeholder="Search"
      @change="handleChangeInput"
    />
  </div>
</template>
