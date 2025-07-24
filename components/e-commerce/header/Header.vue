<script stepup></script>

<template>
  <header class="relative top-0 bg-white py-4 container mx-auto px-[42px]">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start">
        <Logo />
      </div>
      <div class="flex items-center justify-center">
        <MenuItems />
      </div>
      <div class="flex items-center justify-end">
        <ClientOnly>
          <div class="flex gap-3 items-center">
            <Search />
            <SignInLink />
            <Cart />
          </div>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
