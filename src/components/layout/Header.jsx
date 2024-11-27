import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

import useAuthStore from '../../store/authStore'

const Header = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    toast.success('성공적으로 로그아웃 했습니다.')
    logout()
  }

  return (
    <header className=" shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <h2 className="flex text-end gap-1 text-2xl font-bold tracking-wider ">
          MBTI
          <span className="text-sm font-thin">검사</span>
        </h2>

        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/main"
                className="p-1.5 border-solid  border-slate-400 rounded-md hover:bg-slate-400 hover:text-white transition-colors"
              >
                홈
              </Link>
              <Link
                to="/profile"
                className="p-1.5 border-solid  border-slate-400 rounded-md hover:bg-slate-400 hover:text-white transition-colors"
              >
                마이 페이지
              </Link>
              <Link
                to="/mbti-test"
                className="p-1.5 border-solid  border-slate-400 rounded-md hover:bg-slate-400 hover:text-white transition-colors"
              >
                테스트
              </Link>
              <Link
                to="/test-result"
                className="p-1.5 border-solid  border-slate-400 rounded-md hover:bg-slate-400 hover:text-white transition-colors"
              >
                결과 보기
              </Link>
              <button
                className="p-1.5 border-solid  border-slate-400 rounded-md hover:bg-slate-400 hover:text-white transition-colors"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="p-1.5 border-solid border border-slate-400 rounded-md hover:bg-slate-400 hover:text-white transition-colors"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="p-1.5 border-solid border border-slate-400 rounded-md hover:bg-slate-400 hover:text-white transition-colors"
              >
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
