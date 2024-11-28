import axios from 'axios'

const TEST_API_URL = 'https://sapphire-night-country.glitch.me'

const testResultAxiosInstance = axios.create({
  baseURL: TEST_API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

export const getTestResults = async () => {
  const response = await testResultAxiosInstance.get('/testResults')
  return response.data
}

export const createTestResult = async (resultData) => {
  const response = await testResultAxiosInstance.post('/testResults', resultData)
  return response.data
}

export const deleteTestResult = async (id) => {
  const response = await testResultAxiosInstance.delete(`/testResults/${id}`)
  return response.data
}

export const updateTestResultVisibility = async ({ id, isPublic }) => {
  const response = await testResultAxiosInstance.patch(`/testResults/${id}`, { isPublic })
  return response
}
