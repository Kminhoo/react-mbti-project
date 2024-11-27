import { useState } from 'react'

import { PasswordSee } from '../icon'

const InputField = ({ label, Icon, type, showPassword, placeholder, id, check, value, onChange }) => {
  const [displayPassword, setDisplayPassword] = useState(false)

  // 비밀번호 보이기
  const handlePasswordCheck = () => {
    setDisplayPassword(!displayPassword)
  }

  return (
    <div>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute w-5 top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />}
        <input
          className="w-full border p-2 rounded-md pl-10 text-sm"
          type={type === 'password' ? (displayPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          id={id}
          autoComplete={check ? 'off' : null}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {showPassword && (
          <PasswordSee
            onClick={handlePasswordCheck}
            className="absolute w-5 top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    </div>
  )
}

export default InputField
