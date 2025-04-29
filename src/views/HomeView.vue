<template>
  <PageLayout
    :categories="categories"
    @selected-category="handleCategorySelect"
    @search="handleSearch"
  >
    <BannerSection :categories="categories" />
    <!-- <DailyDiscoverSection /> -->
    <div v-loading="isLoading" element-loading-text="Loading... Please wait">
      <ProductList :categories="categories" :products="filteredProducts" />
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PageLayout from '@/layouts/PageLayout.vue'
//import DailyDiscoverSection from '@/components/DailyDiscoverSection.vue'
import ProductList from '@/components/ProductList.vue'

import { useProductStore } from '@/stores/FakeProductStore'

const store = useProductStore(),
  fetchProducts = store.fetchProducts,
  productList = computed(() => store.products)

const isLoading = ref(false)
const searchTerm = ref('')
const selectedCategory = ref('')

const categories = computed(() => {
  const allCategories = productList.value || []

  return allCategories.reduce((c: string[], product) => {
    if (!c.includes(product.category)) {
      c.push(product.category)
    }
    return c
  }, [])
})

const filteredProducts = computed(() => {
  let filtered = productList.value
  if (selectedCategory.value) {
    filtered = filtered.filter((p) => p.category === selectedCategory.value)
  }
  if (searchTerm.value) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
  }
  return filtered
})

const handleSearch = (term: string) => {
  searchTerm.value = term
}

const handleCategorySelect = (category: string) => {
  selectedCategory.value = category
}

onMounted(async () => {
  try {
    isLoading.value = true
    await fetchProducts()
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss">
.el-link {
  --el-link-hover-text-color: none;
}
</style>
