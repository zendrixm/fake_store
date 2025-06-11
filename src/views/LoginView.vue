<template>
  <div class="auth-wrapper">
    <MessageBox type="info">
      <template #message>
        <el-text>{{ $t('message.loginInfo') }}</el-text>
        <div class="inline-flex mar-r-5" />
        <el-link @click="showCredentialsDialog = true">{{ $t('viewTestCredentials') }}</el-link>
      </template>
    </MessageBox>

    <div class="auth-card">
      <div class="auth-card-logo">
        <img
          loading="lazy"
          src="@/assets/img/eloura_blue.png"
          alt="Eloura Logo"
          :height="135"
          :width="170"
        />
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

        <div v-if="!isLogin" class="v-spacer-15" />

        <!-- Remember my username -->
        <el-form-item v-if="isLogin">
          <el-checkbox v-model="form.remember">{{ $t('remember') }}</el-checkbox>
        </el-form-item>

        <el-button class="btn btn-primary" @click="handleLoginSignup" :loading="loading" round>
          {{ isLogin ? $t('login') : $t('signUp') }}
        </el-button>

        <div class="v-spacer-15" />
        <el-link @click="showForgotDialog = true">{{ $t('forgotUsernamePassword') }}</el-link>
        <br />
        <el-link @click="toggleLoginSignup">{{
          isLogin ? $t('signUp') : $t('alreadyHaveAcct')
        }}</el-link>
      </el-form>
    </div>
  </div>
  <!-- Test Credentials Dialog -->
  <InfoDialog v-model="showCredentialsDialog" :title="$t('testCredentials')" width="700">
    <template #messageBody>
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
      <el-table :data="listOfUsers" class="hidden-xs" stripe>
        <el-table-column :label="$t('name')" prop="fullName" />
        <el-table-column :label="$t('username')" prop="username" />
        <el-table-column :label="$t('password')" prop="password" />
      </el-table>
    </template>
  </InfoDialog>

  <!-- Forgot username/password Dialog-->
  <InfoDialog
    v-model="showForgotDialog"
    :title="$t('forgotUsernamePassword')"
    type="warning"
    :message="$t('message.feature', { feature: $t('forgotUsernamePassword') })"
  />

  <!-- Signup Dialog-->
  <InfoDialog
    v-model="showSignUpDialog"
    :title="$t('signUp')"
    type="warning"
    :message="$t('message.feature', { feature: $t('signUp') })"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthUserStore } from '@/stores/UserStore'
import { capitalize } from '@/utils/Formatter'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import MessageBox from '@/components/MessageBox.vue'

const authStore = useAuthUserStore()
const router = useRouter()
const { t, locale } = useI18n()
const formRef = ref()
const loading = ref(false)
const isLogin = ref(true)

const InfoDialog = defineAsyncComponent(() => import('@/components/dialogs/InfoDialog.vue'))

const showCredentialsDialog = ref(false)
const showForgotDialog = ref(false)
const showSignUpDialog = ref(false)

const listOfUsers = computed(() =>
  authStore.allUser.map((user) => ({
    ...user,
    fullName: `${capitalize(user.firstName)} ${capitalize(user.lastName)}`,
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
      if (action === 'login') {
        const res = await authStore.loginUser(form.value.username, form.value.password)
        console.log('Test user login:', res)

        if (res) {
          router.push('/')
        } else {
          ElMessage.error(t('validation.loginFailed'))
          return
        }
      } else {
        showSignUpDialog.value = true
        // const payload = {
        //   username: form.value.username,
        //   password: form.value.password,
        //   email: form.value.email,
        // }
        // success = await authStore.signup(payload)
      }
    } catch {
      ElMessage.error(
        action === 'login' ? t('validation.loginFailed') : t('validation.signUpFailed'),
      )
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
  await authStore.fetchAllUsers()
})
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_product.scss' as product;
@use '@/assets/styles/_utilities.scss' as utilities;

@include product.buttons;
@include product.display;
@include product.fontColors;
@include product.margins;
@include product.spacers;

.auth-wrapper {
  @include utilities.flexbox(column, center, flex-start);
  margin: 0 auto;
  width: 400px;
  @include breakpoint.xs {
    width: 100%;
  }
  .auth-card {
    width: 100%;
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    @include breakpoint.xs {
      padding: 10px;
    }
    .auth-card-logo {
      @include utilities.flexbox(row, center);
      width: 100%;
      margin-bottom: 30px;
    }
  }
  .el-input {
    width: 100%;
    @include breakpoint.xs {
      width: 100%;
    }
  }
}

.card-container {
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  @include utilities.flexbox(row, null, flex-start, 12px);
  .card-body {
    @include utilities.flexbox(column);
    .el-text {
      @include utilities.flexbox(null, null, flex-start);
      line-height: 18px;
    }
  }
}

.card-container + .card-container {
  margin-top: 10px;
}
</style>
