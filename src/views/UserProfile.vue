<template>
  <div class="user-profile" v-if="user">
    <div class="space-between">
      <h3>
        {{ capitalize(user.name.firstname) }}
        {{ capitalize(user.name.lastname) }}
      </h3>
      <el-icon :size="16" @click="toggleEdit">
        <img src="@/assets/icons/edit.svg" :width="16" :height="16" alt="edit" />
      </el-icon>
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
          {{ capitalize(user.name.firstname) }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('lastName')" prop="lastname" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.lastname" />
        <el-text v-else>
          {{ capitalize(user.name.lastname) }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('phone')" prop="phone" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.phone" />
        <el-text v-else>
          {{ user.phone }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('street')" prop="street" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.street" />
        <el-text v-else>
          {{ capitalize(user.address.street) }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('city')" prop="city" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.city" />
        <el-text v-else>
          {{ capitalize(user.address.city) }}
        </el-text>
      </el-form-item>

      <el-form-item :label="$t('zipCode')" prop="zipcode" :required="isEdit">
        <el-input v-if="isEdit" v-model="formModel.zipcode" />
        <el-text v-else>
          {{ user.address.zipcode }}
        </el-text>
      </el-form-item>
    </el-form>

    <div class="v-spacer-20" />
    <div v-if="isEdit" class="flex-end">
      <el-button class="btn-solid-primary" @click="updateProfile">{{ $t('save') }}</el-button>
      <el-button class="btn-secondary" @click="isEdit = false">{{ $t('cancel') }}</el-button>
    </div>
  </div>

  <el-text v-else>Loading profile...</el-text>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/AuthStore'
import { capitalize } from '@/utils/Formatter'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

const authStore = useAuthStore()
const user = computed(() => authStore.userProfile)
const { t, locale } = useI18n()
const isEdit = ref(false)
const formRef = ref<FormInstance>()

const formModel = ref({
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  phone: '',
  street: '',
  city: '',
  zipcode: '',
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
  phone: [requiredRule('phone')],
  street: [requiredRule('street')],
  city: [requiredRule('city')],
  zipcode: [requiredRule('zipCode')],
}

const toggleEdit = () => {
  isEdit.value = !isEdit.value
  if (isEdit.value) {
    formRef.value?.resetFields()

    formModel.value.username = user.value?.username || ''
    formModel.value.email = user.value?.email || ''
    formModel.value.firstname = user.value?.name.firstname || ''
    formModel.value.lastname = user.value?.name.lastname || ''
    formModel.value.phone = user.value?.phone || ''
    formModel.value.street = user.value?.address.street || ''
    formModel.value.city = user.value?.address.city || ''
    formModel.value.zipcode = user.value?.address.zipcode || ''
  }
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
  authStore.fetchUserProfile().then(() => {
    const u = authStore.userProfile
    if (u) {
      formModel.value.username = u.username
      formModel.value.email = u.email
      formModel.value.firstname = u.name.firstname
      formModel.value.lastname = u.name.lastname
      formModel.value.phone = u.phone
      formModel.value.street = u.address.street
      formModel.value.city = u.address.city
      formModel.value.zipcode = u.address.zipcode
    }
  })
})
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;

h3 {
  margin: 0px;
}
.v-spacer-20 {
  height: 20px;
}

.user-profile {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: #fff;
  padding: 30px;
  .el-form-item {
    @include breakpoint.xs {
      flex-direction: column;
    }
    &.is-error {
      margin-bottom: 25px;
    }
    &:not(.is-error) {
      margin-bottom: 15px;
    }
    .el-form-item__label {
      width: 180px;
      margin-bottom: 0px;
      @include breakpoint.xs {
        display: flex;
        justify-content: flex-start;
      }
    }

    .el-input {
      width: 240px;
      @include breakpoint.xs {
        width: 100%;
      }
    }
  }

  .is-edit {
    .el-form-item {
      margin-bottom: 0px;
    }
  }
}

.space-between {
  display: flex;
  justify-content: space-between;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}

.el-button {
  border-radius: 8px;
}

.btn-solid-primary {
  background: #134074;
  border: 1px solid #134074;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
  color: #fff;
  padding: 15px;
  width: auto;

  &:hover {
    background: #8da9c4;
    border: 1px solid #8da9c4;
    color: #fff;
  }
}

.btn-secondary {
  background: transparent;
  border: 1px solid #134074;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
  color: #134074;
  padding: 15px;

  &:hover {
    background: #8da9c4 !important;
    border: 1px solid #8da9c4;
    color: #134074 !important;
  }
}
</style>
