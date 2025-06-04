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
