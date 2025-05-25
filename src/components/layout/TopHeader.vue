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
        <template v-if="isAuthenticated">
          <el-dropdown trigger="click" v-if="!isMobile">
            <span class="el-dropdown-link">Profile</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  ><el-icon><UserFilled /></el-icon> {{ username }}</el-dropdown-item
                >
                <el-dropdown-item divided @click="logout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <template v-else>
            <el-button class="btn-nav" @click="logout">Logout</el-button>
            <el-button class="btn-nav" @click="$router.push(`/profile/${username}`)">
              <el-icon class="mar-5-r"><UserFilled /></el-icon>{{ username }}</el-button
            >
          </template>
        </template>
        <template v-else>
          <router-link to="/login">Login</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Close, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
const isMobile = ref(false)
const isMenuOpen = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const username = computed(() => authStore.user?.username ?? '')

const checkMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 540px)').matches
  if (!isMobile.value) isMenuOpen.value = false
}

const logout = () => {
  authStore.logout()
  router.push('/login')
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
  .el-dropdown-link {
    color: white;
    cursor: pointer;
    user-select: none;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
}

.btn-nav {
  padding: 0px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  height: auto;
  &.el-button + .el-button {
    margin-left: 0px;
  }
}

.mar-5-r {
  margin-right: 5px;
}
.menu-icon {
  display: none;
  cursor: pointer;

  @include breakpoint.xs {
    display: block;
  }
}
</style>
