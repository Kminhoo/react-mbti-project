import { Navigate, Outlet } from 'react-router-dom'

import useAuthStore from '../../store/authStore'

const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
