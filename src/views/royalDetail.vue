<script setup>
import { getById } from '@/api/royal'
import { ElMessage } from 'element-plus'
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getComment, addComment } from '@/api/comment'
import { useUserStore } from '@/stores/modules/user'
import data1 from '@/utils/data'
let userStore
let user
setTimeout(() => {
  userStore = useUserStore()
  user = userStore.id
}, 1000)
const route = useRoute()
const id = Number(route.params.id)
const hotelData = data1[0].hotel
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
const rootRes = ref([])
setTimeout(() => {
  console.log(rootRes.value)
}, 1000)
onMounted(async () => {
  // 获取信息和天气
  const res = await getById(id)
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
  // 获取评论
  const res1 = await getComment(1, id)
  if (res1.data.status === 0) {
    rootRes.value = res1.data.data
  } else {
    ElMessage.error('评论信息获取失败')
  }
})
const addLike = (id) => {
  for (let i = 0; i < rootRes.value.length; i++) {
    if (rootRes.value[i].id === id) {
      rootRes.value[i].likes++
      rootRes.value[i].like_user = rootRes.value[i].like_user + user
      break
    }
  }
}
const subLike = (id) => {
  for (let i = 0; i < rootRes.value.length; i++) {
    if (rootRes.value[i].id === id) {
      rootRes.value[i].likes--
      // 从rootRes.value[i].like_user中删除user_id
      let arr = rootRes.value[i].like_user
      if (typeof arr === 'object') {
        let arr1 = arr
        arr = ''
        // 循环遍历对象arr1，将键值对中的值添加到arr中
        for (let key in arr1) {
          arr = arr + arr1[key]
        }
      }
      arr = arr.split(',')
      const index = arr.indexOf('' + user)
      if (index !== -1) {
        arr.splice(index, 1)
      }
      rootRes.value[i].like_user = arr
      break
    }
  }
}
provide('addLike', addLike)
provide('subLike', subLike)

// 关于发表评论
const drawer = ref(false)
const parent = ref(null)
const at = ref(null)
const level = ref(0)
const openDrawer = (a, b, c) => {
  formModel.value.comment = ''
  drawer.value = true
  level.value = a
  parent.value = b
  at.value = c
}
const formModel = ref({
  comment: 'hh'
})
const commentBoxes = ref([])
// 添加二级或三级评论
// 调用子组件中的方法
const addSecondFun = (parent, data) => {
  // 循环查找出props.id等于parent.value的子组件，调用其内部方法
  commentBoxes.value.forEach((item) => {
    if (item.props.id === parent) {
      item.addComment(data)
    }
  })
}
const addCommentFun = async () => {
  const res = await addComment(
    level.value,
    id,
    formModel.value.comment,
    user,
    parent.value,
    at.value
  )
  if (res.data.status === 0) {
    drawer.value = false
    if (level.value === 1) {
      const data = res.data.data
      data['user_avatar'] = userStore.avatar
      rootRes.value.unshift(data)
      console.log(rootRes.value)
    } else if (level.value === 2 || level.value === 3) {
      addSecondFun(parent.value, res.data.data)
    }
  } else {
    ElMessage.error('评论发表失败')
  }
}
provide('openDrawer', openDrawer)
</script>
<template>
  <div class="body">
    <div class="royalDetail">
      <el-drawer v-model="drawer" title="讨论区" :with-header="false">
        <el-input
          resize="none"
          rows="10"
          v-model="formModel.comment"
          placeholder="欢迎参与讨论"
          type="textarea"
        />
        <el-button
          style="margin-top: 20px; width: 100px"
          type="primary"
          plain
          @click="addCommentFun"
          >发布讨论</el-button
        >
      </el-drawer>
      <text-box chin="详细信息" eng="introduction"></text-box>
      <!-- 介绍部分 -->
      <div class="container">
        <h1>{{ data.name }}</h1>
        <p
          class="intro-box"
          style="text-indent: 2em"
          v-for="(paragraph, idx) in data.intro"
          :key="idx"
        >
          {{ paragraph }}
        </p>
      </div>
      <text-box chin="住宿" eng="hotel"></text-box>
      <hotel-box
        v-for="i in hotelData"
        :key="i.name"
        :imageSrc="i.imageSrc"
        :rank="i.rank"
        :name="i.name"
        :label="i.label"
        :location="i.location"
        :distance="i.distance"
        :rating="i.rating"
        :reviews="i.reviews"
        :comment="i.comment"
        :orderTime="i.orderTime"
        :buttonText="i.buttonText"
      ></hotel-box>
      <!-- 天气部分 -->
      <text-box chin="天气" eng="weather"></text-box>
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
      <text-box chin="评论区" eng="comment"></text-box>
      <div class="res">
        <div class="top">
          <div class="text">{{ rootRes.length }}条评论</div>
          <el-button
            style="width: 100px"
            type="primary"
            plain
            @click="openDrawer(1, null, null)"
            >参与讨论</el-button
          >
        </div>
        <comment-box
          v-for="i in rootRes"
          ref="commentBoxes"
          :key="i.id"
          :id="i.id"
          :content="i.content"
          :user_id="i.user_id"
          :time="i.time.slice(0, 10)"
          :likes="i.likes"
          :like_user="i.like_user"
          :resNum="i.resNum"
          :royal_id="royal_id"
          :user_avatar="i.user_avatar"
          :username="i.username"
        ></comment-box>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  padding: 0;
  box-sizing: border-box;
}
.body {
  margin: -8px;
  background-color: rgb(234, 234, 234);
  min-height: 100vh;
  padding-top: 20px;
  .royalDetail {
    width: 900px;
    margin: 0 auto;
    padding: 30px;
    background-color: #ffffff;
    .container {
      width: 800px;
      margin: 0 auto;
      border: 1px solid rgb(165, 77, 77);
      border-radius: 8px; // 圆角
      box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.1); // 盒子阴影
      background-color: #ffffff; // 白色背景
      padding: 20px;
      h1 {
        font-size: 2rem;
        font-family: 'Courier New', Courier, monospace;
        color: #218bf5; // 深灰色
        margin-bottom: 10px;
      }
      .intro-box {
        position: relative;
        max-height: 11.6em; // 9 * 1.2em line-height = 10.8em
        overflow: hidden;
        line-height: 1.2em;
        transition:
          max-height 0.3s ease,
          background-color 0.3s ease;
        background-color: #ecf2fc;
        padding: 10px;
        letter-spacing: 3px;
        color: #073f7b;
        line-height: 1.5em;
        border-radius: 4px;
      }
    }
    .res {
      width: 800px;
      margin: 0 auto;
      border: 1px solid rgb(214, 214, 214);
      margin-top: 30px;
      .top {
        display: flex;
        width: 800px;
        height: 60px;
        justify-content: space-between;
        align-items: center;
        padding-left: 40px;
        padding-right: 40px;
      }
    }
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
}
</style>
