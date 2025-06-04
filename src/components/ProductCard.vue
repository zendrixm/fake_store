<template>
  <router-link :to="`/product/${product.id}`" class="product-view">
    <el-card class="product-card">
      <div class="product-content">
        <img class="product-image" :src="product.image" :alt="product.title" />

        <div class="v-spacer-20" />

        <div>
          <h2 class="product-title">{{ product.title }}</h2>
        </div>

        <div class="price-wrapper">${{ product.price }}</div>
      </div>
    </el-card>
  </router-link>
</template>

<script setup lang="ts">
defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
  isRateVisible: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_product.scss' as product;
@use '@/assets/styles/_utilities.scss' as utilities;

@include product.spacers;

.product-view {
  text-decoration: none;
  .el-card {
    &.product-card {
      height: auto;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      @include utilities.flexbox(column);
      .el-card__body {
        padding: 10px;
      }
      @include breakpoint.xs {
        padding: 20px;
      }
      .product-content {
        @include utilities.flexbox(column);
        height: 100%;
        @include breakpoint.xs {
          border: 1px solid #e5e5e5;
          padding: 20px;
          border-radius: 10px;
        }
        .product-image {
          @include utilities.flexbox();
          margin: 0 auto;
          height: 220px;
          width: 180px;
          @include breakpoint.xs {
            height: 140px;
            width: 120px;
          }
        }
        .product-title {
          font-size: 18px;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0px;
          height: 45px;
          @include breakpoint.xs {
            font-size: 14px;
            -webkit-line-clamp: 3;
            overflow: visible;
          }
          &h2 {
            text-decoration: none !important;
          }
        }
        .price-wrapper {
          font-weight: bold;
          font-size: 18px;
          color: #00549a;
          text-align: left;
          margin-top: 10px;
          @include breakpoint.xs {
            font-size: 14px;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
