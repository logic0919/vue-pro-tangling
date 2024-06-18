<template>
  <div class="index">
    <el-input
      v-model="seaInp"
      placeholder="请输入搜索内容"
      class="input-with-select"
    >
      <template #append>
        <el-button :icon="Search" @click="searchFun" />
      </template>
    </el-input>
    <div id="map" @mousemove="updateTooltipPosition">
      <img
        src="/src/assets/map.png"
        usemap="#mausoleumMap"
        alt="唐十八陵分布图"
      />
      <map name="mausoleumMap">
        <el-empty
          description="没有找到相关唐陵"
          v-if="data.length === 0"
        ></el-empty>
        <area
          v-else
          v-for="(mausoleum, index) in data"
          :href="'#' + mausoleum.id"
          :key="index"
          shape="rect"
          :coords="mausoleum.coords"
          :alt="mausoleum.name"
          @mouseover="showTooltip(mausoleum.name)"
          @mouseout="hideTooltip"
        />
      </map>
      <div v-if="tooltipVisible" :style="tooltipStyle" class="tooltip">
        {{ tooltipText }}
      </div>
    </div>
    <div class="main" v-for="(i, index) in data" :key="i.name" :id="i.id">
      <div class="container">
        <h1 @click="router.push(`/royalDetail/${i.id}`)">{{ i.name }}</h1>
        <div
          class="intro-box"
          :class="{ expanded: isExpandedArray[index].value }"
        >
          <div ref="introText">
            <p
              style="text-indent: 2em"
              v-for="(paragraph, idx) in i.intro"
              :key="idx"
              ref="introText"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
        <button @click="toggleExpand(index)">
          {{ isExpandedArray[index].value ? '收起' : '展开更多 >>' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAll, search } from '@/api/royal'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
const router = useRouter()
const seaInp = ref('')
const searchFun = async () => {
  const res = await search(seaInp.value)
  if (res.data.status === 0) {
    console.log(res.data.data)
    data.value = res.data.data
    for (let i = 0; i < data.value.length; i++) {
      data.value[i].intro = data.value[i].intro
        .split('nbsp')
        .map((paragraph) => paragraph.trim())
    }
  } else {
    console.log('获取数据失败')
  }
}

// 获取数据
const data = ref([])
onMounted(async () => {
  const res = await getAll()
  if (res.data.status === 0) {
    data.value = res.data.data
    for (let i = 0; i < data.value.length; i++) {
      data.value[i].intro = data.value[i].intro
        .split('nbsp')
        .map((paragraph) => paragraph.trim())
    }
    console.log(data.value[0])
  } else {
    console.log('获取数据失败')
  }
})

// 地图模块
const tooltipText = ref('')
const tooltipVisible = ref(false)
const tooltipStyle = ref({
  position: 'absolute',
  left: '0px',
  top: '0px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: '#fff',
  padding: '5px',
  borderRadius: '3px',
  whiteSpace: 'nowrap',
  zIndex: 10,
  pointerEvents: 'none'
})

const showTooltip = (name) => {
  tooltipText.value = name
  tooltipVisible.value = true
}

const hideTooltip = () => {
  tooltipVisible.value = false
}

const updateTooltipPosition = (event) => {
  tooltipStyle.value.left = event.pageX + 'px'
  tooltipStyle.value.top = event.pageY + 'px'
}

// 模拟数据
// data.value = []

// 文字部分展开或是收起
const isExpandedArray = Array.from({ length: 18 }, () => ref(false))
const toggleExpand = (index) => {
  if (index >= 0 && index < isExpandedArray.length) {
    isExpandedArray[index].value = !isExpandedArray[index].value
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 85%;
  margin: 0 auto;
  #map {
    margin: 0 auto;
    width: 720px;
    height: 450px;
    img {
      width: 100%;
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;

    .container {
      // border: 2px solid #dc3545; // 红色边框
      padding: 20px;
      // max-width: 800px;
      margin: 20px 0;
      border-radius: 8px; // 圆角
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 盒子阴影
      background-color: #ffffff; // 白色背景
    }

    h1 {
      font-size: 1.5rem;
      color: #343a40; // 深灰色
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
      background-color: #f1f3f5; // 浅灰色背景
      padding: 10px;
      border-radius: 4px; // 圆角

      &.expanded {
        max-height: none;
        background-color: #e9ecef; // 另一种浅灰色背景
      }

      &::after {
        content: '......';
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0 10px;
        background: white;
        display: block;
        width: 100%;
        text-align: right;
      }

      &.expanded::after {
        content: '';
        display: none;
      }
    }

    button {
      display: block;
      margin: 10px 0;
      background: none;
      border: none;
      color: #007bff; // 蓝色文字
      cursor: pointer;
      padding: 0;
      text-align: left;
      font-size: 1rem;
      transition: color 0.3s ease;

      &:hover {
        color: #0056b3; // 深蓝色文字（悬停）
      }
    }
  }
}
</style>
