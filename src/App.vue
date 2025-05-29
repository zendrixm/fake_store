<template>
  <AppLayout>
    <template #default>
      <router-view />
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
authStore.loadFromStorage()
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0px !important;
  font-family: Helvetica;
  width: 100%;
  background: #f5f5f5;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto; // Ensure vertical scroll only here
}
</style>
