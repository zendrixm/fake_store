<template>
  <router-link :to="`/product/${product.id}`" class="product-view">
    <el-card class="product-card">
      <div class="product-content">
        <div>
          <img class="product-image" :src="product.thumbnail" :alt="`${product.title}`" />
          <div class="v-spacer-10" />

          <h6 class="product-title">{{ product.title }}</h6>
          <el-text class="product-description">{{ product.description }}</el-text>
        </div>
        <div>
          <div class="price-wrapper">
            <div class="price-original font-weight-bold">
              ${{ computeOriginalPrice(product.price, product.discountPercentage) }}
            </div>
            <div class="price-discount">{{ product.discountPercentage.toFixed(2) }}%</div>
          </div>
          <div class="v-spacer-5" />
          <div class="flex-space-between">
            <div class="price-unit">${{ product.price }}</div>
            <el-icon class="wishlist-icon">
              <Heart :size="20" color="#FF0000" class="icon-align" title="Heart" />
            </el-icon>
          </div>
        </div>
      </div>
    </el-card>
  </router-link>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'

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

const computeOriginalPrice = (price: number, discountPercentage: number): number => {
  return +(price / (1 - discountPercentage / 100)).toFixed(2)
}
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_product.scss' as product;
@use '@/assets/styles/_utilities.scss' as utilities;

@include product.spacers;
@include product.fontWeights;
@include product.flex;

.product-view {
  text-decoration: none;
  .el-card {
    &.product-card {
      height: 350px;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      @include utilities.flexbox(column);
      .el-card__body {
        padding: 0px 10px;
        height: 100%;
      }
      @include breakpoint.xs {
        padding: 10px 0px;
        margin-bottom: 10px;
        height: 320px;
      }
      .product-content {
        @include utilities.flexbox(column, space-between);
        height: 100%;
        @include breakpoint.xs {
          border: 1px solid #e5e5e5;
          padding: 10px;
          border-radius: 10px;
        }
        .product-image {
          @include utilities.flexbox();
          margin: 0 auto;
          height: 170px;
          width: 170px;
          @include breakpoint.xs {
            height: 120px;
            width: 100px;
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
          height: auto;
          @include breakpoint.xs {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            width: auto;
          }
          &h6 {
            text-decoration: none !important;
          }
        }
        .product-description {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          width: auto;
        }
        .price-wrapper {
          margin-top: 10px;
          @include utilities.flexbox(row, null, center, 10px);
          .price-original {
            text-decoration: line-through;
          }
          .price-discount {
            background-color: red;
            padding: 5px;
            color: #fff;
            border-radius: 5px;
          }
        }
        .price-unit {
          font-weight: bold;
          font-size: 18px;
          color: #00549a;
          text-align: left;
          @include breakpoint.xs {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.el-carousel__container {
  height: 170px !important;
}
.el-carousel__arrow {
  width: 24px !important;
  height: 24px !important;
  background-color: transparent;
  color: #0b2545;
  border: 1px solid #0b2545;
}
.el-carousel__indicator--horizontal {
  padding: 10px 2px;
}

.wishlist-icon {
  cursor: pointer;
  font-size: 20px;
  color: #888;
  transition: color 0.2s;

  &:hover {
    color: #e74c3c;
  }
}
</style>
