import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const InstagramProfile = lazy(() => import('./pages/InstagramProfile'))
const Admin = lazy(() => import('./pages/Admin'))

// Loading Fallback
const PageLoader = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
  </div>
)

const App = () => {

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reels" element={<InstagramProfile />} />
          <Route path="/instagram" element={<InstagramProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App