<template>
  <ProductList :products="filteredProducts" />
</template>

<script setup lang="ts">
import ProductList from '@/components/ProductList.vue'
import { computed } from 'vue'
import { useProductStore } from '@/stores/FakeProductStore'

const store = useProductStore()

// Optional: If fetchProducts might not be called already
if (store.products.length === 0) {
  store.fetchProducts()
}

// Default view should show all products or apply filter logic again here
const filteredProducts = computed(() => store.filteredProducts)
</script>
