<template>
  <div class="flex min-h-screen flex-col">
    <div id="thankyou-page-logo" class="container mx-auto mt-12 px-[42px]">
      <Logo />
    </div>
    <main class="container mx-auto flex flex-1 items-center px-[42px]" role="main" tabindex="-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
  useHead({
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;@700&family=Inter:wght@400;500&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap'
      }
    ]
  })
</script>
