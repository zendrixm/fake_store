<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <!-- Top Header -->
        <TopHeader />

        <!--Page Header -->
        <PageHeader />
      </el-header>
      <el-main>
        <div class="common-container">
          <slot />
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import TopHeader from '@/components/layout/TopHeader.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;

.el-header {
  height: auto !important;
  padding: 0px !important;
  background: #0b2545;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  @include breakpoint.xs {
    --el-header-padding: 0px;
  }
  a {
    color: #fff !important;
    text-decoration: none !important;
    white-space: nowrap;
  }
}

.el-main {
  --el-main-padding: 0px !important;
  margin-top: 116px;
}
</style>
