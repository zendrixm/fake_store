<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { ShoppingCart } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/FakeProductStore'
import PageLayout from '@/layouts/PageLayout.vue'

const route = useRoute()
const store = useProductStore()
const product = computed(() => store.product)

const isLoading = ref(false)
const quantity = ref(1)
const productList = ref([])

const handleAddToCart = async () => {
  // logic to add to cart (or emit to parent)
  console.log('Adding to cart:', product)
}

const handleProductDisplay = (products: []) => {
  productList.value = products
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
  <PageLayout @products-changed="handleProductDisplay">
    <div v-loading="isLoading" element-loading-text="Loading... Please wait">
      <div class="product-view-wrapper">
        <el-row v-if="product">
          <el-col :md="10" class="image-column">
            <img :src="product.image" :alt="product.title" :width="180" :height="220" />
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

            <p class="txtOrange txtBold txtSize18">${{ product.price }}</p>

            <!-- Quantity Selector -->
            <el-row align="middle" class="v-spacer-15 quantity-row">
              <span class="qty-label"><strong>Quantity:</strong></span>
              <el-input-number v-model="quantity" :min="1" :max="100" size="small" />
            </el-row>

            <div class="v-spacer-20" />

            <!-- Action Buttons -->
            <div class="action-buttons">
              <el-button class="btn-secondary" @click="handleAddToCart">
                <el-icon :size="20" color="#ee4d2d" class="icon-align">
                  <ShoppingCart />
                </el-icon>
                <span>Add to Cart</span>
              </el-button>

              <el-button class="btn-solid-primary">Buy Now</el-button>
              <el-button class="cart-btn" @click="$router.push('/cart')">
                <el-icon :size="20" color="#FFF" style="vertical-align: middle">
                  <ShoppingCart />
                </el-icon>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </PageLayout>
</template>

<style lang="scss">
.product-view-wrapper {
  max-width: 1200px;
  padding: 0;
  margin: 10px auto;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  background-color: #fff;
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

.txtOrange {
  color: #f63;
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
}

.btn-secondary {
  background: rgba(255, 87, 34, 0.1);
  border: 1px solid #ee4d2d;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
  color: #ee4d2d;
  padding: 15px;

  &:hover {
    background: rgba(255, 87, 34, 0.1) !important;
    border: 1px solid #ee4d2d;
    color: #ee4d2d !important;
  }
}

.btn-solid-primary {
  background: #ee4d2d;
  border: 1px solid #ee4d2d;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
  color: #fff;
  padding: 15px;

  &:hover {
    background: #ee4d2d;
    border: 1px solid #ee4d2d;
    color: #fff;
  }
}

.el-input-number {
  .el-input__inner {
    color: #f63;
    font-size: 14px;
  }
}
</style>
