// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  components: [
    {
      path: "./components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  modules: ["@nuxtjs/tailwindcss"],
});
