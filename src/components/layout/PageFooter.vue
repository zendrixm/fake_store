<template>
  <el-row class="footer-container common-container">
    <div class="footer-left-container">
      <el-text>{{ $t('footer.eloura') }}</el-text>
      <el-divider direction="vertical" />
      <el-text>{{ $t('footer.poweredBy') }}</el-text>
      <el-divider direction="vertical" />
      <el-text>{{ $t('footer.allRightsReserved') }}</el-text>
      <el-divider direction="vertical" />
      <el-text>{{ $t('footer.version', { ver: '1.0.0' }) }}</el-text>
    </div>
    <div class="footer-right-container">
      <el-text>{{ $t('footer.developedBy') }}</el-text>
      <el-link class="txtDarkBlue" href="mailto:zienmae@gmail.com?body=Hi Zendrix,"
        >Zendrix Mae Caagbay</el-link
      >
    </div>
  </el-row>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoint.scss' as breakpoint;

.common-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 30px;
  @include breakpoint.xs {
    padding: 10px;
  }
}
.footer-container {
  display: flex;
  gap: 5px;
  padding: 20px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 14px;

  .txtDarkBlue {
    color: #0b2545;
  }

  .footer-left-container {
    width: 100%;
    @include breakpoint.xs {
      display: flex;
      flex-direction: column;
    }
    .el-text {
      @include breakpoint.xs {
        align-self: flex-start;
      }
    }
    .el-divider--vertical {
      @include breakpoint.xs {
        display: none;
      }
    }
  }

  .footer-right-container {
    display: flex;
    align-items: center;
    gap: 5px;
    @include breakpoint.xs {
      margin-top: 10px;
    }
  }
}
</style>
