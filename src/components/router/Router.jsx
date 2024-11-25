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

import 'react-toastify/dist/ReactToastify.css'

const Router = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
        <Route element={<Layout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mbti-test" element={<TestPage />} />
          <Route path="/test-result" element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
