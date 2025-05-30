<template>
  <el-dialog v-model="dialogVisible" :show-close="false" class="common-dialog">
    <template #header="{ close, titleClass }">
      <div class="dialog-header">
        <div class="dialog-header-title">
          <div class="dialog-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              :stroke="iconColor"
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="7.5" x2="12" y2="12" />
              <circle cx="12" cy="16" r="0.8" />
            </svg>
          </div>
          <h4 :id="title" :class="titleClass ? titleClass : ''">{{ title }}</h4>
        </div>
        <el-icon @click="close" color="#00549a"><Close /></el-icon>
      </div>
    </template>
    <el-text v-if="message">{{ message }}</el-text>
    <slot v-else name="messageBody" />
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Information',
  },
  titleClass: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info', // info, warning, error
  },
})

const iconColor =
  {
    info: '#0b2545',
    warning: 'orange',
    error: 'red',
  }[props.type] || '#0b2545'

const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;

.common-dialog {
  &.el-dialog {
    --el-dialog-padding-primary: 0px;
    border-radius: 10px;
    min-width: 300px;
    max-width: 700px;
    min-height: 200px;
    @include breakpoint.xs {
      width: auto;
      --el-dialog-margin-top: 0;
      border-radius: 0px;
    }
    .el-dialog__header {
      padding: 15px 20px;
      background: #f5f5f5;
      border-radius: 10px 10px 0px 0px;
      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h4 {
          margin: 0px;
          text-align: left;
        }
        .dialog-header-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      }
    }
    .el-dialog__body {
      padding: 20px;
    }
  }
}
</style>
