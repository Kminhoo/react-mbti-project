import axios from 'axios'

import { toast } from 'react-toastify'

import useAuthStore from '../store/authStore'

const API_URL = 'https://moneyfulpublicpolicy.co.kr'

const userPrivateAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

userPrivateAxiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('auth'))

    if (token) {
      config.headers.Authorization = `Bearer ${token.state.user.accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

userPrivateAxiosInstance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response && err.response.data) {
      toast.warning(err.response.data.message)
      if (err.response.data.message === '토큰이 만료되었습니다. 다시 로그인 해주세요.') {
        useAuthStore.getState().logout()
        localStorage.clear()
      }
    }
    return Promise.reject(err)
  }
)

export default userPrivateAxiosInstance
