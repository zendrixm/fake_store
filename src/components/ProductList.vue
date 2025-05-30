<template>
  <el-row :gutter="20">
    <el-col v-for="product in products" :key="product.id" :md="8" :sm="12" :xs="24">
      <ProductCard :product="product" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '@/types/ProductContext'
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    default: () => [],
  },
})
</script>