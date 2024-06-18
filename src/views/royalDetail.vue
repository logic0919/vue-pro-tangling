<template>
  <div class="royalDetail">
    <!-- 介绍部分 -->
    <div class="intro">
      <p>{{ data.name }}</p>
      <p
        style="text-indent: 2em"
        v-for="(paragraph, idx) in data.intro"
        :key="idx"
      >
        {{ paragraph }}
      </p>
    </div>
    <!-- 天气部分 -->
    <div class="weather">
      <div class="card">
        <div class="container">
          <div class="cloud front">
            <span class="left-front"></span>
            <span class="right-front"></span>
          </div>
          <span class="sun sunshine"></span>
          <span class="sun"></span>
          <div class="cloud back">
            <span class="left-back"></span>
            <span class="right-back"></span>
          </div>
        </div>

        <div class="card-header">
          <span
            >温度：{{ weather.tempMax }}°-{{
              weather.tempMin
            }}°<br />日间天气：{{ weather.textDay }}<br />晚间天气：{{
              weather.textNight
            }}</span
          >
          <span>{{ weather.month }} {{ weather.day }}</span>
        </div>

        <span class="temp">{{ weather.tempNow }}°</span>

        <div class="temp-scale">
          <span>Celcius</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getById } from '@/api/royal'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
const data = ref({})
const weather = ref({})
const key = '10f539b8897d421ca51e3613b421b1d0'
// 自定义axios方法
function myAxios(config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    if (config.params) {
      const paramsObj = new URLSearchParams(config.params)
      const queryString = paramsObj.toString()
      config.url += `?${queryString}`
    }
    xhr.open(config.method || 'GET', config.url)
    xhr.addEventListener('loadend', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject(new Error(xhr.response))
      }
    })
    xhr.send()
  })
}
// 生成日期数据的函数
function parseDate(dateString) {
  const date = new Date(dateString)
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const monthName = monthNames[date.getMonth()]
  const day = date.getDate()
  return [monthName, String(day)]
}
onMounted(async () => {
  const res = await getById(id)
  console.log(res)
  if (res.data.status === 0) {
    data.value = res.data.data
    data.value.intro = data.value.intro
      .split('nbsp')
      .map((paragraph) => paragraph.trim())
    myAxios({
      method: 'GET',
      url: 'https://devapi.qweather.com/v7/weather/7d',
      params: {
        location: Number(data.value.area),
        key
      }
    })
      .then((result) => {
        const data = result.daily[0]
        console.log(data)
        weather.value.month = parseDate(data.fxDate)[0]
        weather.value.day = parseDate(data.fxDate)[1]
        weather.value.textDay = data.textDay
        weather.value.textNight = data.textNight
        weather.value.tempMax = data.tempMax
        weather.value.tempMin = data.tempMin
        weather.value.tempNow = data.cloud
      })
      .catch(() => {
        ElMessage.error('天气信息获取失败')
      })
  } else {
    ElMessage.error('介绍信息获取失败')
  }
})
</script>

<style lang="scss" scoped>
.royalDetail {
  .weather {
    .card {
      width: 350px;
      height: 235px;
      position: relative;
      padding: 25px;
      background:
        radial-gradient(
            178.94% 106.41% at 26.42% 106.41%,
            #fff7b1 0%,
            rgba(255, 255, 255, 0) 71.88%
          )
          /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
        #ffffff;
      box-shadow:
        0px 155px 62px rgba(0, 0, 0, 0.01),
        0px 87px 52px rgba(0, 0, 0, 0.05),
        0px 39px 39px rgba(0, 0, 0, 0.09),
        0px 10px 21px rgba(0, 0, 0, 0.1),
        0px 0px 0px rgba(0, 0, 0, 0.1);
      border-radius: 23px;
      transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
      cursor: pointer;
    }
    .container {
      width: 250px;
      height: 250px;
      position: absolute;
      right: -35px;
      top: -50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(0.7);
    }

    .cloud {
      width: 250px;
    }

    .front {
      padding-top: 45px;
      margin-left: 25px;
      display: inline;
      position: absolute;
      z-index: 11;
      animation: clouds 8s infinite;
      animation-timing-function: ease-in-out;
    }

    .back {
      margin-top: -30px;
      margin-left: 150px;
      z-index: 12;
      animation: clouds 12s infinite;
      animation-timing-function: ease-in-out;
    }

    .right-front {
      width: 45px;
      height: 45px;
      border-radius: 50% 50% 50% 0%;
      background-color: #4c9beb;
      display: inline-block;
      margin-left: -25px;
      z-index: 5;
    }

    .left-front {
      width: 65px;
      height: 65px;
      border-radius: 50% 50% 0% 50%;
      background-color: #4c9beb;
      display: inline-block;
      z-index: 5;
    }

    .right-back {
      width: 50px;
      height: 50px;
      border-radius: 50% 50% 50% 0%;
      background-color: #4c9beb;
      display: inline-block;
      margin-left: -20px;
      z-index: 5;
    }

    .left-back {
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 0% 50%;
      background-color: #4c9beb;
      display: inline-block;
      z-index: 5;
    }

    .sun {
      width: 120px;
      height: 120px;
      background: -webkit-linear-gradient(to right, #fcbb04, #fffc00);
      background: linear-gradient(to right, #fcbb04, #fffc00);
      border-radius: 60px;
      display: inline;
      position: absolute;
    }

    @keyframes clouds {
      0% {
        transform: translateX(15px);
      }

      50% {
        transform: translateX(0px);
      }

      100% {
        transform: translateX(15px);
      }
    }

    .card-header {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .card-header span:first-child {
      word-break: break-all;
      font-weight: 800;
      font-size: 15px;
      line-height: 135%;
      color: rgba(87, 77, 51, 0.66);
    }

    .card-header span:last-child {
      font-weight: 700;
      font-size: 15px;
      line-height: 135%;
      color: rgba(87, 77, 51, 0.33);
    }

    .temp {
      position: absolute;
      left: 25px;
      bottom: 12px;
      font-weight: 700;
      font-size: 64px;
      line-height: 77px;
      color: rgba(87, 77, 51, 1);
    }

    .temp-scale {
      width: 80px;
      height: 36px;
      position: absolute;
      right: 25px;
      bottom: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.06);
      border-radius: 9px;
    }

    .temp-scale span {
      font-weight: 700;
      font-size: 13px;
      line-height: 134.49%;
      color: rgba(87, 77, 51, 0.66);
    }
  }
}
</style>
