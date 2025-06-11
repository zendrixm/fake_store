<template>
  <div class="product-view-wrapper">
    <div v-if="showTitle" class="product-heading-container">
      <el-text class="txtSize18 txtBlack font-weight-bold">
        {{ title }}
      </el-text>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_product.scss' as product;

@include product.fontColors;
@include product.fontWeights;
@include product.fontSizes;

.product-view-wrapper {
  max-width: 1200px;
  padding: 30px;
  margin: 0 auto;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  @include breakpoint.xs {
    padding: 15px;
  }
  .product-heading-container {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 15px;
  }
}
</style>
