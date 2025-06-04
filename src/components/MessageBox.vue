<template>
  <div class="message-container" :class="type">
    <div class="message-icon">
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
    <div class="message-content">
      <slot name="message" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    default: 'This is a message box',
  },
  type: {
    type: String,
    default: 'info',
  },
})

const iconColor =
  {
    info: '#0b2545',
    warning: 'orange',
    error: 'red',
  }[props.type] || '#0b2545'
</script>

<style scoped lang="scss">
@use '@/assets/styles/_utilities.scss' as utilities;
.message-container {
  @include utilities.flexbox(row, null, flex-start, 10px);
  padding: 15px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  .message-icon {
    @include utilities.flexbox(row, null, center);
  }

  .message-content {
    flex: 1;
  }
}
</style>
