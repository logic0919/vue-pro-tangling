<template>
  <div class="footerBox">
    <div class="top">已有<em>00171399</em>位访客浏览该网站</div>
    <div class="mid">
      <div class="main">
        <div class="left"></div>
        <div class="zhong">
          <div>国家博物馆</div>
          <div>故宫博物院</div>
          <div>陕西历史博物馆</div>
          <div>西安博物院</div>
          <div>陕西省文物局</div>
          <div>汉唐网</div>
        </div>
        <div class="right">
          <div>技术支持:西安理工大学计算机科学与工程学院</div>
          <div>版权所有:西安理工大学艺术与设计学院影像动画系</div>
          <div>电子邮箱:272098872@gq.com</div>
        </div>
      </div>
    </div>
    <div class="foot">版权所有，未经许可，严禁转载。</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footerBox {
  height: 400px;
  .top {
    height: 20%;
    background-color: rgb(27, 114, 188);
    text-align: center;
    line-height: 40px;
  }
  .mid {
    height: 55%;
    display: flex;
    align-items: center;
    .main {
      height: 50%;
      display: flex;
      align-items: center;
      .left {
      }
      .zhong {
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
  .foot {
    height: 25%;
  }
}
</style>
