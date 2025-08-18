<script lang="ts" setup>
  import type { ICartData } from '~/types/cart'
  import DrawerCustom from '~/components/ui/shared/DrawerCustom/DrawerCustom.vue'

  const props = defineProps<{
    cartData: {
      type: Array<ICartData>
      default: () => []
    }
    open: {
      type: Boolean
      default: false
    }
    router: {
      type: Object
      required: true
    }
  }>()
</script>

<template>
  <DrawerCustom v-model:modelValue="props.open" side="right" title="Cart" width="w-[400px]">
    <template #default>
      <div>
        <CartCard :cartData="props?.cartData" />
      </div>
    </template>
    <template v-slot:footer>
      <div class="flex flex-col gap-4">
        <div>
          <BaseBtn
            btnClass="bg-[#8B4513] rounded-0 w-full text-white text-center text-lg font-lato uppercase font-normal"
            label="View To Cart"
            @click="props.router.push('/cart')"
          />
        </div>
        <div>
          <BaseBtn
            btnClass="bg-[#8B4513] rounded-0 w-full text-white text-center text-lg font-lato uppercase font-normal"
            label="Check Out"
            @click="props.router.push('/checkout')"
          />
        </div>
      </div>
    </template>
  </DrawerCustom>
</template>

<style scoped></style>
