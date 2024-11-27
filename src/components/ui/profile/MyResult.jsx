import { useQuery } from '@tanstack/react-query'

import ResultItem from '../result/ResultItem'

import { getTestResults } from '../../../api/testResult'

import useAuthStore from '../../../store/authStore'

const MyResult = () => {
  const user = useAuthStore((state) => state.user)

  const { data, isPending, isError } = useQuery({
    queryKey: ['mbti'],
    queryFn: getTestResults
  })

  const filteredResult = data?.filter((item) => item.userData.userId === user.userId)

  if (isPending) {
    return <div>로딩 중...</div>
  }

  if (isError) {
    return <div>에러 발생...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {filteredResult?.length > 0 ? (
        filteredResult?.map((item) => <ResultItem key={item.id} item={item} user={user} />)
      ) : (
        <p>MBTI 검사를 시행해 보세요!</p>
      )}
    </div>
  )
}

export default MyResult
