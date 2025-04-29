<template>
  <el-row justify="end" class="gap-15">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About Us</router-link>
    <router-link to="/products">Products</router-link>
    <router-link to="/login">Login</router-link>
  </el-row>
</template>

<script setup lang="ts">
// No script needed yet — pure layout
</script>

<style lang="scss">
a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.gap-15 {
  gap: 15px;
}
</style>
