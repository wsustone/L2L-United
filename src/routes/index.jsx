import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import RootLayout from '../screens/RootLayout.jsx'

const PortalInfoPage = lazy(() => import('../screens/PortalInfoPage.jsx'))
const PortalPage = lazy(() => import('../screens/PortalPage.jsx'))
const ProfilePage = lazy(() => import('../screens/ProfilePage.jsx'))
const DocumentsPage = lazy(() => import('../screens/DocumentsPage.jsx'))
const ApiKeysPage = lazy(() => import('../screens/ApiKeysPage.jsx'))
const SignInPage = lazy(() => import('../screens/SignInPage.jsx'))
const RegisterPage = lazy(() => import('../screens/RegisterPage.jsx'))
const PrivacyPolicyPage = lazy(() => import('../screens/PrivacyPolicyPage.jsx'))
const ResetPasswordPage = lazy(() => import('../screens/ResetPasswordPage.jsx'))

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <PortalInfoPage /> },
      { path: 'portal', element: <PortalPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'share', element: <DocumentsPage /> },
      { path: 'api-keys', element: <ApiKeysPage /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]

export default routes
