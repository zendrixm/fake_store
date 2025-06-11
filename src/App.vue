<template>
  <AppLayout>
    <template #default>
      <router-view />
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthUserStore } from '@/stores/UserStore'

const authStore = useAuthUserStore()
authStore.loadFromStorage()
</script>
