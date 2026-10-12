import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Portfolio } from './pages/Portfolio';
import { Process } from './pages/Process';
import { Contact } from './pages/Contact';
import { AdsPage } from './pages/AdsPage';
import { Admin } from './pages/Admin';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';

// Helper to automatically scroll to top on every navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout Wrapper
const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {/* Editorial Grain Overlay */}
      <div className="grain-overlay" />

      {/* Render Navbar only if not on Admin standalone view */}
      {!isAdmin && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy-policy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Render Footer only if not on Admin view */}
      {!isAdmin && <Footer />}

      {/* Global Interactive Toast Notification */}
      <Toast />
    </>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </SiteProvider>
  );
}
