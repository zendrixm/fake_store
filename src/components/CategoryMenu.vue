<template>
  <div class="common-container category-wrapper">
    <!-- Left Arrow -->
    <button class="scroll-arrow left" @click="scrollLeft" v-if="showLeftArrow">‹</button>
    <div ref="scrollContainer" class="category-container" @scroll="checkArrows">
      <div v-for="(category, id) in categories" :key="id" class="category-item">
        <el-link
          class="category-text"
          :class="{ active: selected === category }"
          @click="() => handleSelectedCategory(category)"
        >
          {{ toCamelCase(category) }}
        </el-link>
      </div>
    </div>

    <!-- Right Arrow -->
    <button class="scroll-arrow right" @click="scrollRight" v-if="showRightArrow">›</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PropType } from 'vue'

defineProps({
  categories: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  selected: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['selectedCategory'])

const handleSelectedCategory = (category: string) => {
  emits('selectedCategory', category)
}

const toCamelCase = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const scrollContainer = ref<HTMLDivElement | null>(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(false)

const checkArrows = () => {
  const el = scrollContainer.value
  if (!el) return

  showLeftArrow.value = el.scrollLeft > 0
  showRightArrow.value = el.scrollLeft + el.clientWidth < el.scrollWidth
}

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -100, behavior: 'smooth' })
}

const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 100, behavior: 'smooth' })
}

onMounted(() => {
  if (scrollContainer.value) {
    checkArrows()

    scrollContainer.value.addEventListener('scroll', checkArrows)
    window.addEventListener('resize', checkArrows)
  }
})
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_utilities.scss' as utilities;

.category-wrapper {
  position: relative;
  @include utilities.flexbox(row, null, center);
  overflow: hidden;
  padding: 0px 30px 10px !important;
  @include breakpoint.xs {
    padding: 0px 10px 10px !important;
  }
}

.category-container {
  @include utilities.flexbox(row, null, null, 10px);
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  .category-item {
    flex: 0 0 auto;
  }
}

.category-text {
  white-space: nowrap;

  &.active {
    font-weight: bold;
    text-decoration: underline !important;
    text-underline-offset: 3px;
  }
}

.scroll-arrow {
  width: 30px;
  padding: 0;
  background: linear-gradient(to left, #0b2545 70%, transparent);
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  z-index: 2;
  @include utilities.flexbox(row, center, center);

  &.right {
    right: 0;
  }

  &.left {
    left: 0;
  }
}
</style>
