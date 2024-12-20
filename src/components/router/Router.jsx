import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import HomePage from '../../pages/home/HomePage'
import MainPage from '../../pages/main/MainPage'
import LoginPage from '../../pages/login/LoginPage'
import SignUpPage from '../../pages/signup/SignUpPage'
import ProfilePage from '../../pages/profile/ProfilePage'
import TestPage from '../../pages/test/TestPage'
import ResultPage from '../../pages/result/ResultPage'

import Layout from '../layout/Layout'

import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

import 'react-toastify/dist/ReactToastify.css'

const Router = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/main" element={<MainPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/mbti-test" element={<TestPage />} />
            <Route path="/test-result" element={<ResultPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
