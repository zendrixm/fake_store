<template>
  <div class="v-spacer-30" />
  <div v-for="(review, id) in reviewDetails" :key="id" class="review-container">
    <el-row align="top">
      <el-col :md="2" :sm="3" :xs="5" class="flex-center">
        <div class="avatar-initial">
          {{ getInitial(review.reviewerName) }}
        </div>
      </el-col>
      <el-col :md="22" :sm="21" :xs="19" class="flex-column">
        <div>
          <el-text class="txtSize12 font-weight-bold">{{ review.reviewerName }}</el-text>
          <el-divider direction="vertical" />
          <el-text> {{ formatRelativeTime(review.date) }}</el-text>
        </div>
        <el-rate
          :model-value="review.rating"
          disabled
          show-score
          :max="5"
          :colors="['#F7BA2A', '#F7BA2A', '#F7BA2A']"
          class="txtSize10"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :md="2" :sm="3" :xs="5" />
      <el-col :md="22" :sm="21" :xs="19">
        <el-text class="txtSize12">{{ review.comment }}</el-text>
      </el-col>
    </el-row>
    <el-divider direction="horizontal" />
  </div>
</template>

<script lang="ts" setup>
import { formatRelativeTime, getInitial } from '@/utils/Formatter'

defineProps({
  reviewDetails: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_product.scss' as product;
@use '@/assets/styles/_utilities.scss' as utilities;

@include product.fontColors;
@include product.fontWeights;
@include product.paddings;
@include product.flex;

.avatar-initial {
  padding: 10px 15px;
  border: 1px solid;
  border-radius: 10px;
  background: #0b2545;
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  width: min-content;
}
.review-container {
  @include utilities.flexbox(column);
}
</style>
