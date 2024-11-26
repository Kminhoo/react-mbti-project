import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import InputField from './InputField'
import FormBtnGroup from './FormBtnGroup'

import { userLogin, userSignUp } from '../../api/auth'

import { User, NickName, Password } from '../icons/icons'

import useAuthStore from '../../store/authStore'

const SignupWithLoginForm = ({ type }) => {
  const login = useAuthStore((state) => state.login)

  const navigate = useNavigate()
  // user 정보 상태
  const [userData, setUserData] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    nickname: ''
  })

  // user 상태 어데이트
  const handleChange = (e) => {
    const { id, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  // 회원가입
  const handleSignupSubmit = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      toast.success('회원가입에 성공했습니다.')
      navigate('/login')
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
      toast.error(`${error.response.data.message}`)
    }
  })

  // 로그인
  const handleLoginSubmit = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      console.log('login', data)
      toast.success('로그인에 성공했습니다.')
      login(data)
      navigate('/main')
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`)
    }
  })

  const vaildationCheck = (userData) => {
    if (!userData.id) {
      toast.warning('ID를 입력해 주세요.')
      return false
    }

    if (!userData.password) {
      toast.warning('비밀번호를 입력해 주세요.')
      return false
    }

    if (type) {
      if (!userData.nickname) {
        toast.warning('닉네임을 입력해 주세요.')
        return false
      }

      if (!userData.passwordCheck) {
        toast.warning('비밀번호 확인을 입력해 주세요.')
        return false
      }

      if (userData.password !== userData.passwordCheck) {
        toast.warning('비밀번호가 서로 같지 않습니다.')
        return false
      }
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (vaildationCheck(userData)) {
      if (type) {
        handleSignupSubmit.mutate(userData)
      } else {
        handleLoginSubmit.mutate(userData)
      }
    }
  }

  // 비밀번호 확인 조건
  const passwordCheckText = userData.password && userData.password !== userData.passwordCheck

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form onSubmit={(e) => handleSubmit(e)} className="m-auto max-w-sm w-full border p-4 rounded-lg shadow-sm">
        <div className="w-full text-center">
          <h3 className="text-2xl font-bold tracking-wide">{type ? '회원가입' : '로그인'}</h3>
          <p className="mt-1 text-sm text-slate-400">{`아래의 정보를 입력하여 ${type ? '회원가입' : '로그인'} 하세요.`}</p>
        </div>
        <div className="flex flex-col gap-6 my-5">
          <InputField
            label="아이디"
            id="id"
            type="text"
            Icon={User}
            placeholder="사용할 아이디를 입력해주세요."
            value={userData.id}
            onChange={handleChange}
          />

          {type && (
            <InputField
              label="닉네임"
              id="nickname"
              type="text"
              Icon={NickName}
              placeholder="사용할 닉네임을 정해주세요."
              value={userData.nickname}
              onChange={handleChange}
            />
          )}

          <InputField
            label="비밀번호"
            id="password"
            type="password"
            Icon={Password}
            placeholder="비밀번호를 입력해주세요."
            check={true}
            showPassword={true}
            value={userData.password}
            onChange={handleChange}
          />

          {type && (
            <InputField
              label="비밀번호 확인"
              id="passwordCheck"
              type="password"
              Icon={Password}
              placeholder="비밀번호를 한번 더 입력해주세요."
              check={true}
              showPassword={true}
              value={userData.passwordCheck}
              onChange={handleChange}
            />
          )}
          {type && passwordCheckText && (
            <p className="text-xs mt-[-15px] text-red-600">비밀번호가 서로 같지 않습니다.</p>
          )}
        </div>

        <FormBtnGroup
          firstLabel={type ? '가입하기' : '로그인'}
          secondLabel={type ? '홈페이지로 이동하기' : '회원가입'}
          page={type && 'signup'}
          move={type ? '/' : '/signup'}
        />
      </form>
    </div>
  )
}

export default SignupWithLoginForm
