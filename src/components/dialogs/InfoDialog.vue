<template>
  <el-dialog
    v-model="dialogVisible"
    :show-close="false"
    :max-width="width ? width : 400"
    class="common-dialog"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="dialog-header">
        <h4 :id="titleId" :class="titleClass ? titleClass : ''">{{ title }}</h4>
        <el-icon @click="close" color="#00549a"><Close /></el-icon>
      </div>
    </template>
    <slot />
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
  width: {
    type: String,
    default: '400',
  },
})

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
    width: 700px;
    @include breakpoint.xs {
      --el-dialog-width: 100% !important;
      width: auto;
      margin: 10px;
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
        }
      }
    }
    .el-dialog__body {
      padding: 20px;
    }
  }
}
</style>
