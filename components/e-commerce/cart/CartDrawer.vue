<script lang="ts" setup>
  import type { ICartData } from '~/types/cart'
  import DrawerCustom from '~/components/ui/shared/DrawerCustom/DrawerCustom.vue'

  const props = defineProps<{
    cartData: {
      type: Array<ICartData>
      default: () => []
    }
    open: {
      type: boolean
      default: false
    }
    router: {
      type: object
      required: true
    }
  }>()
</script>

<template>
  <DrawerCustom v-model:model-value="props.open" side="right" title="Cart" width="w-[400px]">
    <template #default>
      <div>
        <CartCard :cart-data="props?.cartData" />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-col gap-4">
        <div>
          <BaseBtn
            btn-class="bg-[#8B4513] rounded-0 w-full text-white text-center text-lg font-lato uppercase font-normal"
            label="View To Cart"
            @click="props.router.push('/cart')"
          />
        </div>
        <div>
          <BaseBtn
            btn-class="bg-[#8B4513] rounded-0 w-full text-white text-center text-lg font-lato uppercase font-normal"
            label="Check Out"
            @click="props.router.push('/checkout')"
          />
        </div>
      </div>
    </template>
  </DrawerCustom>
</template>

<style scoped></style>
