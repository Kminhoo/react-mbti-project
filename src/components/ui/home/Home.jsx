import { useNavigate } from 'react-router-dom'

import mbtiLogo from '/public/images/mbti.png'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <img src={mbtiLogo} alt="MBTI LOGO" />
        <p className="mt-3 text-lg font-medium">자신의 성격 유형을 확인하고, 더 나은 나를 발견해보세요!</p>
        <div className="mt-5 flex items-center justify-center">
          <button
            type="button"
            onClick={() => navigate('/main')}
            className="p-2 w-28 rounded-md text-sm bg-slate-500 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors"
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
