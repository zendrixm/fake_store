<template>
  <div class="bg-dark-gray">
    <div class="common-container nav-header">
      <!-- Toggle Icons (mobile only) -->
      <template v-if="isMobile">
        <img
          v-if="!isMenuOpen"
          src="@/assets/icons/menu.svg"
          width="20"
          height="20"
          class="menu-icon"
          alt="menu"
          @click="isMenuOpen = true"
        />
        <el-icon v-else :size="20" color="#FFF" @click="isMenuOpen = false"><Close /></el-icon>
      </template>

      <!-- Navigation Links -->
      <div class="nav-links" :class="{ 'mobile-active': isMobile && isMenuOpen }">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Close } from '@element-plus/icons-vue'
const isMobile = ref(false)
const isMenuOpen = ref(false)

const checkMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 540px)').matches
  if (!isMobile.value) isMenuOpen.value = false
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;

.bg-dark-gray {
  background: #0d0f16;
}

.common-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5px 30px;

  @include breakpoint.xs {
    padding: 10px;
  }
}

.nav-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 30px;
  flex-wrap: wrap;

  @include breakpoint.xs {
    flex-direction: column;
    align-items: flex-end;
    padding: 10px;
  }
}

.nav-links {
  display: flex;
  gap: 15px;

  @include breakpoint.xs {
    display: none;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    align-items: flex-end;

    &.mobile-active {
      display: flex;
      align-items: flex-start;
    }
  }
}

.menu-icon {
  display: none;
  cursor: pointer;

  @include breakpoint.xs {
    display: block;
  }
}
</style>
