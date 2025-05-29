<template>
  <div class="bg-dark-blue">
    <!-- Left Container -->
    <div class="common-container header-container">
      <div :class="isDisplayed ? 'flex-space-around' : 'flex-space-around flex-start'">
        <div class="side-container">
          <img src="@/assets/img/eloura_white.png" :size="40" :width="40" :height="40" />
          <h1 class="logo-text">ELOURA</h1>
        </div>

        <template v-if="isDisplayed">
          <!-- Middle Container -->
          <div class="middle-container">
            <el-input
              v-if="!isMobile"
              v-model="searchProduct"
              :placeholder="$t('searchProduct')"
              clearable
              :suffix-icon="Search"
              class="search-product"
            />
          </div>
          <!-- Right Container -->
          <div class="side-container">
            <el-button v-if="isMobile" class="icon-btn" @click="toggleSearch">
              <el-icon :size="18" color="#FFF">
                <Search />
              </el-icon>
            </el-button>
            <el-button class="icon-btn" @click="$router.push('/cart')">
              <el-icon :size="18" color="#FFF">
                <ShoppingCart />
              </el-icon>
              <span v-if="!isMobile" class="btn-label"> {{ $t('shoppingCart') }} </span>
            </el-button>
          </div>
        </template>
      </div>
      <div v-if="isMobileSearch" class="flex-space-around">
        <el-input
          v-model="searchProduct"
          :placeholder="$t('searchProduct')"
          clearable
          :suffix-icon="Search"
          class="search-product"
        />
      </div>
    </div>
    <CategoryMenu
      v-if="isDisplayed"
      :categories="categories"
      :selected="selectedCategory"
      @selected-category="(cat) => (selectedCategory = cat)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Search, ShoppingCart } from '@element-plus/icons-vue'
import { useProductStore } from '@/stores/FakeProductStore'
import { useAuthStore } from '@/stores/AuthStore'
import { useRoute } from 'vue-router'
import CategoryMenu from '@/components/CategoryMenu.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isMobile = ref(false)
const isMobileSearch = ref(false)

const checkMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 540px)').matches
}
const store = useProductStore()
const fetchProducts = store.fetchProducts

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const route = useRoute()
const searchProduct = computed({
  get: () => store.searchQuery,
  set: (val) => (store.searchQuery = val),
})

const selectedCategory = computed({
  get: () => store.selectedCategory,
  set: (val) => (store.selectedCategory = val),
})

const productList = computed(() => store.products)

const categories = computed(() => {
  const list = new Set<string>()
  const cats = productList.value
    .map((p) => p.category)
    .filter((c) => !!c && !list.has(c) && list.add(c))
  return [t('all'), ...cats]
})

const isDisplayed = computed(() => {
  return isAuthenticated.value && !route.meta.isDisplayed
})

const toggleSearch = () => {
  isMobileSearch.value = !isMobileSearch.value
}

onMounted(() => {
  fetchProducts().catch((err) => console.error('Error fetching products:', err))
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;

.common-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 30px;
  @include breakpoint.xs {
    padding: 10px;
  }
}

.bg-dark-blue {
  background: #0b2545;
}

.logo-text {
  margin: 0px;
  color: #fff;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @include breakpoint.xs {
    flex-wrap: wrap;
    flex-direction: column;
  }
}

.side-container {
  display: inline-flex;
  max-width: 200px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.middle-container {
  max-width: 785px;
  width: 100%;
}

.icon-btn {
  border: none !important;
  background: transparent !important;
  padding: 10px;
  &:hover {
    border: 1px solid #fff;
    background: transparent;
  }

  @include breakpoint.xs {
    padding: 0px !important;
    margin-left: 0px !important;
  }
}

.btn-label {
  color: #fff;
  margin-left: 5px;
}

.flex-space-around {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: 30px;
}

.flex-start {
  justify-content: flex-start;
}
</style>
