import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import ScrollToTop from '@/components/ScrollToTop'
import { AuthProvider } from '@/providers/AuthProvider.jsx'
import ProtectedRoute from '@/components/admin/ProtectedRoute'
import { Loader2 } from 'lucide-react'

// Public site pages
import Index from '@/pages/Index'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Auth from '@/pages/Auth'
import NotFound from '@/pages/NotFound'
import UnderConstruction from '@/pages/UnderConstruction'
import Homes from '@/pages/Homes'
import HomeModel from '@/pages/HomeModel'

// Admin pages
import Dashboard from '@/pages/admin/Dashboard'
import Leads from '@/pages/admin/Leads'
import Staff from '@/pages/admin/Staff'

// Portal screens (lazy-loaded)
const RootLayout = lazy(() => import('@/screens/RootLayout.jsx'))
const PortalInfoPage = lazy(() => import('@/screens/PortalInfoPage.jsx'))
const PortalPage = lazy(() => import('@/screens/PortalPage.jsx'))
const DocumentsPage = lazy(() => import('@/screens/DocumentsPage.jsx'))
const ApiKeysPage = lazy(() => import('@/screens/ApiKeysPage.jsx'))
const ProfilePage = lazy(() => import('@/screens/ProfilePage.jsx'))
const SignInPage = lazy(() => import('@/screens/SignInPage.jsx'))
const RegisterPage = lazy(() => import('@/screens/RegisterPage.jsx'))
const ResetPasswordPage = lazy(() => import('@/screens/ResetPasswordPage.jsx'))
const PrivacyPolicyPage = lazy(() => import('@/screens/PrivacyPolicyPage.jsx'))
const SupportPage = lazy(() => import('@/screens/SupportPage.jsx'))

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }>
              <Routes>
                {/* ── Public site ── */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/investment" element={<UnderConstruction />} />
                <Route path="/homes" element={<Homes />} />
                <Route path="/homes/:model" element={<HomeModel />} />
                <Route path="/solutions" element={<UnderConstruction />} />
                <Route path="/solutions/thermasteel" element={<UnderConstruction />} />
                <Route path="/solutions/bio-pure" element={<UnderConstruction />} />
                <Route path="/solutions/exterior" element={<UnderConstruction />} />
                <Route path="/products" element={<Navigate to="/solutions" replace />} />
                <Route path="/products/thermasteel-panels" element={<UnderConstruction />} />
                <Route path="/products/bio-pure-models" element={<UnderConstruction />} />
                <Route path="/products/u-stucco" element={<UnderConstruction />} />
                <Route path="/news" element={<UnderConstruction />} />
                <Route path="/news/:slug" element={<UnderConstruction />} />
                <Route path="/contact" element={<Contact />} />

                {/* ── Admin auth ── */}
                <Route path="/auth" element={<Auth />} />

                {/* ── Admin (protected) ── */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/leads"
                  element={
                    <ProtectedRoute>
                      <Leads />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/staff"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Staff />
                    </ProtectedRoute>
                  }
                />

                {/* ── Portal (uses RootLayout with its own nav/header) ── */}
                <Route element={<RootLayout />}>
                  <Route path="/portal-info" element={<PortalInfoPage />} />
                  <Route path="/portal" element={<PortalPage />} />
                  <Route path="/share" element={<DocumentsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/api-keys" element={<ApiKeysPage />} />
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/support" element={<SupportPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
