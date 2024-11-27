import { useQuery } from '@tanstack/react-query'

import ResultItem from './ResultItem'

import useAuthStore from '../../../store/authStore'

import { getTestResults } from '../../../api/testResult'

const Result = () => {
  const user = useAuthStore((state) => state.user)

  const { data, isPending, isError } = useQuery({
    queryKey: ['mbti'],
    queryFn: getTestResults,
    staleTime: 5 * 1000
  })

  // 필터링 된 조건
  const filteredData = data?.filter((item) => item.isPublic || item.userData.userId === user.userId)

  if (isPending) {
    return <div>로딩중...</div>
  }

  if (isError) {
    return <div>에러발생...</div>
  }

  return (
    <section>
      <div className="max-w-7xl mt-10 mx-auto min-h-[80vh]">
        <div>
          <div>
            <h3 className="text-center font-medium text-4xl tracking-wide">모든 테스트 결과를 확인하세요.</h3>
          </div>
          <div className="mt-10 flex flex-col gap-10">
            {filteredData.length > 0 ? (
              filteredData.map((item) => <ResultItem key={item.id} item={item} user={user} />).reverse()
            ) : (
              <p className="flex items-center justify-center">데이터가 없습니다. 지금 바로 검사를 시작해보세요</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Result
// export const login = (userData, expiresIn = "1h") =>
//   apiRequest("post", "/login", userData, { params: { expiresIn } });
