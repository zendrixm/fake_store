<template>
  <el-row :gutter="20">
    <el-col :span="4" />
    <el-col :span="16">
      <el-row>
        <div v-for="(category, id) in categories" :key="id">
          <el-link class="category-text" @click="() => handleSelectedCategory(category)">
            {{ toCamelCase(category) }}
          </el-link>
        </div>
      </el-row>
    </el-col>
    <el-col :span="4" />
  </el-row>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  categories: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const toCamelCase = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const emits = defineEmits(['selectedCategory'])

const handleSelectedCategory = (category: string) => {
  emits('selectedCategory', category)
}
</script>

<style lang="scss">
.category-text {
  &.el-link {
    padding: 10px 10px 0px 0px;
  }
}
</style>
