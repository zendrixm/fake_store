<template>
  <el-row class="footer-container common-container">
    <div class="footer-left-container">
      <el-text>{{ $t('footer.eloura') }}</el-text>
      <el-divider direction="vertical" />
      <el-text>{{ $t('footer.poweredBy') }}</el-text>
      <el-divider direction="vertical" />
      <el-text>{{ $t('footer.allRightsReserved') }}</el-text>
      <el-divider direction="vertical" />
      <!--Update to version 1.0.4-->
      <!-- Replaced Fake Store API with Dummy JSON API-->
      <!-- Improve product card and product view details page (Adding discount price/percentage, wishlist icon,)-->
      <!--Improve UI and mobile layout -->
      <el-text>{{ $t('footer.version', { ver: '1.0.4' }) }}</el-text>
    </div>
    <div class="footer-right-container">
      <el-text>{{ $t('footer.developedBy') }}</el-text>
      <el-link href="mailto:zienmae@gmail.com?body=Hi Zendrix,">Zendrix Mae Caagbay</el-link>
    </div>
  </el-row>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;
@use '@/assets/styles/_utilities.scss' as utilities;
.footer-container {
  background-color: #f5f5f5;
  color: #333;
  @include utilities.flexbox(null, space-between, null, 5px);
  @include breakpoint.xs {
    padding: 20px 10px;
  }

  .footer-left-container {
    @include breakpoint.xs {
      @include utilities.flexbox(column, flex-start, flex-start, 5px);
      .el-divider--vertical {
        display: none;
      }
    }
  }

  .footer-right-container {
    @include utilities.flexbox(null, null, flex-start, 5px);
    @include breakpoint.xs {
      margin-top: 10px;
    }
  }
}
</style>
