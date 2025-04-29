<template>
  <!-- Page Header -->
  <div class="top-header">
    <PageHeader
      :categories="categories"
      @selected-category="handleSelectedCategory"
      @search="handleSearch"
    />
  </div>

  <div class="v-spacer-15" />

  <!-- Page Body -->
  <el-row :gutter="20">
    <el-col :span="4" />
    <el-col :span="16">
      <slot />
    </el-col>
    <el-col :span="4" />
  </el-row>

  <!-- Footer to be added -->
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue'
import type { PropType } from 'vue'

defineProps({
  categories: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const emit = defineEmits(['search', 'selectedCategory'])

const handleSearch = (term: string) => {
  emit('search', term)
}

const handleSelectedCategory = (category: string) => {
  emit('selectedCategory', category)
}
</script>

<style lang="scss">

.v-spacer-15 {
  height: 15px;
}
</style>
