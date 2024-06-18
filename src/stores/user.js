import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const setToken = (token) => {
    token.value = token
  }

  return { token, setToken }
})
