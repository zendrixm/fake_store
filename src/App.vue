<template>
  <AppLayout>
    <template #default>
      <router-view />
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0px !important;
  font-family: Helvetica;
  width: 100%;
}
html,
body {
  overflow-x: hidden;
  background: #f5f5f5 !important;
}
</style>
