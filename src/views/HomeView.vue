<template>
  <ProductList :products="dummyProducts" />
</template>

<script setup lang="ts">
import ProductList from '@/components/ProductList.vue'
import { computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/DummyProductStore'

const store = useProductStore()
const dummyProducts = computed(() => store.getDummyProduct)

onMounted(async () => {
  await store.fetchAllProducts()
})
</script>
