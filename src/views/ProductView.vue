<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { ShoppingCart } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/FakeProductStore'
import { ElMessage } from 'element-plus'

import type { Product } from '@/types/ProductContext'

const route = useRoute()
const store = useProductStore()
const product = computed(() => store.product as Product)

const isLoading = ref(false)
const quantity = ref(1)

const userId = ref(2) // Replace with value from auth store when ready

const handleAddToCart = async () => {
  if (!store.isCartFetched) {
    await store.fetchCart(userId.value)
  }

  if (product.value) {
    await store.addToCartAndSync(userId.value, product.value, quantity.value)
    ElMessage.success('Added to cart!')
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    if (route.params.id) {
      await store.fetchProduct(Number(route.params.id))
    }
  } catch (err) {
    console.error('Error fetching product details', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-loading="isLoading" element-loading-text="Loading... Please wait">
    <div class="product-view-wrapper">
      <el-row v-if="product">
        <el-col :md="10" class="image-column">
          <img :src="product.image" :alt="product.title" class="product-image" />
        </el-col>

        <el-col :md="14" class="info-column">
          <h1>{{ product.title }}</h1>
          <el-text>{{ product.description }}</el-text>

          <el-row v-if="product.rating" align="middle" class="rating-section">
            <el-rate
              :model-value="product.rating.rate"
              disabled
              show-score
              :max="5"
              :colors="['#F7BA2A', '#F7BA2A', '#F7BA2A']"
              class="rating-stars"
            />
            <el-divider direction="vertical" />
            <span class="txtSize14">{{ product.rating.count }} Sold</span>
          </el-row>

          <p class="txtBlue txtBold txtSize18">${{ product.price }}</p>

          <!-- Quantity Selector -->
          <el-row align="middle" class="v-spacer-15 quantity-row">
            <span class="qty-label"><strong>Quantity:</strong></span>
            <el-input-number v-model="quantity" :min="1" :max="100" size="small" />
          </el-row>

          <div class="v-spacer-20" />

          <!-- Action Buttons -->
          <div class="action-buttons">
            <el-button class="btn-secondary" @click="handleAddToCart">
              <el-icon :size="20" color="#134074" class="icon-align">
                <ShoppingCart />
              </el-icon>
              <span>Add to Cart</span>
            </el-button>

            <el-button class="btn-solid-primary">Buy Now</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;

.product-view-wrapper {
  max-width: 1200px;
  padding: 0;
  margin: 0px auto;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  background-color: #fff;

  .product-image {
    width: 180px;
    height: 220px;
    @include breakpoint.xs {
      padding: 30px 0px 0px;
    }
    @include breakpoint.sm {
      padding: 30px 0px 0px;
    }
    @include breakpoint.lg {
      padding: 0px;
    }
  }
}

.image-column {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-column {
  padding: 20px 30px 30px;
}

.qty-label {
  margin-right: 10px;
}

.icon-align {
  vertical-align: middle;
}

.rating-stars {
  font-size: 16px;
}

.txtSize14 {
  font-size: 14px;
}

.txtSize18 {
  font-size: 18px;
}

.txtBlue {
  color: #00549a;
}

.txtBold {
  font-weight: bold;
}

.v-spacer-15 {
  height: 15px;
  margin-top: 10px;
}

.v-spacer-20 {
  height: 20px;
}

.action-buttons {
  margin-top: 30px;
  display: flex;
  gap: 12px;
  .el-button + .el-button {
    @include breakpoint.xs {
      flex-direction: column;
      margin-left: 0px;
    }
  }
  @include breakpoint.xs {
    flex-direction: column;
  }
}

.btn-secondary {
  background: transparent;
  border: 1px solid #134074;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
  color: #134074;
  padding: 15px;

  &:hover {
    background: #8da9c4 !important;
    border: 1px solid #8da9c4;
    color: #134074 !important;
  }
}

.btn-solid-primary {
  background: #134074;
  border: 1px solid #134074;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
  color: #fff;
  padding: 15px;

  &:hover {
    background: #8da9c4;
    border: 1px solid #8da9c4;
    color: #fff;
  }
}
</style>

<style lang="scss">
.product-view-wrapper {
  .el-input-number {
    .el-input__inner {
      color: #134074;
      font-size: 14px;
    }
  }
}
</style>
