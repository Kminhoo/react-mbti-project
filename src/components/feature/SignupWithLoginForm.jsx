import { useState } from 'react'

import axios from 'axios'

import InputField from './InputField'
import FormBtnGroup from './FormBtnGroup'

import { User, NickName, Password } from '../icons/icons'

const SignupWithLoginForm = ({ type }) => {
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
    console.log(userData)
  }

  // 제출
  const handleSignupSubmit = async (e) => {
    e.preventDefault()

    const { passwordCheck, ...restData } = userData

    const response = await axios.post('https://moneyfulpublicpolicy.co.kr/register', restData)
    console.log(response)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    const { passwordCheck, nickname, ...restData } = userData
    const response = await axios.post('https://moneyfulpublicpolicy.co.kr/login', restData)
    console.log(response)
  }

  return (
    <form
      onSubmit={type ? (e) => handleSignupSubmit(e) : (e) => handleLoginSubmit(e)}
      className="m-auto max-w-sm w-full border p-4 rounded-lg shadow-sm"
    >
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
      </div>

      <FormBtnGroup
        firstLabel={type ? '가입하기' : '로그인'}
        secondLabel={type ? '홈페이지로 이동하기' : '회원가입'}
        page={type && 'signup'}
        move={type ? '/main' : '/signup'}
      />
    </form>
  )
}

export default SignupWithLoginForm
