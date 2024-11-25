import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import TestForm from '../../feature/TestForm'

import { calculateMBTI, mbtiDescriptions } from '../../../utils/testResult'

const Test = () => {
  const navigate = useNavigate()

  const [result, setResult] = useState(null)

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers)
    /* Test 결과는 mbtiResult 라는 변수에 저장이 됩니다. 이 데이터를 어떻게 API 를 이용해 처리 할 지 고민해주세요. */
    setResult(mbtiResult)
    console.log(mbtiResult)
  }

  const handleNavigateToResults = () => {
    navigate('/test-result')
  }

  return (
    <section>
      <div className="max-w-7xl mt-10 mx-auto min-h-[80vh] flex items-center justify-center">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">MBTI 테스트</h1>
            <TestForm onSubmit={handleTestSubmit} />
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
