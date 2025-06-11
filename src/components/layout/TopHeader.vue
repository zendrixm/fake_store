<template>
  <div class="bgDarkGray">
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
      <el-row
        type="flex"
        align="middle"
        class="nav-links"
        :class="{ 'mobile-active': isMobile && isMenuOpen }"
      >
        <router-link to="/">{{ $t('home') }}</router-link>
        <router-link to="/about">{{ $t('about') }}</router-link>
        <template v-if="isAuthenticated">
          <el-dropdown trigger="click" v-if="!isMobile">
            <span class="el-dropdown-link">{{ $t('profile') }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="navigateToProfile"
                  ><el-icon><UserFilled /></el-icon> {{ username }}</el-dropdown-item
                >
                <el-dropdown-item divided @click="logout">{{ $t('logout') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <template v-else>
            <el-button class="btn-nav" @click="logout">{{ $t('logout') }}</el-button>
            <el-button class="btn-nav" @click="navigateToProfile">
              <span
                ><el-icon class="mar-r-5"><UserFilled /></el-icon>{{ username }}</span
              ></el-button
            >
          </template>
        </template>
        <template v-else>
          <router-link to="/login">{{ $t('login') }}</router-link>
        </template>

        <el-link @click="toggleLocale">{{ locale === 'en' ? 'FR' : 'EN' }}</el-link>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Close, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/UserStore'
import { useI18n } from 'vue-i18n'

const isMobile = ref(false)
const isMenuOpen = ref(false)

const authStore = useAuthUserStore()
const router = useRouter()

const { locale } = useI18n()

const isAuthenticated = computed(() => authStore.accessToken !== '')
const username = computed(() => authStore.user?.username ?? '')

const checkMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 540px)').matches
  if (!isMobile.value) isMenuOpen.value = false
}

const navigateToProfile = () => {
  if (username.value) {
    router.push({ name: 'UserProfile', params: { username: username.value } })
  }
}

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'fr' : 'en'
}

const logout = () => {
  authStore.logoutUser()
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
@use '@/assets/styles/_product.scss' as product;
@use '@/assets/styles/_utilities.scss' as utilities;

@include product.backgroundColors;
@include product.margins;

.nav-header {
  @include utilities.flexbox(null, flex-end, flex-end, null, wrap);
  padding: 5px 30px;

  @include breakpoint.xs {
    @include utilities.flexbox(column, flex-end);
    padding: 10px;
  }

  .nav-links {
    @include utilities.flexbox(row, flex-end, center, 15px);
    @include breakpoint.xs {
      display: none;
      &.mobile-active {
        @include utilities.flexbox(column, flex-start, flex-start);
        width: 100%;
      }
    }
    .el-dropdown-link {
      color: white;
      cursor: pointer;
      @include utilities.flexbox(row, center, center);
      &:hover {
        text-decoration: underline;
        color: #00549a;
      }
    }
    .btn-nav {
      padding: 0px;
      background: transparent;
      border: none;
      color: #fff;
      height: auto;
      &.el-button + .el-button {
        margin-left: 0px;
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
}
</style>
