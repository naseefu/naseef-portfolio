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
import { ThemeProvider } from './context/ThemeContext'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'

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
 
export default function App() {
  const [loaded, setLoaded] = useState(false)
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Cursor />
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
      </BrowserRouter>
    </ThemeProvider>
  )
}