<script setup>
import { useUserStore } from './stores'
import { userInfoService } from '@/api/user'
const userStore = useUserStore()
const {
  setAll,
  setToken,
  getlocalTime,
  clearAll,
  setlocalToken,
  getlocalToken
} = userStore
const autoLogin = async () => {
  const nowtime = new Date().getTime() + ''
  const expiretime = getlocalTime()
  // 有本地缓存的情况
  if (expiretime) {
    // 过期情况，删token，其他信息，时间戳
    if (nowtime > expiretime) {
      clearAll()
      console.log('过期')
    } else {
      // 没有过期情况：从本地取数据放到仓库中
      setlocalToken(getlocalToken())
      setToken(getlocalToken())
      console.log('自动登录')
      ElMessage.success('自动登录成功')
      const res = await userInfoService()
      if (res.data.status === 0) {
        const data = res.data.data
        const { id, username, avatar } = data
        setAll(id, username, avatar)
      } else {
        ElMessage.error('用户信息获取失败')
      }
    }
  }
}
autoLogin()
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
