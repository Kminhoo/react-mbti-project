import axios from 'axios'

const API_URL = 'https://moneyfulpublicpolicy.co.kr'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const userSignUp = async (userData) => {
  if (!userData.id || !userData.password || !userData.nickname || !userData.passwordCheck) {
    throw Error('모든 항목을 입력해 주세요.')
  }

  const { passwordCheck, ...restData } = userData
  const response = await axiosInstance.post('/register', restData)
  return response.data
}

export const userLogin = async (userData) => {
  if (!userData.id || !userData.password) {
    throw Error('모든 항목을 입력해 주세요.')
  }

  const { passwordCheck, nickname, ...restData } = userData
  const response = await axiosInstance.post('/login', restData)
  return response.data
}
