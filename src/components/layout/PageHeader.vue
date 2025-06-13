<template>
  <div class="bgDarkBlue">
    <!-- Left Container -->
    <div class="common-container header-container">
      <div :class="isDisplayed ? 'flex-space-around' : 'flex-space-between'" class="gap-30 w-100">
        <div class="side-container">
          <img src="@/assets/img/eloura_white.png" :size="40" :width="40" :height="40" />
          <h1 class="txtWhite">ELOURA</h1>
        </div>

        <!-- Middle Container -->
        <div v-if="isDisplayed" class="middle-container">
          <el-input
            v-if="!isMobile"
            v-model="searchProduct"
            :placeholder="$t('searchProduct')"
            clearable
            :suffix-icon="Search"
            class="search-product"
            @blur="handleSearchBlur"
            @keyup.enter="handleSearchBlur"
            @keyup.esc="() => (searchProduct = '')"
          />
        </div>
        <!-- Right Container -->
        <div class="side-container">
          <el-button v-if="isMobile" class="icon-btn" @click.stop="toggleSearch">
            <el-icon :size="18" color="#FFF">
              <Search />
            </el-icon>
          </el-button>
          <el-button class="icon-btn" @click="handleShoppingCart">
            <el-icon :size="18" color="#FFF">
              <ShoppingCart />
            </el-icon>
            <span v-if="!isMobile" class="txtWhite"> {{ $t('shoppingCart') }} </span>
          </el-button>
        </div>
      </div>
      <div v-if="isMobileSearch" ref="searchRef" class="flex-space-around gap-30 w-100">
        <el-input
          v-model="searchProduct"
          :placeholder="$t('searchProduct')"
          clearable
          :suffix-icon="Search"
          class="search-product"
          @blur="handleSearchBlur"
          @keyup.enter="handleSearchBlur"
          @keyup.esc="() => (searchProduct = '')"
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { Search, ShoppingCart } from '@element-plus/icons-vue'
import { useProductStore } from '@/stores/DummyProductStore'
import { useRoute, useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/UserStore'
import CategoryMenu from '@/components/CategoryMenu.vue'

const isMobile = ref(false)
const isMobileSearch = ref(false)
const searchRef = ref<HTMLElement | null>(null)

const checkMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 540px)').matches
}
const store = useProductStore()
const fetchAllProducts = store.fetchAllProducts
const fetchProductCategories = store.fetchProductCategories

const authStore = useAuthUserStore()
const isAuthenticated = computed(() => authStore.authenticated)

const route = useRoute()
const router = useRouter()
const searchProduct = ref('')
const selectedCategory = ref('')
const categories = computed(() => store.getCategories)

const isDisplayed = computed(() => {
  return !route.meta.isDisplayed
})

const toggleSearch = () => {
  isMobileSearch.value = !isMobileSearch.value
}

watch(selectedCategory, async (newCategory) => {
  if (newCategory) {
    store.selectedCategory = newCategory
    await store.fetchProductsByCategory(newCategory)
  } else {
    store.selectedCategory = ''
    await store.fetchAllProducts()
  }
})
const handleSearchBlur = async () => {
  console.log('Search input blurred, fetching products...', searchProduct.value)
  if (searchProduct.value) {
    await store.searchProducts(searchProduct.value)
  } else {
    await store.fetchAllProducts()
  }
}

const handleShoppingCart = () => {
  if (isAuthenticated.value) {
    router.push({ name: 'Cart' })
  } else {
    router.push({ name: 'Login' })
  }
}

const handleClickOutsideSearch = (event: MouseEvent) => {
  if (isMobileSearch.value && searchRef.value && !searchRef.value.contains(event.target as Node)) {
    isMobileSearch.value = false
  }
}
onMounted(async () => {
  await fetchAllProducts().catch((err) => console.error('Error fetching products:', err))
  await fetchProductCategories().catch((err) => console.error('Error fetching categories:', err))
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('click', handleClickOutsideSearch)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('click', handleClickOutsideSearch)
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
  height: auto;
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
