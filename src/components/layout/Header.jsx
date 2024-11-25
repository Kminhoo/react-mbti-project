import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <h2 className="flex text-end gap-1 text-2xl font-bold tracking-wider ">
          MBTI
          <span className="text-sm font-thin">검사</span>
        </h2>

        <nav className="flex items-center gap-4">
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
        </nav>
      </div>
    </header>
  )
}

export default Header
