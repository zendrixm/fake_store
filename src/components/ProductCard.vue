<template>
  <router-link :to="`/product/${product.id}`" class="product-view">
    <el-card class="product-card">
      <div class="product-content">
        <img class="product-image" :src="product.image" :alt="product.title" />

        <div class="v-spacer-20" />

        <div>
          <h2 class="product-title">{{ product.title }}</h2>

          <el-row v-if="isRateVisible" align="middle" class="rating-section">
            <el-rate
              :model-value="product.rating.rate"
              disabled
              show-score
              :max="5"
              :colors="['#F7BA2A', '#F7BA2A', '#F7BA2A']"
              style="font-size: 16px"
            />
            <el-divider direction="vertical" />
            <span>({{ product.rating.count }} reviews)</span>
          </el-row>
        </div>
        <div v-if="!isRateVisible" class="spacer-15" />

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

.el-card {
  &.product-card {
    height: auto;
    padding: 20px;
    margin-bottom: 10px 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    .el-card__body {
      padding: 10px;
    }
    @include breakpoint.xs {
      padding: 20px;
    }
  }
}

.product-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  @include breakpoint.xs {
    border: 1px solid #e5e5e5;
    padding: 20px;
    border-radius: 10px;
  }
}

.product-image {
  display: flex;
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
  }
}

.rating-section {
  font-size: 14px;
}

.price-wrapper {
  font-weight: bold;
  font-size: 18px;
  color: #00549a;
  text-align: left;
  margin-top: 10px;
  @include breakpoint.xs {
    font-size: 14px;
  }
}

.v-spacer-20 {
  height: 20px;
}

a.product-view {
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    .product-card {
      border: 2px solid #00549a;
    }
  }
}

.product-card {
  border: 1px solid transparent;
  margin-bottom: 20px;
}
</style>
