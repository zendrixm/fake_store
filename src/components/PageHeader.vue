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
          v-model="localSearchTerm"
          placeholder="Search product"
          clearable
          :suffix-icon="Search"
          @input="onInput"
        />
      </el-col>
      <el-col :span="4">
        <el-button class="cart-btn">
          <el-icon :size="20" color="#FFF" style="vertical-align: middle">
            <ShoppingCart />
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
    <CategoryMenu :categories="categories" @selected-category="handleSelectedCategory" />
  </div>
  <div class="v-spacer-90" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search, ShoppingCart } from '@element-plus/icons-vue'
import type { PropType } from 'vue'

import TopHeader from '@/components/layout/TopHeader.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'

defineProps({
  categories: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})
const emit = defineEmits(['search', 'selectedCategory'])

const localSearchTerm = ref('')

const onInput = () => {
  emit('search', localSearchTerm.value)
}

const handleSelectedCategory = (category: string) => {
  emit('selectedCategory', category)
}
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
  margin: 0px;
}
.cart-btn {
  border: none;
  background: transparent;
  padding: 0px;
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
  display: block;
}
</style>
