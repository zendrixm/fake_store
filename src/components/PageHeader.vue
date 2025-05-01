<template>
  <div class="page-header">
    <TopHeader />
    <div class="v-spacer-10" />
    <el-row :gutter="20">
      <el-col :span="4">
        <h1 class="title-text align-right txtWhite">FakeStore</h1>
      </el-col>
      <el-col :span="16">
        <el-input
          v-model="searchProduct"
          placeholder="Search product"
          clearable
          :suffix-icon="Search"
        />
      </el-col>
      <el-col :span="4">
        <el-button class="cart-btn" @click="$router.push('/cart')">
          <el-icon :size="20" color="#FFF" style="vertical-align: middle">
            <ShoppingCart />
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
    <CategoryMenu :categories="categories" @selected-category="(cat) => (selectedCategory = cat)" />
  </div>
  <div class="v-spacer-90" />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Search, ShoppingCart } from '@element-plus/icons-vue'
import { useProductStore } from '@/stores/FakeProductStore'

import TopHeader from '@/components/layout/TopHeader.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'

const searchProduct = ref('')
const selectedCategory = ref('')

const store = useProductStore()
const fetchProducts = store.fetchProducts
const productList = computed(() => store.products)

const categories = computed(() => {
  const seen = new Set<string>()
  return productList.value.map((p) => p.category).filter((c) => !!c && !seen.has(c) && seen.add(c))
})

const filteredProducts = computed(() => {
  return productList.value.filter((p) => {
    const matchesCategory = selectedCategory.value ? p.category === selectedCategory.value : true
    const matchesSearch = searchProduct.value
      ? p.title.toLowerCase().includes(searchProduct.value.toLowerCase())
      : true
    return matchesCategory && matchesSearch
  })
})

const emit = defineEmits(['productsChanged'])

watch(
  filteredProducts,
  (newFiltered) => {
    console.log('Filtered Products:', newFiltered)
    emit('productsChanged', newFiltered)
  },
  { immediate: true },
)

onMounted(() => {
  fetchProducts().catch((err) => console.error('Error fetching products:', err))
})
</script>

<style lang="scss" scoped>
.txtWhite {
  color: #fff !important;
}
.align-right {
  text-align: right;
}
.title-text {
  font-size: 24px;
  margin: 0;
}
.cart-btn {
  border: none;
  background: transparent;
  padding: 0;
}
.v-spacer-10 {
  height: 10px;
}
.v-spacer-90 {
  height: 90px;
}
.page-header {
  background: linear-gradient(-180deg, #f53d2d, #f63);
  position: fixed;
  width: 100%;
  z-index: 1000;
  padding: 10px 30px;
}
</style>
