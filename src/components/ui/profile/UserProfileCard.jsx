import { useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import { fetchUserProfile, updateUserProfile } from '../../../api/auth'

import noImage from '/public/images/noimg.webp'

const UserProfileCard = () => {
  const [newName, setNewName] = useState('')
  const [profileChange, setProfileChange] = useState(false)

  const queryClient = useQueryClient()

  const { data, isPending, isError } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserProfile()
  })

  // 낙관적 업데이트
  const changeNameMutation = useMutation({
    mutationFn: () => updateUserProfile(newName),
    onMutate: async ({ newName }) => {
      await queryClient.cancelQueries({ queryKey: ['user'] })

      const previousProfile = queryClient.getQueryData(['user'])

      queryClient.setQueryData(['user'], (old) => ({
        ...old,
        nickname: newName
      }))

      return { previousProfile }
    },

    onSuccess: () => {
      toast.success('닉네임 변경을 완료했습니다.')
      setProfileChange(false)
      setNewName('')
    },

    onError: (err, newName, context) => {
      queryClient.setQueryData(['user'], context.previousProfile)
      toast.error('닉네임 변경 실패')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })

  // 닉네임 변경
  const handleChangeNickname = () => {
    if (profileChange) {
      changeNameMutation.mutate(newName)
    } else {
      setProfileChange(true)
    }
  }

  if (isPending) {
    return <div>로딩 중...</div>
  }

  if (isError) {
    return <div>에러 발생...</div>
  }

  return (
    <div className="max-w-xl w-full border p-6 flex items-center justify-center gap-10 mb-28">
      <div>
        <img
          src={data.avatar ? data.avatar : noImage}
          alt="User Profile"
          className="w-28 h-28 rounded-full border object-center"
        />
      </div>
      <div className="flex flex-col gap-5">
        <p>ID : {data.id}</p>
        <p>닉네임 : {data.nickname}</p>
        {profileChange && (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="새 닉네임 입력"
            className="border p-2 rounded"
          />
        )}
        <button
          onClick={() => handleChangeNickname()}
          className="w-full bg-slate-400 text-white p-3 rounded-lg font-semibold hover:bg-slate-500 transition duration-300 hover:text-white"
        >
          닉네임 변경하기
        </button>
      </div>
    </div>
  )
}

export default UserProfileCard
