<template>
  <div class="cart-wrapper">
    <h2 class="txtDarkBlue">{{ $t('shoppingCart') }}</h2>
    <div class="v-spacer-15" />
    <!-- Scrollable Table View for Tablet and Larger -->
    <div class="table-scroll-wrapper" v-if="dummyProducts?.length">
      <el-table
        class="cart-table hidden-xs"
        :data="dummyProducts"
        stripe
        @selection-change="handleSelectionChange"
        row-key="id"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="" width="120">
          <template #default="{ row }">
            <img :src="row.thumbnail" :alt="row.title" width="70" height="80" />
          </template>
        </el-table-column>
        <el-table-column prop="title" :label="$t('product')" width="280" />
        <el-table-column prop="price" :label="$t('unitPrice')" width="170">
          <template #default="{ row }"> ${{ row.price.toFixed(2) }} </template>
        </el-table-column>
        <el-table-column :label="$t('quantity')" width="220">
          <template #default="{ row }">
            <el-input-number
              v-model="row.quantity"
              :min="1"
              @change="(val: number) => handleQuantityChange(val, row)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('subtotal')" width="170">
          <template #default="{ row }"> ${{ (row.price * row.quantity).toFixed(2) }} </template>
        </el-table-column>
        <el-table-column :label="$t('action')" align="center" width="80">
          <template #default="{ row }">
            <el-button class="btn-icon flex-end" @click="removeProduct(row.id)">
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
          v-if="dummyProducts?.length"
          v-model="selectedIds"
          class="cart-card-mobile"
          @change="() => emits('selectionChange', selectedIds)"
        >
          <div class="cart-card" v-for="product in dummyProducts" :key="product.id">
            <div class="card-header">
              <el-checkbox :value="product.id" />
              <img :src="product.thumbnail" alt="Product Image" class="product-img" />
            </div>
            <div class="card-body">
              <el-text class="product-title">{{ product.title }}</el-text>
              <el-row>
                <el-text class="font-weight-bold">{{ $t('unitPrice') }}</el-text>
                <div class="spacer-5" />
                <el-text>${{ product.price.toFixed(2) }}</el-text>
              </el-row>
              <el-row>
                <el-text class="font-weight-bold">{{ $t('subtotal') }} </el-text>
                <div class="spacer-5" />
                <el-text>${{ (product.price * product.quantity).toFixed(2) }}</el-text>
              </el-row>
              <el-input-number
                v-model="product.quantity"
                :min="1"
                @change="(val: number) => handleQuantityChange(val, product)"
              />

              <el-button class="btn-icon flex-end" @click="removeProduct(product.id)">
                <el-icon :size="18" color="#00549a">
                  <Delete />
                </el-icon>
              </el-button>
            </div>
          </div>
        </el-checkbox-group>

        <div class="cart-total" v-if="dummyProducts?.length">
          <div class="check-all-wrapper">
            <el-checkbox
              :label="$t('all')"
              :model-value="isAllSelected"
              :indeterminate="isIndeterminate"
              @change="handleCheckAll"
              class="hidden-sm-and-up"
            />
          </div>
          <div class="total-wrapper">
            <div class="flex gap-5">
              <el-text>{{ $t('total') }}: </el-text>
              <el-text class="txtDarkBlue font-weight-bold"> ${{ total }} </el-text>
            </div>
            <el-button class="btn btn-primary" @click="handleCheckout">
              {{ $t('checkout') }}
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { CartItem } from '@/types/ProductContext'
import { Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const props = defineProps({
  products: {
    type: Object,
  },
})

const emits = defineEmits(['handleQuantityChange', 'removeProduct', 'selectionChange'])

const selectedIds = ref<number[]>([])
const dummyProducts = computed<CartItem[]>(() => props.products?.products)

const total = computed(() => {
  return dummyProducts.value
    .filter((p: CartItem) => selectedIds.value.includes(p.id))
    .reduce((sum, p) => sum + p.price * p.quantity, 0)
    .toFixed(2)
})

const isAllSelected = computed(() => selectedIds.value.length === dummyProducts.value?.length)
const isIndeterminate = computed(() => selectedIds.value.length > 0 && !isAllSelected.value)

const handleSelectionChange = (rows: CartItem[]) => {
  selectedIds.value = rows.map((r) => r.id)
  emits('selectionChange', selectedIds.value)
}

const handleQuantityChange = (val: number, product: CartItem) => {
  console.log('handleQuantityChange', val, product)
  emits('handleQuantityChange', { value: val, product })
}

const removeProduct = (id: number) => {
  emits('removeProduct', id)
}

const handleCheckAll = (val: boolean) => {
  selectedIds.value = val ? (dummyProducts.value?.map((p: CartItem) => p.id) ?? []) : []
  emits('selectionChange', selectedIds.value)
}

const handleCheckout = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('Please select at least one product to checkout.')
    return
  }

  // Navigate to confirmation page or show a message
  router.push('/confirmation')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_product.scss' as product;
@use '@/assets/styles/_utilities.scss' as utilities;

@include product.buttons;
@include product.fontColors;
@include product.fontWeights;
@include product.spacers;
@include product.display;
@include product.flex;
@include product.gaps;

.cart-wrapper {
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  .cart-table {
    min-width: 900px;
  }
}

.cart-card-mobile {
  display: none;
  @include breakpoint.xs {
    @include utilities.flexbox(column, null, null, 16px);
    margin: 0px 0px 20px;
  }
  .cart-card {
    padding: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    @include utilities.flexbox(row, null, flex-start, 12px);

    .card-header {
      @include utilities.flexbox(row, null, flex-start, 0px);

      .product-img {
        width: 70px;
        height: 80px;
        object-fit: contain;
      }
    }

    .card-body {
      @include utilities.flexbox(column, null, null, 20px);
      width: 100%;
      .product-title {
        font-weight: bold;
        color: #00549a;
        line-height: normal;
        white-space: pre-wrap;
      }
    }
  }
}

.table-scroll-wrapper {
  overflow-x: auto;
}

.hidden-sm-and-up {
  @include breakpoint.xs {
    display: inline-flex;
  }
}

.cart-total {
  margin-top: 30px;
  @include utilities.flexbox(row, space-between, center);
}

.total-wrapper {
  @include utilities.flexbox(row, flex-end, center, 15px);
}
</style>
