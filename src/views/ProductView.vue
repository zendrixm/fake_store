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
  <div class="v-spacer-30" />
  <div v-loading="isLoading" element-loading-text="Loading... Please wait">
    <div class="product-view-wrapper">
      <div class="v-spacer-15" />
      <el-row v-if="product">
        <el-col :md="10" class="image-column">
          <img :src="product.image" :alt="product.title" class="product-image" />
        </el-col>

        <el-col :md="14" class="info-column">
          <h1>{{ product.title }}</h1>
          <div class="v-spacer-15" />
          <el-text>{{ product.description }}</el-text>
          <div class="v-spacer-15" />
          <el-row v-if="product.rating" align="middle">
            <el-rate
              :model-value="product.rating.rate"
              disabled
              show-score
              :max="5"
              :colors="['#F7BA2A', '#F7BA2A', '#F7BA2A']"
              class="txtSize16"
            />
            <el-divider direction="vertical" />
            <span class="txtSize14">{{ product.rating.count }} {{ $t('sold') }}</span>
          </el-row>

          <p class="txtBlue font-weight-bold txtSize18">${{ product.price }}</p>

          <!-- Quantity Selector -->
          <el-row align="middle" class="v-spacer-15">
            <span class="mar-r-10"
              ><strong>{{ $t('quantity') }}:</strong></span
            >
            <el-input-number v-model="quantity" :min="1" :max="100" size="small" />
          </el-row>

          <div class="v-spacer-20" />

          <!-- Action Buttons -->
          <div class="action-buttons mar-t-30">
            <el-button class="btn btn-secondary w-auto" @click="handleAddToCart">
              <el-icon :size="20" color="#0b2545" class="icon-align">
                <ShoppingCart />
              </el-icon>
              <span> {{ $t('addToCart') }}</span>
            </el-button>

            <el-button class="btn btn-primary w-auto"> {{ $t('buyNow') }}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_utilities.scss' as utilities;
@use '@/assets/styles/_product.scss' as product;

@include product.buttons;
@include product.spacers;
@include product.fontColors;
@include product.fontSizes;
@include product.margins;
@include product.width;

.product-view-wrapper {
  max-width: 1200px;
  padding: 0;
  margin: 0px auto;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  .image-column {
    @include utilities.flexbox(row, center, center);
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
  .info-column {
    padding: 20px 30px 30px;
  }
  .action-buttons {
    @include utilities.flexbox(row, null, null, 10px);
    @include breakpoint.xs {
      @include utilities.flexbox(column, null, null, 15px);
    }
    .icon-align {
      vertical-align: middle;
    }
  }
}
</style>
