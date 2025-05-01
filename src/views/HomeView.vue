<template>
  <PageLayout @products-changed="handleProductDisplay">
    <!-- <DailyDiscoverSection /> -->
    <ProductList :products="productList" />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '@/layouts/PageLayout.vue'
//import DailyDiscoverSection from '@/components/DailyDiscoverSection.vue'
import ProductList from '@/components/ProductList.vue'

const productList = ref([])
const handleProductDisplay = (products: []) => {
  console.log('handleProductDisplay', products)
  productList.value = products
}
</script>

<style lang="scss">
.el-link {
  --el-link-hover-text-color: none;
}
</style>
