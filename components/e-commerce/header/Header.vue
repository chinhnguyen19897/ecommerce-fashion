<script lang="ts" setup>
  const props = defineProps<{
    extraTopPadding?: boolean
  }>()
</script>

<template>
  <header
    :class="[
      'mx-auto px-[42px] py-4',
      props.extraTopPadding
        ? 'text-white absolute top-0 z-10 w-full bg-transparent'
        : 'bg-white text-primary'
    ]"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start">
        <Logo />
      </div>
      <div class="flex items-center justify-center">
        <MenuItems />
      </div>
      <div class="flex items-center justify-end">
        <ClientOnly>
          <div class="flex items-center gap-3">
            <Search />
            <SignInLink />
            <Cart />
          </div>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
