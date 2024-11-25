import { Link, useNavigate } from 'react-router-dom'

const FormBtnGroup = ({ firstLabel, secondLabel, page, move }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-5">
      <button
        type="submit"
        className="w-full border rounded-md p-2 text-sm  bg-blue-500 text-slate-200 hover:bg-blue-600 hover:text-white transition-colors"
      >
        {firstLabel}
      </button>
      <button
        type="button"
        onClick={() => navigate(`${move}`)}
        className="w-full border rounded-md p-2 text-sm  bg-slate-500 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors"
      >
        {secondLabel}
      </button>
      {page === 'signup' && (
        <Link to="/login" className="p-2 text-sm text-center hover:underline">
          이미 계정이 있으신가요?
        </Link>
      )}
    </div>
  )
}

export default FormBtnGroup
