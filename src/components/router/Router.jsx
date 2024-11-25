import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../../pages/home/HomePage'
import MainPage from '../../pages/main/MainPage'
import LoginPage from '../../pages/login/LoginPage'
import SignUpPage from '../../pages/signup/SignUpPage'
import ProfilePage from '../../pages/profile/ProfilePage'
import TestPage from '../../pages/test/TestPage'
import ResultPage from '../../pages/result/ResultPage'

import Layout from '../layout/Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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
