<template>
  <div class="auth-wrapper">
    <MessageBox type="info">
      <template #message>
        <el-text>{{ $t('message.loginInfo') }}</el-text>
        <div>
          <el-link @click="showCredentialsDialog = true">{{ $t('viewTestCredentials') }}</el-link>
        </div>
      </template>
    </MessageBox>
    <div class="auth-card">
      <div class="login-header">
        <img src="@/assets/img/eloura_blue.png" alt="Eloura Logo" :height="135" :width="170" />
      </div>

      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <!-- Email (only shows if sign up)-->
        <el-form-item v-if="!isLogin" :label="$t('email')" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>

        <!-- Username -->
        <el-form-item :label="$t('username')" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>

        <!-- Password -->
        <el-form-item :label="$t('password')" prop="password">
          <el-input v-model="form.password" show-password />
        </el-form-item>

        <!-- Confirm Password (only shows if sign up)-->
        <el-form-item v-if="!isLogin" :label="$t('confirmPassword')" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" show-password />
        </el-form-item>

        <div v-if="!isLogin" class="v-space-15" />

        <!-- Remember my username -->
        <el-form-item v-if="isLogin">
          <el-checkbox v-model="form.remember">{{ $t('remember') }}</el-checkbox>
        </el-form-item>

        <el-button class="btn-solid-primary" @click="handleLoginSignup" :loading="loading" round>
          {{ isLogin ? $t('login') : $t('signUp') }}
        </el-button>

        <div class="login-links">
          <router-link to="">{{ $t('forgotUsernamePassword') }}</router-link>
          <br />
          <a @click="toggleLoginSignup">{{ isLogin ? $t('signUp') : $t('alreadyHaveAcct') }}</a>
        </div>
      </el-form>
    </div>
  </div>
  <!-- Dialog -->
  <InfoDialog v-model="showCredentialsDialog" :title="$t('testCredentials')" width="700">
    <div class="hidden-sm-and-up">
      <el-row class="card-container" v-for="user in listOfUsers" :key="user.id">
        <el-row class="card-body">
          <el-text class="txtBlack">{{ user.fullName }}</el-text>
          <el-text
            ><strong>{{ $t('username') }}:</strong> {{ user.username }}</el-text
          >
          <el-text
            ><strong>{{ $t('password') }}:</strong> {{ user.password }}</el-text
          ></el-row
        >
      </el-row>
    </div>
    <el-table :data="listOfUsers" class="hidden-xs">
      <el-table-column :label="$t('name')" prop="fullName" />
      <el-table-column :label="$t('username')" prop="username" />
      <el-table-column :label="$t('password')" prop="password" />
    </el-table>
  </InfoDialog>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/AuthStore'
import { capitalize } from '@/utils/Formatter'
import MessageBox from '@/components/MessageBox.vue'

const authStore = useAuthStore()
const router = useRouter()
const { t, locale } = useI18n()
const formRef = ref()
const loading = ref(false)
const isLogin = ref(true)

const InfoDialog = defineAsyncComponent(() => import('@/components/dialogs/InfoDialog.vue'))

const showCredentialsDialog = ref(false)

const listOfUsers = computed(() =>
  authStore.listOfUsers.map((user) => ({
    ...user,
    fullName: `${capitalize(user.name.firstname)} ${capitalize(user.name.lastname)}`,
  })),
)

const form = ref({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  remember: false,
})

const requiredRule = (fieldKey: string) => ({
  required: true,
  message: computed(() => t('validation.required', { field: t(fieldKey) })),
  trigger: 'blur',
})

const rules = {
  username: [requiredRule('username')],
  email: [requiredRule('email')],
  password: [requiredRule('password')],
  confirmPassword: [requiredRule('confirmPassword')],
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
        ElMessage.error(
          authStore.error ||
            (action === 'login' ? t('validation.loginFailed') : t('validation.signUpFailed')),
        )
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

  formRef.value.resetFields()
}

watch(locale, () => {
  formRef.value?.validate()
})

onMounted(async () => {
  await authStore.fetchListOfUsers()
})
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;
.auth-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  max-height: 600px;
  width: 400px;
  background-color: #f5f7fa;
  @include breakpoint.xs {
    width: 100%;
  }
}

.auth-card {
  width: 100%;
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
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
  color: #00549a;
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
.txtBold {
  font-weight: bold;
}

.txtBlack {
  color: #000;
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

.el-link {
  --el-link-text-color: #00549a !important;
}

.v-space-15 {
  height: 15px;
}

.hidden-xs {
  display: block;
  @include breakpoint.xs {
    display: none;
  }
}

.hidden-sm-and-up {
  display: none;
  @include breakpoint.xs {
    display: block;
  }
}

.card-container {
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  .card-body {
    display: flex;
    flex-direction: column;
    .el-text {
      align-self: flex-start;
      line-height: 18px;
    }
  }
}

.card-container + .card-container {
  margin-top: 10px;
}
</style>
