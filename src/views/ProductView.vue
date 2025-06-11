<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthUserStore } from '@/stores/UserStore'
import { useCartStore } from '@/stores/CartStore'
import { useProductStore } from '@/stores/DummyProductStore'
import { ElMessage } from 'element-plus'
import ProductReview from '@/components/sections/ProductReview.vue'
import ProductSpecification from '@/components/sections/ProductSpecification.vue'
import ProductDetails from '@/components/sections/ProductDetails.vue'
import ProductSectionWrapper from '@/components/ProductSectionWrapper.vue'
import ProductList from '@/components/ProductList.vue'

const route = useRoute()
const cartStore = useCartStore()
const authStore = useAuthUserStore()
const productStore = useProductStore()
const productDetails = computed(() => {
  return productStore.singleProduct
})
const similarProducts = computed(() => {
  return productStore.getDummyProducts
})
const isLoading = ref(false)
const productId = computed(() => route.params.id)
const userId = computed(() => authStore.user?.id)

const handleAddToCart = async (data: { productId: number; quantity: number }) => {
  const productToAdd = {
    quantity: data.quantity,
    id: data.productId,
  }

  await cartStore.addToCart(userId.value, productToAdd)
  ElMessage.success('Product added to cart!')
}

const productSpecs = computed(() => [
  { label: 'Brand', value: productDetails.value?.brand ?? 'N/A' },
  {
    label: 'Dimensions (w x h x d)',
    value: productDetails.value?.dimensions
      ? `${productDetails.value?.dimensions.width} x ${productDetails.value?.dimensions.height} x ${productDetails.value?.dimensions.depth}`
      : 'N/A',
  },
  { label: 'Warranty', value: productDetails.value?.warrantyInformation ?? 'N/A' },
  { label: 'Return Policy', value: productDetails.value?.returnPolicy ?? 'N/A' },
])

onMounted(async () => {
  try {
    isLoading.value = true
    if (productId.value) {
      await cartStore.fetchCart(userId.value)
      await productStore.fetchSingleProductDetails(Number(productId.value))
      if (productDetails.value) {
        await productStore.fetchProductsByCategory(productDetails.value.category)
      }
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
    <!-- Product Details -->
    <ProductSectionWrapper :show-title="false">
      <ProductDetails
        v-if="productDetails"
        :product-details="productDetails"
        @add-to-cart="handleAddToCart"
      />
    </ProductSectionWrapper>

    <div class="v-spacer-15" />

    <!-- Product Specifications -->
    <ProductSectionWrapper title="Product Specifications">
      <ProductSpecification v-if="productSpecs" :product-specification="productSpecs" />
    </ProductSectionWrapper>

    <div class="v-spacer-15" />

    <!-- Product Ratings -->
    <ProductSectionWrapper title="Product Ratings">
      <ProductReview v-if="productDetails" :review-details="productDetails.reviews" />
    </ProductSectionWrapper>

    <div class="v-spacer-30" />
    <!-- Similar Products -->
    <h2>You may also like</h2>
    <ProductList :products="similarProducts" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/_product.scss' as product;
@include product.spacers;
</style>
