<template>
  <div class="bgDarkBlue">
    <!-- Left Container -->
    <div class="common-container header-container">
      <div :class="isDisplayed ? 'flex-space-around gap-30 w-100' : 'flex-start gap-30 w-100'">
        <div class="side-container">
          <img src="@/assets/img/eloura_white.png" :size="40" :width="40" :height="40" />
          <h1 class="txtWhite">ELOURA</h1>
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
              <span v-if="!isMobile" class="txtWhite"> {{ $t('shoppingCart') }} </span>
            </el-button>
          </div>
        </template>
      </div>
      <div v-if="isMobileSearch" class="flex-space-around gap-30 w-100">
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
@use '@/assets/styles/_product.scss' as product;
@use '@/assets/styles/_utilities.scss' as utilities;

@include product.backgroundColors;
@include product.fontColors;
@include product.flex;
@include product.gaps;
@include product.width;

.header-container {
  @include utilities.flexbox(row, space-between, center, 20px);
  @include breakpoint.xs {
    @include utilities.flexbox(column, null, null, null, wrap);
  }
}

.side-container {
  max-width: 200px;
  @include utilities.flexbox(row, flex-end, center, 10px);
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
</style>
