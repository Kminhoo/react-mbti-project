import { useNavigate } from 'react-router-dom'

import HomeSectionCard from './HomeSectionCard'

import homeData from '../../../data/mainPageData'

const HomeSection = () => {
  const navigate = useNavigate()

  return (
    <section>
      <div className="max-w-7xl mt-10 mx-auto min-h-[80vh] flex flex-col items-center justify-center">
        <div>
          <div className="text-center">
            <h2 className="text-5xl font-medium">무료 성격 테스트</h2>
            <p className="mt-3">자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.</p>
          </div>
          <div className="flex items-center justify-between gap-5 mt-10">
            {homeData.map((data) => (
              <HomeSectionCard key={data.id} title={data.title} desc={data.desc} id={data.id} />
            ))}
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              type="button"
              onClick={() => navigate('/mbti-test')}
              className="w-auto border rounded-md p-2 text-sm  bg-slate-500 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors"
            >
              내 성격 알아보러 가기
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSection
