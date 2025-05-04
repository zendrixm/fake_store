<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="login-header">
        <img src="@/assets/img/eloura_blue.png" alt="Eloura Logo" :height="135" :width="170" />
      </div>

      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <!-- Email (only shows if sign up)-->
        <el-form-item v-if="!isLogin" label="Email" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>

        <!-- Username -->
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>

        <!-- Password -->
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" show-password />
        </el-form-item>

        <!-- Confirm Password (only shows if sign up)-->
        <el-form-item v-if="!isLogin" label="Confirm password" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" show-password />
        </el-form-item>

        <!-- Remember my username -->
        <el-form-item v-if="isLogin">
          <el-checkbox v-model="form.remember">Remember my username</el-checkbox>
        </el-form-item>

        <el-button class="btn-solid-primary" @click="handleLoginSignup" :loading="loading" round>
          {{ isLogin ? 'Login' : 'Sign up' }}
        </el-button>

        <div class="login-links">
          <router-link to="/forgotUsernamePassword">Forgot username or password?</router-link>
          <br />
          <a @click="toggleLoginSignup">{{ isLogin ? 'Sign up' : 'Already have an account' }}</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const router = useRouter()
const formRef = ref()
const loading = ref(false)
const isLogin = ref(true)

const form = ref({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  remember: false,
})

const rules = {
  email: [{ required: true, message: 'This information is required.', trigger: 'blur' }],
  username: [{ required: true, message: 'This information is required.', trigger: 'blur' }],
  password: [{ required: true, message: 'This information is required.', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: 'This information is required.', trigger: 'blur' }],
}

const handleAuth = async (action: 'login' | 'signup') => {
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    loading.value = true
    try {
      let success = false

      if (action === 'login') {
        success = await authStore.login(form.value.username, form.value.password)
      } else {
        const payload = {
          username: form.value.username,
          password: form.value.password,
          email: form.value.email,
        }
        success = await authStore.signup(payload)
      }

      if (success) {
        router.push('/')
      } else {
        ElMessage.error(authStore.error || (action === 'login' ? 'Login failed' : 'Sign up failed'))
      }
    } catch {
      ElMessage.error('Invalid credentials')
    } finally {
      loading.value = false
    }
  })
}

const handleLoginSignup = () => {
  handleAuth(isLogin.value ? 'login' : 'signup')
}

const toggleLoginSignup = () => {
  isLogin.value = !isLogin.value

  form.value.username = ''
  form.value.password = ''
}
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  max-height: 600px;
  width: 100%;
  background-color: #f5f7fa;
  @include breakpoint.xs {
    margin-top: 0px;
  }
}

.auth-card {
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  width: 400px;
  @include breakpoint.xs {
    max-width: 100%;
    padding: 10px;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.login-header img {
  margin-bottom: 10px;
}

.login-header h2 {
  font-size: 20px;
  margin: 0;
}

.login-links {
  font-size: 12px;
  color: #134074;
  margin-top: 15px;
}
.login-links a {
  color: #134074;
  text-decoration: none;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
}

.txtLightBlue {
  color: #134074;
}
.btn-solid-primary {
  width: 100%;
  background: #0b2545;
  border: 1px solid #0b2545;
  border-radius: 8px !important;
  color: #fff;
}

/** Overridden class will be move to a separate file  */
.el-form-item {
  &.is-error {
    .el-form-item__label {
      color: red;
    }
    .el-form-item__error {
      color: red;
      padding-top: 5px;
    }
    .el-input__wrapper {
      border: 1px solid red;
      border-radius: 8px;
      --el-input-border: red;
    }
  }
}

.el-form-item__error::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url('@/assets/icons/error.svg');
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 5px;
  vertical-align: top;
}

.el-form-item__label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #000;
}
.el-form-item {
  &.is-required:not(.is-error) {
    &.asterisk-left > .el-form-item__label:before {
      color: #000;
    }
  }
}

.el-checkbox {
  &.is-checked {
    .el-checkbox__input {
      &.is-checked,
      &.is-indeterminate {
        .el-checkbox__inner {
          background: #0b2545;
          border-color: #0b2545;
        }
      }
    }

    .el-checkbox__label {
      color: #134074;
    }
  }
}
</style>
