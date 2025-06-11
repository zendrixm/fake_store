<template>
  <el-card class="user-profile" v-if="user">
    <div class="flex-space-between">
      <h2>
        {{ capitalize(user.firstName) }}
        {{ capitalize(user.lastName) }}
      </h2>
      <el-button v-if="!isEdit" class="icon-btn" :size="16" @click="toggleEdit">
        <img src="@/assets/icons/edit.svg" :width="20" :height="20" alt="edit" />
      </el-button>
    </div>

    <div class="v-spacer-20" />

    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-position="right"
      :class="isEdit ? '' : 'is-edit'"
    >
      <el-form-item :label="$t('username')" prop="username" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.username" />
        <el-text v-else>
          {{ user.username }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('email')" prop="email" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.email" disabled />
        <el-text v-else>
          {{ user.email }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('firstName')" prop="firstname" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.firstname" />
        <el-text v-else>
          {{ capitalize(user.firstName) }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('lastName')" prop="lastname" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.lastname" />
        <el-text v-else>
          {{ capitalize(user.lastName) }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('birthDate')" prop="birthDate" :required="isEdit">
        <el-date-picker v-if="isEdit" v-model="formModel.birthDate" />
        <el-text v-else>
          {{ user?.birthDate ? formatFullDate(user.birthDate) : 'No birthdate available' }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('age')" prop="age" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.age" />
        <el-text v-else>
          {{ user.age }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('phone')" prop="phone" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.phone" />
        <el-text v-else>
          {{ user.phone }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('state')" prop="state" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.state" />
        <el-text v-else>
          {{ capitalize(user.address?.state) }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('city')" prop="city" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.city" />
        <el-text v-else>
          {{ capitalize(user.address?.city) }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('postalCode')" prop="postalCode" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.postalCode" />
        <el-text v-else>
          {{ user.address?.postalCode }}
        </el-text>
      </el-form-item>
    </el-form>

    <div class="v-spacer-20" />
    <div v-if="isEdit" class="flex-end action-buttons">
      <el-button class="btn btn-primary" @click="updateProfile">{{ $t('save') }}</el-button>
      <el-button class="btn btn-secondary" @click="handleCancel">{{ $t('cancel') }}</el-button>
    </div>
  </el-card>

  <el-text v-else>Loading profile...</el-text>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthUserStore } from '@/stores/UserStore'
import { capitalize, formatFullDate } from '@/utils/Formatter'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

const authStore = useAuthUserStore()
const user = computed(() => authStore.userDetails)
const userId = computed(() => authStore.user.id)
const { t, locale } = useI18n()
const isEdit = ref(false)
const formRef = ref<FormInstance>()

const formModel = ref({
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  birthDate: '',
  age: 0,
  phone: '',
  state: '',
  city: '',
  postalCode: '',
})

const requiredRule = (fieldKey: string) => ({
  required: true,
  message: computed(() => t('validation.required', { field: t(fieldKey) })),
  trigger: 'blur',
})

const rules = {
  username: [requiredRule('username')],
  email: [requiredRule('email')],
  firstname: [requiredRule('firstName')],
  lastname: [requiredRule('lastName')],
  birthDate: [requiredRule('birthDate')],
  age: [requiredRule('age')],
  phone: [requiredRule('phone')],
  state: [requiredRule('state')],
  city: [requiredRule('city')],
  postalCode: [requiredRule('postalCode')],
}

const toggleEdit = () => {
  isEdit.value = !isEdit.value
  if (isEdit.value) {
    formRef.value?.resetFields()

    formModel.value.username = user.value?.username || ''
    formModel.value.email = user.value?.email || ''
    formModel.value.firstname = user.value?.firstName || ''
    formModel.value.lastname = user.value?.lastName || ''
    formModel.value.birthDate = user.value?.birthDate || ''
    formModel.value.age = user.value?.age || 0
    formModel.value.phone = user.value?.phone || ''
    formModel.value.state = user.value?.address.state || ''
    formModel.value.city = user.value?.address.city || ''
    formModel.value.postalCode = user.value?.address.postalCode || ''
  }
  formRef.value?.clearValidate()
}

const handleCancel = () => {
  isEdit.value = false
  formRef.value?.clearValidate()
}

const updateProfile = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // Send data to store or backend here
      ElMessage.success('Profile updated successfully!')
      isEdit.value = false
    } else {
      ElMessage.error('Please complete all required fields.')
    }
  })
}

watch(locale, () => {
  formRef.value?.validate()
})

onMounted(() => {
  authStore.fetchActiveUser(userId.value).then(() => {
    if (user.value) {
      formModel.value.username = user.value.username
      formModel.value.email = user.value.email
      formModel.value.firstname = user.value.firstName
      formModel.value.lastname = user.value.lastName
      formModel.value.birthDate = user.value.birthDate
      formModel.value.age = user.value.age
      formModel.value.phone = user.value?.phone
      formModel.value.state = user.value.address.state
      formModel.value.city = user.value.address.city
      formModel.value.postalCode = user.value.address.postalCode
    }
  })
})
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_product.scss' as product;
@use '@/assets/styles/_utilities.scss' as utilities;

@include product.spacers;
@include product.flex;
@include product.buttons;

.user-profile {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: #fff;
  padding: 30px;
  @include breakpoint.xs {
    padding: 15px;
  }
  .el-card__body {
    padding: 0px;
  }
  .is-edit {
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .action-buttons {
    .btn {
      width: auto;
    }
    @include breakpoint.xs {
      @include utilities.flexbox(column, null, null, 10px);
      width: 100%;
      .btn {
        width: 100%;
      }
    }
  }
}
</style>
