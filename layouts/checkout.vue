<template>
  <div class="flex flex-col min-h-screen">
    <main
      role="main"
      tabindex="-1"
      class="mt-12 flex-1 container mx-auto px-[42px]"
    >
      <slot />
    </main>
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;@700&family=Inter:wght@400;500&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap",
    },
  ],
});
</script>

<style scoped></style>
