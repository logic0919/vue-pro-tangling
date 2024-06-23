<template>
  <div class="footerBox">
    <div class="top">
      已有<em
        style="
          background-color: black;
          color: white;
          margin-left: 7px;
          margin-right: 7px;
        "
        >00171399</em
      >位访客浏览该网站
    </div>
    <div class="mid">
      <div class="main">
        <div class="left">
          <img
            src="https://ysdh-ysxy.xaut.edu.cn/static/picture/lion_3.png"
            alt=""
          />
          <div class="text">友情链接</div>
        </div>
        <div class="zhong">
          <div class="a">
            <div>国家博物馆</div>
            <div>故宫博物院</div>
            <div>陕西历史博物馆</div>
          </div>
          <div class="b">
            <div>西安博物院</div>
            <div>陕西省文物局</div>
            <div>汉唐网</div>
          </div>
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
  height: 240px;
  .top {
    height: 20%;
    background-color: rgb(27, 114, 188);
    text-align: center;
    line-height: 40px;
    color: rgb(255, 255, 255);
    letter-spacing: 3px;
  }
  .mid {
    height: 55%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(81, 146, 203);
    .main {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        color: rgb(255, 255, 255);
      }
      .zhong {
        .a,
        .b {
          display: flex;
          flex-wrap: wrap;
          color: rgb(255, 255, 255);
          div {
            margin: 10px;
          }
        }
      }
      .right {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: rgb(255, 255, 255);
      }
    }
  }
  .foot {
    height: 25%;
    display: flex;
    justify-content: center;
    color: rgb(255, 255, 255);
    align-items: center;
    background-color: rgb(27, 114, 188);
  }
}
</style>
