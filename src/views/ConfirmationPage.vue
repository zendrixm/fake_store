<template>
  <div class="confirmation">
    <div class="confirmation-wrapper">
      <el-result
        icon="success"
        title="Checkout Successful"
        sub-title="Your order has been placed successfully!"
      >
        <template #extra>
          <el-button class="btn-solid-primary" @click="$router.push('/')"
            >Continue Shopping</el-button
          >
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.btn-solid-primary {
  background: #134074;
  border: 1px solid #134074;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
  color: #fff;
  padding: 15px;

  &:hover {
    background: #8da9c4;
    border: 1px solid #8da9c4;
    color: #fff;
  }
}

.confirmation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: #f5f5f5;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  max-width: 600px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
}
</style>
