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

html,
body {
  height: 100%;
  margin: 0;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

.el-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.common-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 30px;
  overflow: visible;
  @include breakpoint.xs {
    padding: 10px;
  }
}
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
  padding: 0px !important;
  overflow-y: auto;
  margin-top: 106px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-footer {
  padding: 0px !important;
}
</style>
