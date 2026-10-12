import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_SITE,
  DEFAULT_SERVICES,
  DEFAULT_PORTFOLIO,
  INITIAL_INQUIRIES,
  DEFAULT_ADS,
} from '../data/initialData';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  // Site Info
  const [site, setSite] = useState(() => {
    const saved = localStorage.getItem('mayank_site_info');
    return saved ? JSON.parse(saved) : DEFAULT_SITE;
  });

  // Services
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('mayank_services');
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  });

  // Portfolio
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('mayank_portfolio');
    return saved ? JSON.parse(saved) : DEFAULT_PORTFOLIO;
  });

  // Ads
  const [ads, setAds] = useState(() => {
    const saved = localStorage.getItem('mayank_ads');
    return saved ? JSON.parse(saved) : DEFAULT_ADS;
  });

  // Inquiries
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('mayank_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('mayank_admin_auth') === 'true';
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mayank_site_info', JSON.stringify(site));
  }, [site]);

  useEffect(() => {
    localStorage.setItem('mayank_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('mayank_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('mayank_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('mayank_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('mayank_admin_auth', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Actions
  const updateSiteInfo = (newInfo) => {
    setSite((prev) => ({ ...prev, ...newInfo }));
    showToast('Site settings updated successfully');
  };

  const addInquiry = (inquiryData) => {
    const newInq = {
      id: `inq-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'New',
      notes: '',
      ...inquiryData,
    };
    setInquiries((prev) => [newInq, ...prev]);
    showToast('Inquiry sent successfully! Mayank will get back to you shortly.');
    return newInq;
  };

  const updateInquiryStatus = (id, status) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Inquiry marked as ${status}`);
  };

  const updateInquiryNotes = (id, notes) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
    showToast('Notes saved successfully');
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    showToast('Inquiry deleted', 'info');
  };

  const addPortfolioItem = (item) => {
    const newItem = {
      id: `proj-${Date.now()}`,
      published: true,
      featured: false,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      ...item,
    };
    setPortfolio((prev) => [newItem, ...prev]);
    showToast('Project added to portfolio');
    return newItem;
  };

  const updatePortfolioItem = (id, updatedData) => {
    setPortfolio((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
    showToast('Project updated successfully');
  };

  const deletePortfolioItem = (id) => {
    setPortfolio((prev) => prev.filter((item) => item.id !== id));
    showToast('Project removed from portfolio', 'info');
  };

  // Ads Actions
  const addAd = (adData) => {
    const now = new Date().toISOString();
    const newAd = {
      id: `ad-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      status: 'published',
      featured: false,
      order: ads.length + 1,
      isSample: false,
      ...adData,
    };
    setAds((prev) => [newAd, ...prev]);
    showToast('Ad campaign saved successfully');
    return newAd;
  };

  const updateAd = (id, updatedFields) => {
    setAds((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedFields, updatedAt: new Date().toISOString() }
          : item
      )
    );
    showToast('Ad updated successfully');
  };

  const deleteAd = (id) => {
    setAds((prev) => prev.filter((item) => item.id !== id));
    showToast('Ad removed successfully', 'info');
  };

  const duplicateAd = (id) => {
    const target = ads.find((a) => a.id === id);
    if (!target) return;
    const now = new Date().toISOString();
    const cloned = {
      ...target,
      id: `ad-${Date.now()}`,
      title: `${target.title} (Copy)`,
      order: ads.length + 1,
      isSample: false,
      createdAt: now,
      updatedAt: now,
    };
    setAds((prev) => [cloned, ...prev]);
    showToast(`Duplicated: ${target.title}`);
  };

  const bulkDeleteAds = (ids) => {
    if (!ids || ids.length === 0) return;
    setAds((prev) => prev.filter((item) => !ids.includes(item.id)));
    showToast(`${ids.length} ads deleted successfully`, 'info');
  };

  const bulkUpdateAdStatus = (ids, status) => {
    if (!ids || ids.length === 0) return;
    const now = new Date().toISOString();
    setAds((prev) =>
      prev.map((item) =>
        ids.includes(item.id)
          ? { ...item, status, updatedAt: now }
          : item
      )
    );
    showToast(`${ids.length} ads set to ${status}`);
  };

  const reorderAds = (reorderedAds) => {
    setAds(reorderedAds);
    showToast('Ad display order updated');
  };

  const updateService = (slug, updatedFields) => {
    setServices((prev) =>
      prev.map((s) => (s.slug === slug ? { ...s, ...updatedFields } : s))
    );
    showToast('Service details updated');
  };

  const loginAdmin = (password) => {
    // Accepts demo admin password or quick access
    if (password === 'admin123' || password === 'mayank2026') {
      setIsAdminLoggedIn(true);
      showToast('Welcome back, Mayank!');
      return true;
    }
    showToast('Invalid admin passkey. (Hint: admin123)', 'error');
    return false;
  };

  const loginAdminDirect = () => {
    setIsAdminLoggedIn(true);
    showToast('Authenticated as Mayank Aggarwal');
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    showToast('Logged out of Admin Portal', 'info');
  };

  const resetAllData = () => {
    setSite(DEFAULT_SITE);
    setServices(DEFAULT_SERVICES);
    setPortfolio(DEFAULT_PORTFOLIO);
    setAds(DEFAULT_ADS);
    setInquiries(INITIAL_INQUIRIES);
    showToast('Demo data restored to defaults');
  };

  return (
    <SiteContext.Provider
      value={{
        site,
        services,
        portfolio,
        ads,
        inquiries,
        isAdminLoggedIn,
        toast,
        showToast,
        updateSiteInfo,
        addInquiry,
        updateInquiryStatus,
        updateInquiryNotes,
        deleteInquiry,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        addAd,
        updateAd,
        deleteAd,
        duplicateAd,
        bulkDeleteAds,
        bulkUpdateAdStatus,
        reorderAds,
        updateService,
        loginAdmin,
        loginAdminDirect,
        logoutAdmin,
        resetAllData,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
