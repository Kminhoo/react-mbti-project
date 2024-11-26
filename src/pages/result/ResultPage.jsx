import { useQuery } from '@tanstack/react-query'

import { getTestResults } from '../../api/testResult'

import useAuthStore from '../../store/authStore'

const ResultPage = () => {
  const user = useAuthStore((state) => state.user)

  console.log('user', user)

  const { data, isPending, isError } = useQuery({
    queryKey: ['mbti'],
    queryFn: getTestResults
  })

  const token = JSON.parse(localStorage.getItem('auth'))
  console.log(token)

  if (isPending) {
    return <div>로딩중</div>
  }

  if (isError) {
    return <div>에러발생</div>
  }

  return (
    <section>
      <div className="max-w-7xl mt-10 mx-auto min-h-[80vh]">
        <div>
          <div>
            <h3 className="text-center font-medium text-4xl tracking-wide">모든 테스트 결과를 확인하세요.</h3>
          </div>
          <div className="mt-10 flex flex-col gap-10">
            {data.map((item) => (
              <div key={item.id} className="max-w-2xl w-full mx-auto p-5 border rounded-lg shadow-md bg-gray-800 ">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="font-medium text-2xl text-white">{item.userData.nickname}</h3>
                  <p className="text-gray-400">{item.created_At}</p>
                </div>
                <div className="mt-5">
                  <p className="text-2xl tracking-wider text-red-400">{item.mbti}</p>
                  <p className="mt-5 text-gray-300">{item.desc}</p>
                  {user.accessToken === item.userData.accessToken && (
                    <div className="mt-5 flex items-center justify-end gap-5">
                      <button className="bg-blue-500 py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition">
                        비공개로 전환
                      </button>
                      <button className="bg-red-500 py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition">
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultPage
