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
      <el-footer>
        <!-- Page Footer -->
        <PageFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import TopHeader from '@/components/layout/TopHeader.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_utilities.scss' as utilities;

.common-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 30px;
  @include breakpoint.xs {
    padding: 10px;
  }
}
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0px !important;
  a {
    color: #fff;
    text-decoration: none;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  }
}

.el-main {
  margin-top: 106px;
}

.el-main,
.el-footer {
  --el-main-padding: 0px !important;
  padding: 0px !important;
}
</style>
