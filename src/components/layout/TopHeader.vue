<template>
  <div class="justify-end gap-15 main-container">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About Us</router-link>
    <router-link to="/products">Products</router-link>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script setup lang="ts">
// No script needed yet — pure layout
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
  margin: 0 auto;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.gap-15 {
  gap: 15px;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
