import axios from 'axios'

import userPrivateAxiosInstance from './privateAuth'

const API_URL = 'https://moneyfulpublicpolicy.co.kr'

const userAxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

export const userSignUp = async (userData) => {
  const { passwordCheck, ...restData } = userData
  const response = await userAxiosInstance.post('/register', restData)
  return response.data
}

export const userLogin = async (userData) => {
  const { passwordCheck, nickname, ...restData } = userData
  const response = await userAxiosInstance.post('/login', restData)
  return response.data
}

export const fetchUserProfile = async () => {
  const response = await userPrivateAxiosInstance.get('/user')

  return response.data
}

export const updateUserProfile = async (newName) => {
  const formData = new FormData()

  formData.append('nickname', newName)

  const response = await userPrivateAxiosInstance.patch('/profile', formData)

  return response.data
}
