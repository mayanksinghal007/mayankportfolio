import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SearchModal } from './components/SearchModal';
import { ScrollLeadModal } from './components/ScrollLeadModal';
import { useScrollReveal } from './hooks/useScrollReveal';

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
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';

// Helper to automatically scroll to top on every navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

// Trailing slash redirect helper for consistent canonical indexing
const TrailingSlashHandler = () => {
  const location = useLocation();
  if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
    const cleanPath = location.pathname.slice(0, -1);
    return <Navigate to={`${cleanPath}${location.search}${location.hash}`} replace />;
  }
  return null;
};

// Exported Layout Wrapper for client and SSR prerendering
export const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Activate 60fps lightweight intersection observer reveals on route changes
  useScrollReveal();

  // Keyboard shortcut Cmd/Ctrl+K to toggle Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <ScrollToTop />
      <TrailingSlashHandler />

      {/* Top Reading Progress Bar */}
      {!isAdmin && <ScrollProgressBar />}

      {/* Editorial Grain Overlay */}
      <div className="grain-overlay" />

      {/* Render Navbar only if not on Admin standalone view */}
      {!isAdmin && <Navbar onOpenSearch={() => setIsSearchOpen(true)} />}

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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy-policy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Render Footer only if not on Admin view */}
      {!isAdmin && <Footer />}

      {/* Global Floating WhatsApp Direct Reachout */}
      {!isAdmin && <FloatingWhatsApp />}

      {/* Global Cmd/Ctrl+K Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* 30% Scroll Contextual Lead Modal */}
      {!isAdmin && <ScrollLeadModal />}

      {/* Global Interactive Toast Notification */}
      <Toast />
    </>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <SiteProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </SiteProvider>
    </HelmetProvider>
  );
}
