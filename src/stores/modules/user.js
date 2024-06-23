import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const id = ref()
  const username = ref('')
  const avatar = ref('')
  const setToken = (token1) => {
    token.value = token1
  }
  const setId = (id1) => {
    console.log('hh')
    id.value = id1
  }
  const setUsername = (username1) => {
    username.value = username1
  }
  const setAvatar = (avatar1) => {
    avatar.value = avatar1
  }
  const setAll = (id, username, avatar) => {
    console.log(id, username, avatar)
    setId(id)
    setUsername(username)
    setAvatar(avatar)
  }
  const getlocalTime = () => {
    return localStorage.getItem('tangling_time')
  }
  const setlocalTime = () => {
    const now = new Date()
    const time = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).getTime()
    localStorage.setItem('tangling_time', time)
  }
  const setlocalToken = (usertoken) => {
    localStorage.setItem('tangling_token', usertoken)
  }
  const getlocalToken = () => {
    return localStorage.getItem('tangling_token')
  }
  const clearAll = () => {
    localStorage.clear('tangling_token')
    localStorage.clear('tangling_time')
  }

  return {
    token,
    setToken,
    id,
    setId,
    username,
    setUsername,
    avatar,
    setAvatar,
    setAll,
    getlocalTime,
    setlocalTime,
    setlocalToken,
    getlocalToken,
    clearAll
  }
})
