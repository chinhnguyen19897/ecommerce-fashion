// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  ssr: true,
  devtools: {enabled: true},
  nitro: {
    replace: {
      "import * as process": "import * as processUnsed",
    },
    experimental: {
      websocket: true,
    },
  },
  components: [
    {
      path: "./components",
      pathPrefix: false,
    },
  ],
  nodemailer: {
    from: '"Giahanmall shop" <noreply@app.com>',
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASSWORD,
    },
  },
  runtimeConfig: {
    JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  tailwindcss: {exposeConfig: true},
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-nodemailer",
    "@nuxt/image",
    '@nuxt/icon',
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});

