<template>
  <div class="v-spacer-30" />
  <el-row :gutter="10">
    <el-col v-for="product in products" :key="product.id" :md="6" :sm="8" :xs="12">
      <ProductCard :product="product" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { DummyProduct } from '@/types/ProductContext'
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array as PropType<DummyProduct[]>,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_product.scss' as product;

@include product.spacers;
</style>
