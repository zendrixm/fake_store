<template>
  <el-card class="product-card">
    <div class="product-content">
      <div>
        <img
          class="product-image"
          :src="product.image"
          :alt="product.title"
          :width="180"
          :height="220"
        />
      </div>

      <div class="v-spacer-20" />

      <!-- TITLE and RATING are together -->
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
      <!-- 👇 PRICE always stuck at the bottom -->
      <div class="price-wrapper">${{ product.price }}</div>
    </div>
  </el-card>
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
.el-card {
  &.product-card {
    height: 380px; /* 🛠 Fixed card height */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
  }
}

.product-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-image {
  display: flex;
  margin: 0 auto;
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
}

.rating-section {
  font-size: 14px;
}

.price-wrapper {
  font-weight: bold;
  font-size: 20px;
  color: #f63;
  text-align: left;
  margin-top: 10px;
}

.v-spacer-20 {
  height: 20px;
}
</style>
