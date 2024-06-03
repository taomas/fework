<template>
  <view class="home-title">
    <image class="home-title-logo" src="/static/icon-logo.png" />
    <view class="home-title-name">智能王二狗</view>
  </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.home-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 88rpx;
  min-height: 88rpx;
  max-width: 37.5rem;
  padding-left: 24rpx;
  margin: 0 auto;
  background-color: #2A2A2A;

  .home-title-logo {
    display: block;
    width: 60rpx;
    height: 60rpx;
    border-radius: 60rpx;
  }

  .home-title-name {
    margin-left: 20rpx;
    font-size: 28rpx;
    color: #FFFFFF;
  }
}
</style>
