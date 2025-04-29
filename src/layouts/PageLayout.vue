<template>
  <div class="top-header">
    <TopHeader />
    <div class="v-spacer-15" />
    <PageHeader @search="handleSearch" />
    <CategoryMenu :categories="categories" @selected-category="handleSelectedCategory" />
  </div>

  <slot />
  <!-- Footer to be added -->
  <PageFooter />
</template>

<script lang="ts" setup>
import TopHeader from '@/components/layout/TopHeader.vue'
import PageHeader from '@/components/PageHeader.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
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
.top-header {
  background: linear-gradient(-180deg, #f53d2d, #f63);
  //background: linear-gradient(-180deg, #280629, #5b1d6b);
  height: max-content;
  padding: 10px 30px;
  a {
    color: #fff !important;
  }
}

.v-spacer-15 {
  height: 15px;
}
</style>
