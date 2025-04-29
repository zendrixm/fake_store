<template>
  <div class="main-container">
    <el-row :span="24" :gutter="20">
      <el-col v-for="product in products" :key="product.id" :md="8" :xs="24">
        <ProductCard :product="product" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '@/types/ProductContext'
import ProductCard from './ProductCard.vue'

defineProps({
  categories: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  products: {
    type: Array as PropType<Product[]>,
    default: () => [],
  },
})
</script>

<style lang="scss">
.margin-t-20 {
  margin-top: 20px;
}
</style>
