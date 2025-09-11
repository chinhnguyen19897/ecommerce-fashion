import { useHeaders } from '~/utils/http-headers'

// Remove the import and declaration for NuxtApp from @nuxt/types
// import type { NuxtApp } from '@nuxt/types'

// Instead, extend the global NuxtApp interface
declare module '#app' {
  interface NuxtApp {
    $isAuthenticated: (error: unknown) => void
  }
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  const { $isAuthenticated } = nuxtApp
  const headers = useHeaders()

  try {
    const fromAdminLayout = from?.meta?.layout
    const toAdminLayout = to?.meta?.layout
    if (fromAdminLayout === 'admin' || toAdminLayout === 'admin') {
      const { error: authenticatedError } = await useFetch('/api/admin/isAuthenticated', {
        headers: {
          ...headers
        }
      })
      $isAuthenticated(authenticatedError)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log('An unknown error occurred')
    }
  }
})
