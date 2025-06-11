<template>
  <el-row v-if="details" :span="24">
    <el-col :md="10" class="image-column">
      <el-carousel
        :interval="3000"
        :arrow="details.images?.length > 1 ? 'hover' : 'never'"
        :indicator-position="details.images?.length > 1 ? 'outside' : 'none'"
        circle
      >
        <el-carousel-item v-for="(image, index) in details.images" :key="index">
          <img class="product-image" :src="image" :alt="`${details.title} ${index}`" />
        </el-carousel-item>
      </el-carousel>
    </el-col>

    <el-col :md="14" class="info-column">
      <div class="product-details">
        <h4 v-if="details.brand">{{ details.brand }}</h4>
        <div v-if="details.sku">
          <el-text class="font-weight-bold">SKU: </el-text>
          <el-text>{{ details.sku }}</el-text>
        </div>
        <div v-if="details.availabilityStatus" class="availability-status">
          <el-icon>
            <component :is="statusIcon.icon" :size="20" :color="statusIcon.color" />
          </el-icon>
          <el-text>{{ details.availabilityStatus }}</el-text>
        </div>
      </div>
      <div class="v-spacer-15" />
      <h1>{{ details.title }}</h1>
      <div class="v-spacer-15" />
      <el-text>{{ details.description }}</el-text>
      <div class="v-spacer-15" />
      <el-row v-if="details.reviews" align="middle">
        <el-rate
          :model-value="details.rating"
          disabled
          show-score
          :max="5"
          :colors="['#F7BA2A', '#F7BA2A', '#F7BA2A']"
          class="txtSize16"
        />
        <el-divider direction="vertical" />
        <span class="txtSize14">{{ details.stock }} {{ $t('stock') }}</span>
      </el-row>
      <div class="v-spacer-5" />
      <p class="txtBlue font-weight-bold txtSize18">
        {{ formatCurrency(details.price) }}
      </p>

      <div class="v-spacer-5" />
      <!-- Quantity Selector -->
      <el-row align="middle">
        <el-text class="font-weight-bold mar-r-5"> {{ $t('quantity') }}: </el-text>
        <el-input-number v-model="quantity" :min="1" :max="100" size="small" />
      </el-row>

      <div class="v-spacer-20" />

      <el-text class="font-weight-bold mar-r-5"> Shipping information:</el-text>
      <el-text>
        {{ productDetails.shippingInformation }}
      </el-text>

      <div class="v-spacer-30" />
      <div class="v-spacer-30" />

      <!-- Action Buttons -->
      <div class="action-buttons">
        <el-button class="btn btn-secondary w-auto" @click="handleAddToCart">
          <el-icon :size="20" color="#0b2545" class="icon-align">
            <ShoppingCart />
          </el-icon>
          <span> {{ $t('addToCart') }}</span>
        </el-button>

        <el-button class="btn btn-primary w-auto"> {{ $t('buyNow') }}</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, computed, type PropType } from 'vue'
import { formatCurrency } from '@/utils/Formatter'
import { ShoppingCart, WarningFilled, CircleCheckFilled } from '@element-plus/icons-vue'
import type { DummyProduct } from '@/types/ProductContext'
const props = defineProps({
  productDetails: {
    type: Object as PropType<DummyProduct>,
    default: () => ({}),
  },
})

const emit = defineEmits(['addToCart'])
const details = computed(() => props.productDetails)
const quantity = ref(1)

const statusIcon = computed(() => {
  if (details.value.availabilityStatus == 'In Stock') {
    return { icon: CircleCheckFilled, color: 'green' }
  } else if (details.value.availabilityStatus == 'Low Stock') {
    return { icon: WarningFilled, color: 'yellow' }
  } else {
    return { icon: WarningFilled, color: 'red' }
  }
})

const handleAddToCart = () => {
  emit('addToCart', { productId: details.value.id, quantity: quantity.value })
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_utilities.scss' as utilities;
@use '@/assets/styles/_product.scss' as product;

@include product.buttons;
@include product.spacers;
@include product.fontColors;
@include product.fontWeights;
@include product.fontSizes;
@include product.margins;
@include product.width;

.image-column {
  @include utilities.flexbox(row, center, center);
  .product-image {
    width: 180px;
    height: 200px;
    @include breakpoint.md {
      width: 280px;
      height: 300px;
    }
  }
}
.info-column {
  .product-details {
    @include utilities.flexbox(row, flex-start, center, 40px);
    @include breakpoint.xs {
      @include utilities.flexbox(column, flex-start, flex-start, 5px);
    }
  }
  .availability-status {
    @include utilities.flexbox(row, flex-start, center, 5px);
  }
}
.action-buttons {
  @include utilities.flexbox(row, null, null, 10px);
  @include breakpoint.xs {
    @include utilities.flexbox(column, null, null, 15px);
  }
  .icon-align {
    vertical-align: middle;
  }
}
</style>

<style lang="scss">
@use '@/assets/styles/breakpoint.scss' as breakpoint;

.image-column {
  @include breakpoint.xs {
    margin-bottom: 30px;
  }
  .el-carousel__container {
    height: 180px !important;
    width: 200px;
    @include breakpoint.md {
      width: 300px;
      height: 300px !important;
    }
  }
}
</style>
