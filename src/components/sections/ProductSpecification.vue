<template>
  <div class="v-spacer-30" />
  <el-row v-for="(item, index) in productSpecification" :key="index" align="middle">
    <el-col :md="6" :xs="24">
      <el-text class="txtSize16 font-weight-bold">{{ item.label }}</el-text>
    </el-col>
    <el-col :md="6" :xs="24">
      <el-text class="txtSize16">{{ item.value }}</el-text>
    </el-col>
    <el-col :span="24" v-if="item.showDivider !== false">
      <el-divider direction="horizontal" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { ProductSpecification } from '@/types/ProductContext'
defineProps({
  productSpecification: {
    type: Array as PropType<ProductSpecification[]>,
    default: (): ProductSpecification[] => [],
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_product.scss' as product;

@include product.fontWeights;
@include product.fontSizes;
</style>
