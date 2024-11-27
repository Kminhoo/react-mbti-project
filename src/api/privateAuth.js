import axios from 'axios'

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

export default userPrivateAxiosInstance
