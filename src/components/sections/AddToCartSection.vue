<template>
  <div class="cart-wrapper">
    <h2 class="txtOrange">Shopping Cart</h2>
    <el-table
      v-if="products.length"
      :data="products"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      row-key="id"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="Image" width="100">
        <template #default="{ row }">
          <img :src="row.image" alt="" width="50" height="60" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Product" />
      <el-table-column prop="price" label="Unit price">
        <template #default="{ row }"> ${{ row.price.toFixed(2) }} </template>
      </el-table-column>
      <el-table-column label="Quantity" width="200">
        <template #default="{ row }">
          <el-input-number
            v-model="row.quantity"
            :min="1"
            @change="(val: number) => handleQuantityChange(val, row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Subtotal">
        <template #default="{ row }"> ${{ (row.price * row.quantity).toFixed(2) }} </template>
      </el-table-column>
      <el-table-column label="Action" align="center" width="80">
        <template #default="{ row }">
          <el-button class="cart-btn" @click="removeProduct(row.id)">
            <el-icon :size="18" color="#F63">
              <Delete />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="cart-total">
      <el-text>Total ({{ selectedIds.length }} items): </el-text>
      <el-text class="txtOrange">
        ${{
          products
            .filter((p) => selectedIds.includes(p.id))
            .reduce((sum, p) => sum + p.price * p.quantity, 0)
            .toFixed(2)
        }}</el-text
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type PropType } from 'vue'
import type { CartProduct } from '@/types/ProductContext'
import { Delete } from '@element-plus/icons-vue'

defineProps({
  products: {
    type: Array as PropType<CartProduct[]>,
    default: () => [],
  },
})

const emits = defineEmits(['handleQuantityChange', 'removeProduct', 'selectionChange'])

const selectedIds = ref<number[]>([])
const handleSelectionChange = (rows: CartProduct[]) => {
  selectedIds.value = rows.map((r) => r.id)
  emits('selectionChange', selectedIds.value)
}

const handleQuantityChange = (val: number, row: CartProduct) => {
  emits('handleQuantityChange', { value: val, product: row })
}

const removeProduct = (id: number) => {
  emits('removeProduct', id)
}
</script>

<style lang="scss">
.cart-wrapper {
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.cart-total {
  margin-top: 20px;
  text-align: right;
  font-weight: bold;
}

.cart-btn {
  border: none;
  background: transparent;
  padding: 0;
}

.txtOrange {
  color: #f63 !important;
}

.el-checkbox__input {
  &.is-checked,
  &.is-indeterminate {
    .el-checkbox__inner {
      background: #ee4d2d;
      border-color: #ee4d2d;
    }
  }
}

.el-input-number {
  .el-input__inner {
    color: #f63;
    font-size: 14px;
  }
}
</style>
