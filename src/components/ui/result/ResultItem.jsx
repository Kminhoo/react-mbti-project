import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { deleteTestResult, updateTestResultVisibility } from '../../../api/testResult'

const ResultItem = ({ item, user }) => {
  const queryClient = useQueryClient()

  const publicMutaion = useMutation({
    mutationFn: updateTestResultVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries(['mbti'])
      toast.success('상태를 성공적으로 변경했습니다.')
    }
  })

  const deleteMutaion = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(['mbti'])
      toast.success('게시글을 삭제 했습니다.')
    }
  })

  const handleChangePublic = (item) => {
    publicMutaion.mutate({ id: item.id, isPublic: !item.isPublic })
  }

  const handleDeleteResult = (id) => {
    deleteMutaion.mutate(id)
  }

  return (
    <div key={item.id} className="max-w-2xl w-full mx-auto p-5 border rounded-lg shadow-md bg-gray-800 ">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="font-medium text-2xl text-white">{item.userData.nickname}</h3>
        <p className="text-gray-400">{item.created_At}</p>
      </div>
      <div className="mt-5">
        <p className="text-2xl tracking-wider text-red-400">{item.mbti}</p>
        <p className="mt-5 text-gray-300">{item.desc}</p>
        {user.nickname === item.userData.nickname && (
          <div className="mt-5 flex items-center justify-end gap-5">
            <button
              onClick={() => handleChangePublic(item)}
              className="bg-blue-500 py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              {item.isPublic ? '비공개로 전환' : '공개로 전환'}
            </button>
            <button
              onClick={() => handleDeleteResult(item.id)}
              className="bg-red-500 py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultItem
