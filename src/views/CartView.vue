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
import type { CartProduct } from '@/types/ProductContext'
import { useProductStore } from '@/stores/FakeProductStore'
import AddToCartSection from '@/components/sections/AddToCartSection.vue'

const selectedProductIds = ref<number[]>([])
// TEMP: Replace with dynamic user ID from auth later
const userId = 2
const productStore = useProductStore()
const cartList = computed(() => productStore.cartList)

const handleSelected = (ids: number[]) => {
  selectedProductIds.value = ids
}

const handleQtyChange = (val: number, row: CartProduct) => {
  row.quantity = val
}

const handleRemove = async (id: number) => {
  selectedProductIds.value = selectedProductIds.value.filter((pid) => pid !== id)
  await productStore.removeFromCartAndSync(userId, id)
}

onMounted(() => {
  productStore.fetchCart(userId)
})
</script>
