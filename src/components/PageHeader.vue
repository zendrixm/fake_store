<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <h1 class="title-text align-right txtWhite">FakeStore</h1>
    </el-col>
    <el-col :span="16">
      <el-input
        v-model="localSearchTerm"
        placeholder="Search product"
        clearable
        :suffix-icon="Search"
        @input="onInput"
      />
    </el-col>
    <el-col :span="4">
      <el-button class="cart-btn">
        <el-icon :size="20" color="#FFF" style="vertical-align: middle">
          <ShoppingCart />
        </el-icon>
      </el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search, ShoppingCart } from '@element-plus/icons-vue'

const emit = defineEmits(['search'])

const localSearchTerm = ref('')

const onInput = () => {
  emit('search', localSearchTerm.value)
}
</script>

<style lang="scss" scoped>
.txtWhite {
  color: #fff !important;
}
.align-right {
  text-align: right;
}
.title-text {
  font-size: 24px;
  margin: 0px;
}
.cart-btn {
  border: none;
  background: transparent;
  padding: 0px;
}
</style>
