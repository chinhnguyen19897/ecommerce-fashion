<script lang="ts" setup>
  import CategoryIcon from '~/components/icons/CategoryIcon.vue'
  import DashboardIcon from '~/components/icons/DashboardIcon.vue'
  import PaymentIcon from '~/components/icons/PaymentIcon.vue'
  import ProductIcon from '~/components/icons/ProductIcon.vue'
  import UserIcon from '~/components/icons/UserIcon.vue'

  const userCookie = useCookie('user', userCookieSettings)

  const drawerOpen = ref(true)
  const showMenu = ref(false)

  const headers = useHeaders()

  const links = ref([
    {
      menu: 'Dashboard',
      icon: DashboardIcon,
      link: '/admin/dashboard'
    },
    {
      menu: 'Categories',
      icon: CategoryIcon,
      link: '/admin/categories'
    },
    {
      menu: 'Product',
      icon: ProductIcon,
      link: '/admin/products'
    },
    {
      menu: 'Payments',
      icon: PaymentIcon,
      link: '/admin/payments'
    },
    {
      menu: 'Users',
      icon: UserIcon,
      link: '/admin/users'
    }
  ])

  function toggleDrawer() {
    drawerOpen.value = !drawerOpen.value
  }

  const { $logout } = useNuxtApp()
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!--- Sidebar Drawer --->
    <aside
      :class="[
        'flex h-full flex-col bg-[#1C2536] shadow-lg transition-all duration-300',
        drawerOpen ? 'w-59' : 'w-16'
      ]"
    >
      <div class="flex items-center justify-between border-b px-4 py-3">
        <span v-if="drawerOpen" class="text-xl font-bold"> Dashboard </span>
        <button
          class="rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring"
          @click="toggleDrawer"
        >
          <svg
            v-if="drawerOpen"
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
          <svg
            v-else
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6h16M4 12h16M4 18h7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>
      <nav class="mt-4 flex-1 space-y-2">
        <nuxtLink
          v-for="menu in links"
          :key="menu"
          :to="menu.link"
          class="text-gray-700 flex items-center gap-4 px-4 py-2 hover:bg-gray-100"
        >
          <component :is="menu.icon" />

          <span v-if="drawerOpen">{{ menu.menu }}</span>
        </nuxtLink>
      </nav>
    </aside>

    <!-- MainContent -->
    <div class="flex flex-1 flex-col">
      <header class="flex items-center justify-between bg-white px-6 py-3 shadow">
        <h1 class="text-lg font-semibold">Welcome Back!</h1>
        <div class="relative" @click="showmenu = !showmenu">
          <img
            alt="avatar"
            class="h-10 w-10 cursor-pointer rounded-full ring-2 ring-gray-300"
            src="https://i.pravatar.cc/150?img=3"
          />
          <transition name="fade">
            <div v-if="showmenu" class="absolute">
              <div class="border-b p-4">
                <p class="font-semibold">
                  {{ userCookies?.data?.user?.name }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ userCookies?.data?.user?.email }}
                </p>
              </div>
              <ul>
                <li @click="$logout()">
                  <a class="text-red-500 block px-4 py-2 hover:bg-gray-100" href="#">Logout</a>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto bg-white p-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .router-link-exact-active:hover {
    color: white;
  }

  .router-link-exact-active {
    --tw-bg-opacity: 1;
    background-color: rgb(59 130 246) /* #4338ca */;
    font-weight: 600;
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
    padding-left: 0.5rem /* 8px */;
    padding-right: 0.5rem /* 8px */;
    /* border-radius: 0.375rem  */
    color: white;
    cursor: pointer;
  }
</style>
