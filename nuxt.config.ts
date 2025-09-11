// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ['@dnd-kit/core']
    }
  },
  nitro: {
    replace: {
      'import * as process': 'import * as processUnsed'
    },
    experimental: {
      websocket: true
    }
  },
  components: [
    {
      path: './components',
      pathPrefix: false
    }
  ],
  nodemailer: {
    from: '"Giahanmall shop" <noreply@app.com>',
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASSWORD
    }
  },
  runtimeConfig: {
    JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    DATABASE_URL: process.env.DATABASE_URL
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    'nuxt-nodemailer',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-swiper'
  ],
  css: ['@/assets/css/main.css'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  tailwindcss: {
    exposeConfig: true
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  plugins: ['@/plugins/gsap.client.ts', '~/plugins/vue-quill.client.ts']
})
