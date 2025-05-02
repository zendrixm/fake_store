<template>
  <PageLayout :is-not-login-page="false">
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="login-header">
          <img src="@/assets/img/eloura_blue.png" alt="Eloura Logo" :height="135" :width="170" />
        </div>

        <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
          <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>

          <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" show-password />
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="form.remember">Remember my username</el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button class="btn-solid-primary" @click="handleLogin" :loading="loading" round>
              Log in
            </el-button>
          </el-form-item>

          <div class="login-links">
            <a href="#">Forgot username or password?</a>
            <br />
            <a href="#">Register now</a>
          </div>
        </el-form>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/AuthStore'
import PageLayout from '@/layouts/PageLayout.vue'

const authStore = useAuthStore()
const router = useRouter()
const formRef = ref()
const loading = ref(false)

const form = ref({
  username: '',
  password: '',
  remember: false,
})

const rules = {
  username: [{ required: true, message: 'This information is required.', trigger: 'blur' }],
  password: [{ required: true, message: 'This information is required.', trigger: 'blur' }],
}

const handleLogin = async () => {
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    loading.value = true
    try {
      const success = await authStore.login(form.value.username, form.value.password)

      if (success) {
        router.push('/')
      } else {
        ElMessage.error(authStore.error || 'Login failed')
      }
    } catch {
      ElMessage.error('Invalid credentials')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style lang="scss">
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.auth-card {
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
  text-align: center;
  margin-top: 15px;
}
.login-links a {
  color: #134074;
  text-decoration: none;
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
