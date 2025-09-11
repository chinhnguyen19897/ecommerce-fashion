<template>
  <Select :id="id" :name="name">
    <SelectTrigger :class="classTrigger">
      <SelectValue :placeholder="placeholder" class="placeholder:text-[#B4B4B4]" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="item in dataSelect" :key="item.value" :value="item.value">
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup>
  defineProps({
    id: {
      type: String,
      default: 'select'
    },
    name: {
      type: String,
      default: 'select'
    },
    classTrigger: {
      type: String,
      default: 'w-full h-[35px] rounded-[5px] border-[1px] border-gray-300 bg-white px-2 text-sm'
    },
    placeholder: {
      type: String,
      default: 'Select'
    },
    dataSelect: {
      type: Array,
      default: () => []
    }
  })
</script>
