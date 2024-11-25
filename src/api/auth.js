import axios from 'axios'

const API_URL = 'https://moneyfulpublicpolicy.co.kr'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const userSignUp = async (userData) => {
  const { passwordCheck, ...restData } = userData
  const response = await axiosInstance.post('/register', restData)
  return response.data
}

export const userLogin = async (userData) => {
  const { passwordCheck, nickname, ...restData } = userData
  const response = await axiosInstance.post('/login', restData)
  return response.data
}
