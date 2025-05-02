<template>
  <!-- Page Header -->
  <div class="top-header">
    <PageHeader @products-changed="handleProductsChanged" :is-login-page="isNotLoginPage" />
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
defineProps({
  isNotLoginPage: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['productsChanged'])
const handleProductsChanged = (products: []) => {
  emit('productsChanged', products)
}
</script>

<style lang="scss">
.v-spacer-15 {
  height: 15px;
}
</style>
