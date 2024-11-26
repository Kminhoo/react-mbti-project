import axios from 'axios'

const TEST_API_URL = 'http://localhost:5000'

const testResultAxiosInstance = axios.create({
  baseURL: TEST_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// testResultAxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(localStorage.getItem('auth'))
//     if (token.state.accessToken) {
//       config.headers.Authorization = `Bearer ${token.state.accessToken}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

export const getTestResults = async () => {
  const response = await testResultAxiosInstance.get('/testResults')
  return response.data
}

export const createTestResult = async (resultData) => {
  const response = await testResultAxiosInstance.post('/testResults', resultData)
  return response.data
}

export const deleteTestResult = async (id) => {}

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await testResultAxiosInstance.interceptors.request.use()
}
