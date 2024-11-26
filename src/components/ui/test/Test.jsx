import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import TestForm from '../../feature/TestForm'

import useAuthStore from '../../../store/authStore'

import { createTestResult } from '../../../api/testResult'

import { calculateMBTI, mbtiDescriptions } from '../../../utils/testResult'

const Test = () => {
  const navigate = useNavigate()

  const [result, setResult] = useState(null)

  const user = useAuthStore((state) => state.user)

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers)

    const resultData = {
      created_At: new Date(),
      mbti: mbtiResult,
      desc: mbtiDescriptions[mbtiResult],
      isPublic: true,
      userData: {
        accessToken: user.accessToken,
        nickname: user.nickname
      }
    }

    const response = await createTestResult(resultData)
    setResult(mbtiResult)
    return response
  }

  const handleSubmitTest = useMutation({
    mutationFn: handleTestSubmit,
    onSuccess: () => {
      toast.success('결과를 확인해 보세요!')
    },
    onError: (error) => {
      toast.error(`${error.message}`)
    }
  })

  const handleNavigateToResults = () => {
    navigate('/test-result')
  }

  return (
    <section>
      <div className="max-w-7xl mt-10 mx-auto min-h-[80vh] flex flex-col items-center justify-center">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">MBTI 테스트</h1>
            <TestForm onSubmit={handleSubmitTest.mutate} />
          </>
        ) : (
          <div className="w-[500px]">
            <h1 className="text-3xl font-bold text-primary-color mb-6">테스트 결과: {result}</h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] || '해당 성격 유형에 대한 설명이 없습니다.'}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-slate-400 text-white py-3 rounded-lg font-semibold hover:bg-slate-500 transition duration-300 hover:text-white"
            >
              결과 페이지로 이동하기
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Test
