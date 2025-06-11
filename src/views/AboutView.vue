<template>
  <el-card>
    <h2>About this project</h2>
    <el-text>
      Hi, I’m <strong>Zendrix Mae Caagbay</strong> — a frontend developer passionate about creating
      clean, responsive, and user-friendly web applications. This project is a mock eCommerce site
      built to demonstrate my frontend skills using modern tools and best practices.
    </el-text>

    <el-divider content-position="left"><h3>Tech Stack</h3></el-divider>
    <ul class="tech-list">
      <li>Vue 3 + Composition API</li>
      <li>TypeScript</li>
      <li>Element Plus (UI Components)</li>
      <li>Pinia (State Management)</li>
      <li>Vue Router</li>
      <li>SCSS</li>
      <li>Axios</li>
      <li>Dummy JSON API (for mock data)</li>
    </ul>

    <el-divider content-position="left"><h3>Key Features</h3></el-divider>
    <ul class="feature-list">
      <li>Login & Signup with form validation</li>
      <li>Product listing with category filtering</li>
      <li>Product details and dynamic routing</li>
      <li>Add to cart with quantity and syncing</li>
      <li>Checkout with cart summary and form</li>
      <li>Confirmation page after order</li>
    </ul>

    <el-divider content-position="left"><h3>To-Do / Developer Notes</h3></el-divider>
    <h4>General Cleanup</h4>
    <ul class="todo-list">
      <li>Improve accessibility (labels, alt text, button roles)</li>
    </ul>

    <h4>API & Store</h4>
    <ul class="todo-list">
      <li>Centralize API base URL in config/api.ts (or use .env)</li>
      <li>Move all raw fetch calls to api/ directory</li>
      <li>Refactor store files (AuthStore, CartStore, etc.) to be cleaner and modular</li>
      <li>Add types/interfaces for API responses</li>
    </ul>

    <h4>Validation & Forms</h4>
    <ul class="todo-list">
      <li>Add error states for failed updates or invalid inputs</li>
    </ul>

    <h4>UI Enhancements</h4>
    <ul class="todo-list">
      <li>Implement modals (confirmation before saving changes, deleting items, etc.)</li>
      <li>Refactor notifications: use ElNotification via utils/notification.ts</li>
      <li>Improve mobile responsiveness on profile and checkout views</li>
      <li>Utilize Tailwind CSS (e.g. for responsive design and utility classes)</li>
    </ul>

    <el-divider content-position="left"><h3>Purpose</h3></el-divider>
    <el-text>
      I built this project to sharpen my frontend skills and simulate a realistic eCommerce
      application. It helped me improve my understanding of Vue’s Composition API, UI component
      libraries, and managing user interaction with clean state logic.
    </el-text>

    <el-divider content-position="left"><h3>Contact</h3></el-divider>
    <el-text>You can reach me at:</el-text>
    <br />
    <el-link href="mailto:zienmae@gmail.com">zienmae@gmail.com</el-link><br />
    <el-link href="https://www.linkedin.com/in/zendrixcaagbay/" target="_blank">LinkedIn</el-link
    ><br />
    <el-link href="https://github.com/zendrixm/fake_store" target="_blank">GitHub</el-link>

    <el-divider />
    <el-row type="flex" align="middle">
      <el-text class="mar-r-5"> Product data is powered by the</el-text>
      <el-link href="https://dummyjson.com/" target="_blank">Dummy JSON API</el-link>.
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
// No script needed unless you want to fetch dynamic data later
</script>

<style scoped lang="scss">
@use '@/assets/styles/_product.scss' as product;

@include product.margins;
ul {
  padding-left: 20px;
  li {
    line-height: 22px;
    color: #606266;
    font-size: 14px;
  }
}
.tech-list,
.feature-list {
  list-style-type: disc;
}

.todo-list {
  list-style-type: '✔ ';
}
</style>
