<script lang="ts" setup>
  const props = defineProps<{
    extraTopPadding?: boolean
  }>()
</script>

<template>
  <footer
    :class="[
      'text-white relative z-0 bg-[#8B4513]',
      props.extraTopPadding ? '-mt-16 pb-12 pt-28 md:-mt-60 md:pt-60' : 'py-12'
    ]"
  >
    <div class="container mx-auto px-12 py-[42px] text-[#fff]">
      <div class="grid grid-cols-12">
        <div class="col-span-4">
          <InformationFooter />
        </div>
        <div class="col-span-8">
          <div class="grid grid-cols-12">
            <MenuFooter />
            <CustomerSupport />
            <AccountFooter />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
