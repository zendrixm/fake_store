<template>
  <AddToCartSection
    :products="cartList"
    @handleQuantityChange="handleQtyChange"
    @removeProduct="handleRemove"
    @selectionChange="handleSelected"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CartItem } from '@/types/ProductContext'
import { useCartStore } from '@/stores/CartStore'
import { useAuthUserStore } from '@/stores/UserStore'
import AddToCartSection from '@/components/sections/AddToCartSection.vue'

const selectedProductIds = ref<number[]>([])

const cartStore = useCartStore()
const authStore = useAuthUserStore()

const cartList = computed(() => {
  if (!cartStore.cart) {
    return {}
  }
  return cartStore.cart
})

const userId = computed(() => authStore.user?.id || 0)

const handleSelected = (ids: number[]) => {
  selectedProductIds.value = ids
}

const handleQtyChange = async ({ value, product }: { value: number; product: CartItem }) => {
  await cartStore.updateCartQuantity({ id: product.id, quantity: value })
}

const handleRemove = async (id: number) => {
  selectedProductIds.value = selectedProductIds.value.filter((pid) => pid !== id)
  await cartStore.removeProduct(id)
}

onMounted(async () => {
  await cartStore.fetchCart(userId.value)
})
</script>
