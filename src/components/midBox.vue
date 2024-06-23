<script setup>
const data1 = [
  {
    src: 'https://ysdh-ysxy.xaut.edu.cn/images/nav-img1.jpg',
    chin: '唐十八陵简介',
    eng: 'Introduction of the Mausoleum'
  },
  {
    src: 'https://ysdh-ysxy.xaut.edu.cn/images/nav-img5.jpg',
    chin: '全景陵墓',
    eng: 'The whole view of the mausoleum'
  },
  {
    src: 'https://ysdh-ysxy.xaut.edu.cn/images/nav-img6.jpg',
    chin: '三维模型',
    eng: 'Three-dimensional model'
  },
  {
    src: 'https://ysdh-ysxy.xaut.edu.cn/images/nav-img3.jpg',
    chin: '图书著作',
    eng: 'Book works'
  }
]
const data2 = [
  {
    src: 'https://ysdh-ysxy.xaut.edu.cn/images/nav-img2.jpg',
    chin: '记录短片',
    eng: 'A short documentary'
  },
  {
    src: 'https://ysdh-ysxy.xaut.edu.cn/images/nav-img4.jpg',
    chin: '张辉艺术作品',
    eng: 'Art works of Zhang Hui'
  },
  {
    src: 'https://ysdh-ysxy.xaut.edu.cn/images/nav-img8.jpg',
    chin: '展览讯息',
    eng: 'Exhibition information'
  },
  {
    src: 'https://ysdh-ysxy.xaut.edu.cn/images/nav-img7.jpg',
    chin: '关于我们',
    eng: 'About us'
  }
]
</script>

<template>
  <div class="midBox">
    <div class="a">
      <div class="item" v-for="i in data1" :key="i">
        <img :src="i.src" alt="" />
        <div class="text">
          <div class="chin">{{ i.chin }}</div>
          <div class="eng">{{ i.eng }}</div>
        </div>
      </div>
    </div>
    <div class="b">
      <div class="item" v-for="i in data2" :key="i">
        <img :src="i.src" alt="" />
        <div class="text">
          <div class="chin">{{ i.chin }}</div>
          <div class="eng">{{ i.eng }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.midBox {
  .a,
  .b {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .item {
      width: 240px;
      height: 240px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .text {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        position: absolute;
        bottom: 0;
        z-index: 11;
        background-color: rgba(63, 125, 176, 0.7);
        .chin,
        .eng {
          color: rgb(255, 255, 255);
        }
        .eng {
          font-size: 8px;
        }
      }
    }
  }
}
</style>
