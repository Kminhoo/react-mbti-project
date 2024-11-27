import { Navigate, Outlet } from 'react-router-dom'

import useAuthStore from '../../store/authStore'

const PublicRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (isLoggedIn) {
    return <Navigate to="/main" replace />
  }

  return <Outlet />
}

export default PublicRoute
