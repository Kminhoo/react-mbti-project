import axios from 'axios'

const TEST_API_URL = 'http://localhost:5000'

const testResultAxiosInstance = axios.create({
  baseURL: TEST_API_URL,
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

export const deleteTestResult = async (id) => {}

export const updateTestResultVisibility = async ({ id, isPublic }) => {
  console.log('id', id)
  console.log('isPublic', isPublic)
  const response = await testResultAxiosInstance.patch(`/testResults/${id}`, { isPublic })
  return response
}
