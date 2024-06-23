<template>
  <div class="indexPage">
    <div class="top">
      <div class="left"></div>
      <div class="right">
        <img src="../assets/logo.png" alt="" />
        <div class="a">
          国家文化部科技创新项目《陕西唐十八陵的数字化保护研究》网站
        </div>
        <div class="b">
          The science and technology innovation project of PRc Ministry of
          Culture -Digitalized Protection Research of shaanxi angshiba Mausoleum
          website
        </div>
      </div>
    </div>
    <el-carousel class="lunbo" indicator-position="outside">
      <el-carousel-item v-for="item in imgData" :key="item">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
    <table-box></table-box>
    <div class="intro">
      <div class="text">
        <p>
          唐代帝陵，位于陕西省渭南市、咸阳市境内，是唐王朝修建的帝王陵墓，共有十八座帝陵。
        </p>
        <p>
          唐代帝陵始建于唐贞观十年（636年），历时二百九十年，先后修建了十八座规模庞大，气势宏伟的帝陵。以年代为序分别为唐高祖献陵、唐太宗昭陵、唐高宗和武周女皇合葬的乾陵、唐中宗定陵、唐睿宗桥陵、唐玄宗泰陵、唐肃宗建陵、唐代宗元陵、唐德宗崇陵、唐顺宗丰陵、唐宪宗景陵、唐穆宗光陵、唐敬宗庄陵、唐文宗章陵、唐武宗端陵、唐宣宗贞陵、唐懿宗简陵、唐僖宗靖陵。这些唐陵分布在关中平原渭河以北北山山脉各山峰的南麓，东西向绵延150余公里，号称“关中十八唐帝陵”。
        </p>
        <p>
          2001年6月25日，唐代帝陵被中华人民共和国国务院公布为第五批全国重点文物保护单位。
        </p>
        <p>
          2019年4月24日，唐代帝陵被国家文物局列入《中国世界文化遗产预备名单》。
        </p>
      </div>
    </div>
    <div class="history">
      <div>
        <h1>历史沿革</h1>
        <p>
          唐贞观九年（635年）五月庚子日，唐高祖因疾而终。唐高祖临终前曾留下遗诏，就安葬之事，表述了两个意思，其一“归志栎阳”，其二，“陵园制度，多从侈约，割商汉陵，以为规矩”。唐太宗与虞世南、房玄龄等人商议后，决定仿照汉光武帝刘秀的原陵为高祖建设陵寝。在高士廉、阎立德等人的主持下，经过数月的兴造，建成陵墓。当年十月庚寅日，高祖正式下葬于唐陵，早年去世的太穆皇后葬民从寿安陵中迁出，与李渊并合葬。
        </p>
        <p>
          唐贞观十年（636年），长孙皇后病危，临终时召唤葬。唐太宗遵照长孙皇后的遗言，在皇后崩后，把她临时安葬在九嵕山新凿之石窟，陵名昭陵。并决定把昭陵也作为自己的归宿之地，等他驾崩后与皇后合葬，随即开始了大规模的营建工程。
        </p>
        <p>
          唐贞元十四年（798年），昭陵下宫被野火焚毁，唐德宗将昭陵下宫迁移到山下的瑶台寺旁重修。并命人修献、昭、乾、定、桥、泰、建、元八陵。其中献、昭、乾、定、泰、建、元八陵，各造屋三百七十七间，桥陵一百四十间，元陵三十间，惟建陵不复创造，但修茸。
        </p>
        <p>
          金天会十二年（1134年），金朝宗室完颜撒改将昭陵狩猎来到了乾陵，见陵园破败不堪，便进行了修复，并刻文记于乾陵无字碑上。
        </p>
        <p>
          乾隆四十二年（1777年）六月，陕西巡抚毕沅看到昭陵墓道失修，椁板上下，保护不善，令礼泉县知县张心镜，修筑围墙三十余丈，建立享十余所，并立石五名，书名，公全全邑，勿损昭陵。
        </p>
        <p>
          乾隆四十八年（1783年）十月，陕西巡抚毕沅命礼泉县县丞具材开具，对昭陵“复加修筑，并立碑记”，又东立石，书陪葬诸王名位，以垂久远。”毕沅还亲自撰文，建立“大唐昭陵改葬之碑”。他在碑文中，用很大篇幅直扬了唐太宗李世民之仁、义、智、勇的崇高形象，意在强调保护昭陵。
        </p>
      </div>
    </div>
    <mid-box></mid-box>
    <footer-box></footer-box>
  </div>
</template>

<script setup>
const imgData = [
  'https://ysdh-ysxy.xaut.edu.cn/images/004.jpg',
  'https://ysdh-ysxy.xaut.edu.cn/images/001.jpg',
  'https://ysdh-ysxy.xaut.edu.cn/images/002.jpg',
  'https://ysdh-ysxy.xaut.edu.cn/images/003.jpg'
]
</script>

<style lang="scss" scoped>
.indexPage {
  width: 74%;
  margin: 0 auto;
  background-color: #ffffff;
  .top {
    display: flex;
    margin-top: 40px;
    margin-bottom: 40px;
    .left {
      width: 6px;
      height: 130px;
      background-color: rgb(0, 50, 151);
      margin-right: 20px;
    }
    .right {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      img {
        width: 400px;
      }
      .a,
      .b {
        color: #415e84;
        font-size: 13px;
      }
    }
  }
  .lunbo {
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.4);
    margin-bottom: 60px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .history {
    background-color: #f5faff;
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.4);
    padding: 20px;
    margin-bottom: 50px;
    h1 {
      color: #2c3e50;
      font-size: 24px;
      margin-bottom: 16px;
    }

    p {
      text-indent: 2em;
      line-height: 1.6;
      margin-bottom: 12px;
      color: rgb(45, 62, 117);
    }
  }
  .text {
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 20px;
    background-color: #f2f8fe;
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    p {
      text-indent: 2em;
      color: rgb(45, 62, 117);
      letter-spacing: 3px;
    }
  }
  .el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
