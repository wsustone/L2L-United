import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import RootLayout from '../screens/RootLayout.jsx'

const ParentInfoPage = lazy(() => import('../screens/ParentInfoPage.jsx'))
const PortalPage = lazy(() => import('../screens/PortalPage.jsx'))
const SignInPage = lazy(() => import('../screens/SignInPage.jsx'))
const RegisterPage = lazy(() => import('../screens/RegisterPage.jsx'))

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <ParentInfoPage /> },
      { path: 'portal', element: <PortalPage /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]

export default routes
