<script stepup></script>

<template>
  <header class="absolute top-0 z-10 w-full bg-transparent mx-auto py-4 px-[42px]">
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
