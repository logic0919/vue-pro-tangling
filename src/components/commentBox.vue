<script setup>
import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
import { computed, inject, ref } from 'vue'
import { like, cancellike, getComment } from '@/api/comment'
const userStore = useUserStore()
const user = userStore.id
// 父组件传来数据
const props = defineProps({
  id: Number,
  content: String,
  user_id: Number,
  time: String,
  likes: Number,
  like_user: Array,
  resNum: Number,
  royal_id: Number,
  user_avatar: String,
  username: String
})
const num = ref(props.resNum)
const islike = computed(() => {
  return props.like_user.includes(user)
})
const addLike = inject('addLike')
const subLike = inject('subLike')
const likeFun = async (id) => {
  if (user === 0) {
    ElMessage.warning('请先登录')
  } else {
    const res = await like(id, user)
    if (res.data.status === 0) {
      if (props.id === id) {
        addLike(id)
      } else {
        // 遍历resArray，找到id对应的对象，然后修改对象的like_user数组，并对象的likes属性加1
        resArray.value.forEach((item) => {
          if (item.id === id) {
            item.like_user.push(user)
            item.likes++
          }
        })
      }
    }
  }
}
const cancellikeFun = async (id) => {
  if (user === 0) {
    ElMessage.warning('请先登录')
  } else {
    const res = await cancellike(id, user)
    if (res.data.status === 0) {
      if (props.id === id) {
        subLike(id)
      } else {
        resArray.value.forEach((item) => {
          if (item.id === id) {
            const index = item.like_user.indexOf(user)
            item.like_user.splice(index, 1)
            item.likes--
          }
        })
      }
    }
  }
}
const isopen = ref(false)
const hasOpened = ref(false)
const resArray = ref([])
const getRes = async () => {
  isopen.value = true
  // 第一次打开
  if (!hasOpened.value) {
    const res = await getComment(2, props.id)
    if (res.data.status === 0) {
      resArray.value = res.data.data
    } else {
      ElMessage.warning('获取失败')
    }
    hasOpened.value = true
  }
}
const openDrawer = inject('openDrawer')
const addComment = (data) => {
  num.value++
  if (hasOpened.value) {
    resArray.value.unshift(data)
  }
}
defineExpose({
  props,
  addComment
})
const test = (a) => {
  console.log(a)
}
</script>

<template>
  <div class="commentBox">
    <div class="avatar">
      <img :src="user_avatar" alt="" />
    </div>
    <div class="main">
      <div class="user">{{ username }}</div>
      <div class="content">{{ content }}</div>
      <div class="foot">
        <div class="time">{{ time }}</div>
        <div class="opea">
          <div class="res" @click="openDrawer(2, props.id, null)">
            <img src="/src/assets/res.png" alt="" />
            <div class="text">回复</div>
          </div>
          <div class="like">
            <img
              v-if="islike"
              src="/src/assets/like.png"
              @click="cancellikeFun(props.id)"
              alt=""
            />
            <img
              v-else
              src="/src/assets/dislike.png"
              @click="likeFun(props.id)"
              alt=""
            />
            <div class="text">{{ likes }}</div>
          </div>
        </div>
      </div>
      <el-button
        style="height: 26px; font-size: 10px"
        v-if="!isopen && num > 0"
        type="info"
        plain
        @click="getRes"
        >查看全部{{ num }}条回复 ></el-button
      >
      <div v-else class="responses">
        <div v-for="i in resArray" :key="i" class="response">
          <div class="avatar">
            <img :src="i.user_avatar" alt="" @click="test(i.user_avatar)" />
          </div>
          <div class="main">
            <div class="user">{{ i.username }}</div>
            <div class="content">
              <em style="font-weight: 700; color: blue" v-if="i.at"
                >@{{ i.at }}&nbsp;&nbsp;&nbsp;</em
              >{{ i.content }}
            </div>
            <div class="foot">
              <div class="time">{{ i.time.slice(0, 10) }}</div>
              <div class="opea">
                <div class="res" @click="openDrawer(3, props.id, i.id)">
                  <img src="/src/assets/res.png" alt="" />
                  <div class="text">回复</div>
                </div>
                <div class="like">
                  <img
                    v-if="i.like_user.includes(user)"
                    src="/src/assets/like.png"
                    @click="cancellikeFun(i.id)"
                    alt=""
                  />
                  <img
                    v-else
                    src="/src/assets/dislike.png"
                    @click="likeFun(i.id)"
                    alt=""
                  />
                  <div class="text">{{ i.likes }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-button
          style="height: 26px; font-size: 10px"
          v-if="isopen"
          type="info"
          plain
          @click="isopen = false"
          >收起</el-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.commentBox {
  padding-left: 15px;
}
.commentBox,
.response {
  width: 100%;
  border-top: 1px dashed rgb(198, 198, 198);
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-top: 30px;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .main {
    width: 93%;
    .user,
    .content,
    .foot {
      margin-bottom: 10px;
    }
    .user {
      font-size: 20px;
      font-weight: 700;
    }
    .foot {
      display: flex;
      justify-content: space-between;
      color: #aaaaaa;
      .time {
        width: 65%;
      }
      .opea {
        width: 180px;
        display: flex;
        .res,
        .like {
          width: 80px;
          margin-left: 10px;
          display: flex;
          img {
            margin-right: 10px;
          }
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
