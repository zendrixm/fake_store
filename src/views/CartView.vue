<template>
  <AddToCartSection
    :products="products"
    @handleQuantityChange="handleQtyChange"
    @removeProduct="handleRemove"
    @selectionChange="handleSelected"
  />
</template>

<script setup lang="ts">
/**
 * NOTE: This page is using a hardcoded user ID (user/2) for API calls to allow cart development
 * without a login system. This setup is temporary and will be refactored once authentication is implemented.
 *
 * TODO:
 * - Replace hardcoded user ID with actual authenticated user once login/signup is built.
 * - Move cart-related API calls to a dedicated Pinia store for better reusability and separation of concerns.
 */

import { ref, onMounted } from 'vue'
import type { CartProduct } from '@/types/ProductContext'
import axios from 'axios'
import AddToCartSection from '@/components/sections/AddToCartSection.vue'

const products = ref<CartProduct[]>([])
const selectedProductIds = ref<number[]>([])

const fetchCart = async () => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/carts/user/2')
    const latestCart = data[data.length - 1]

    const productDetails = await Promise.all(
      latestCart.products.map((item: { productId: number; quantity: number }) =>
        axios.get(`https://fakestoreapi.com/products/${item.productId}`),
      ),
    )

    products.value = productDetails.map((res, index) => {
      const item = latestCart.products[index]
      return {
        id: res.data.id,
        title: res.data.title,
        price: res.data.price,
        image: res.data.image,
        quantity: item.quantity,
      }
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
  }
}

onMounted(fetchCart)

const handleSelected = (ids: number[]) => {
  selectedProductIds.value = ids
}

const handleQtyChange = (val: number, row: CartProduct) => {
  row.quantity = val
}

const handleRemove = (id: number) => {
  products.value = products.value.filter((p) => p.id !== id)
  selectedProductIds.value = selectedProductIds.value.filter((pid) => pid !== id)
}
</script>
