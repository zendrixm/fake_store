<template>
  <div class="cart-wrapper">
    <h2 class="txtDarkBlue">Shopping Cart</h2>

    <!-- Scrollable Table View for Tablet and Larger -->
    <div class="table-scroll-wrapper" v-if="products.length">
      <el-table
        class="cart-table"
        :data="products"
        stripe
        @selection-change="handleSelectionChange"
        row-key="id"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="Image" width="120">
          <template #default="{ row }">
            <img :src="row.image" :alt="row.title" width="70" height="80" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Product" width="280" />
        <el-table-column prop="price" label="Unit price" width="170">
          <template #default="{ row }"> ${{ row.price.toFixed(2) }} </template>
        </el-table-column>
        <el-table-column label="Quantity" width="220">
          <template #default="{ row }">
            <el-input-number
              v-model="row.quantity"
              :min="1"
              @change="(val: number) => $emit('handleQuantityChange', val, row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="Subtotal" width="170">
          <template #default="{ row }"> ${{ (row.price * row.quantity).toFixed(2) }} </template>
        </el-table-column>
        <el-table-column label="Action" align="center" width="80">
          <template #default="{ row }">
            <el-button class="cart-btn" @click="removeProduct(row.id)">
              <el-icon :size="18" color="#00549a">
                <Delete />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24">
        <!-- Card View for Mobile -->
        <el-checkbox-group
          v-if="products.length"
          v-model="selectedIds"
          class="cart-card-mobile"
          @change="() => emits('selectionChange', selectedIds)"
        >
          <div class="cart-card" v-for="product in products" :key="product.id">
            <div class="card-header">
              <el-checkbox :value="product.id" />
              <img :src="product.image" alt="Product Image" class="product-img" />
            </div>
            <div class="card-body">
              <el-text class="product-title">{{ product.title }}</el-text>
              <el-row>
                <el-text class="txtBold">Unit Price: </el-text>
                <div class="spacer-5" />
                <el-text>${{ product.price.toFixed(2) }}</el-text>
              </el-row>
              <el-row>
                <el-text class="txtBold">Subtotal: </el-text>
                <div class="spacer-5" />
                <el-text>${{ (product.price * product.quantity).toFixed(2) }}</el-text>
              </el-row>
              <el-input-number
                v-model="product.quantity"
                :min="1"
                @change="(val: number) => handleQuantityChange(val, product)"
              />
              <el-button class="cart-btn" @click="removeProduct(product.id)">
                <el-icon :size="18" color="#00549a">
                  <Delete />
                </el-icon>
              </el-button>
            </div>
          </div>
        </el-checkbox-group>

        <div class="cart-total" v-if="products.length">
          <div class="check-all-wrapper">
            <el-checkbox
              label="All"
              :model-value="isAllSelected"
              :indeterminate="isIndeterminate"
              @change="handleCheckAll"
              class="display-xs"
            />
          </div>
          <div class="total-wrapper">
            <div class="flex">
              <el-text>Total: </el-text>
              <el-text class="txtDarkBlue txtBold">
                ${{
                  products
                    .filter((p) => selectedIds.includes(p.id))
                    .reduce((sum, p) => sum + p.price * p.quantity, 0)
                    .toFixed(2)
                }}
              </el-text>
            </div>
            <el-button class="btn-solid-primary" @click="handleCheckout"> Checkout </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, type PropType, computed } from 'vue'
import type { CartProduct } from '@/types/ProductContext'
import { Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useProductStore } from '@/stores/FakeProductStore'

const router = useRouter()
const store = useProductStore()

const props = defineProps({
  products: {
    type: Array as PropType<CartProduct[]>,
    default: () => [],
  },
})

const emits = defineEmits(['handleQuantityChange', 'removeProduct', 'selectionChange'])

const selectedIds = ref<number[]>([])
const userId = ref(2) // Replace with value from auth store when ready
const isAllSelected = computed(() => selectedIds.value.length === props.products.length)
const isIndeterminate = computed(() => selectedIds.value.length > 0 && !isAllSelected.value)

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

const handleCheckAll = (val: boolean) => {
  selectedIds.value = val ? props.products.map((p) => p.id) : []
  emits('selectionChange', selectedIds.value)
}

const handleCheckout = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('Please select at least one product to checkout.')
    return
  }

  await store.checkoutSelectedProducts(userId.value, selectedIds.value)

  // Navigate to confirmation page or show a message
  router.push('/confirmation')
}
</script>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;
.cart-wrapper {
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cart-table {
  min-width: 900px;
}

.table-scroll-wrapper {
  overflow-x: auto;
  margin-bottom: 20px;
  scrollbar-color: #0b2545 #f1f1f1;
  scrollbar-width: auto;

  @include breakpoint.xs {
    display: none; // Hide on mobile
  }
}

.cart-card-mobile {
  display: none;
  @include breakpoint.xs {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0px 0px 20px;
  }

  .cart-card {
    padding: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;

    .card-header {
      display: flex;
      align-items: flex-start;
      gap: 12px;

      .product-img {
        width: 70px;
        height: 80px;
        object-fit: contain;
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .product-title {
        font-weight: bold;
        color: #00549a;
        line-height: normal;
      }

      .el-text {
        align-self: flex-start;
      }
    }
  }
}
.display-xs {
  display: none;
  @include breakpoint.xs {
    display: inline-flex;
  }
}
.el-checkbox__input {
  &.is-checked,
  &.is-indeterminate {
    .el-checkbox__inner {
      background: #0b2545;
      border-color: #0b2545;
    }
  }
}

.el-input-number {
  .el-input__inner {
    color: #0b2545;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;

.cart-table {
  display: block;
  @include breakpoint.xs {
    display: none;
  }
}

.cart-card-mobile {
  display: none;
  @include breakpoint.xs {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
  }

  .cart-card {
    padding: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;

    .card-header {
      display: flex;
      align-items: flex-start;
      gap: 0px;

      .product-img {
        width: 70px;
        height: 80px;
        object-fit: contain;
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .product-title {
        font-weight: bold;
        color: #00549a;
        line-height: normal;
      }

      .el-text {
        align-self: flex-start;
      }
    }
  }
}
.display-xs {
  display: none;
  @include breakpoint.xs {
    display: inline-flex;
  }
}
.cart-btn {
  border: none;
  background: transparent;
  padding: 0;
  @include breakpoint.xs {
    justify-content: flex-end;
  }
}

.cart-total {
  display: flex;
  justify-content: space-between;
}

.total-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 30px;
}
.txtDarkBlue {
  color: #0b2545 !important;
}

.txtBold {
  font-weight: bold;
}

.spacer-5 {
  width: 5px;
}

.flex {
  display: flex;
  gap: 5px;
}

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
</style>
