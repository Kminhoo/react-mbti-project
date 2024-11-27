import { useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { fetchUserProfile, updateUserProfile } from '../../api/auth'

import MyResult from '../../components/ui/profile/MyResult'
import { toast } from 'react-toastify'

const ProfilePage = () => {
  const [newName, setNewName] = useState('')
  const [profileChange, setProfileChange] = useState(false)

  const queryClient = useQueryClient()

  const { data, isPending, isError } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserProfile()
  })

  const changeNameMutation = useMutation({
    mutationFn: () => updateUserProfile(newName),
    onMutate: async ({ newName }) => {
      await queryClient.cancelQueries({ queryKey: ['user'] })

      const previousProfile = queryClient.getQueryData(['user'])
      console.log('previousProfile', previousProfile)

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
    <section>
      <div className="max-w-7xl mt-10 mx-auto min-h-[80vh]">
        <div className="flex flex-col items-center justify-center">
          {/* 유저 정보 */}
          <div className="max-w-xl w-full border p-6 flex items-center justify-center gap-10 mb-28">
            <div>
              <img
                src={data.avatar ? data.avatar : null}
                alt="User Profile"
                className="w-28 h-28 rounded-full bg-orange-400 object-center"
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

          {/* 작성한 글 목록 */}
          <MyResult />
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
