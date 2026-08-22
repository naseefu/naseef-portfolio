import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'
import WorkDetail from './pages/WorkDetails'
import ArticlesPage from './pages/ArticlesPage'
import ArticleDetail from './pages/ArticleDetail'
import AwardsPage from './pages/AwardsPage'
import ContactPage from './pages/ContactPage'
import WorksPage from './pages/WorksPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import { ThemeProvider } from './context/ThemeContext'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'

// Admin routes render outside the portfolio shell (no Navbar / Loader)
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorksPage />} />
        <Route path="/work/:id" element={<WorkDetail />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function PortfolioShell() {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      <ScrollProgress />
      <Loader onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <ScrollToTop />
          <Navbar />
          <main style={{ paddingTop: '67px' }}>
            <AnimatedRoutes />
          </main>
        </>
      )}
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  return (
    <>
      <Cursor />
      {isAdmin ? <AdminRoutes /> : <PortfolioShell />}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}