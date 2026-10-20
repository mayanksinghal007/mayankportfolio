import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_SITE,
  DEFAULT_SERVICES,
  DEFAULT_PORTFOLIO,
  INITIAL_INQUIRIES,
  DEFAULT_ADS,
  DEFAULT_MEDIA_ASSETS,
} from '../data/initialData';
import { DEFAULT_BLOG_POSTS } from '../data/blogData';

const SiteContext = createContext();

// Helper to safely access localStorage during SSR / Prerendering in Node
const getStored = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const SiteProvider = ({ children }) => {
  // Site Info
  const [site, setSite] = useState(() => {
    const stored = getStored('mayank_site_info', DEFAULT_SITE);
    if (stored && (!stored.linkedin || stored.linkedin.includes('linkedin.com/in/mayank-aggarwal'))) {
      return { ...stored, linkedin: DEFAULT_SITE.linkedin };
    }
    return stored;
  });

  // Media & Video CMS Assets
  const [mediaAssets, setMediaAssets] = useState(() => getStored('mayank_media_assets', DEFAULT_MEDIA_ASSETS));

  // Services
  const [services, setServices] = useState(() => getStored('mayank_services', DEFAULT_SERVICES));

  // Portfolio
  const [portfolio, setPortfolio] = useState(() => getStored('mayank_portfolio', DEFAULT_PORTFOLIO));

  // Ads
  const [ads, setAds] = useState(() => getStored('mayank_ads', DEFAULT_ADS));

  // Inquiries
  const [inquiries, setInquiries] = useState(() => getStored('mayank_inquiries', INITIAL_INQUIRIES));

  // Blog Posts (ensure full 50 posts are present)
  const [blogPosts, setBlogPosts] = useState(() => {
    const stored = getStored('mayank_blog_posts', null);
    if (!stored || !Array.isArray(stored) || stored.length < DEFAULT_BLOG_POSTS.length) {
      return DEFAULT_BLOG_POSTS;
    }
    return stored;
  });

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('mayank_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setToast(null);
      }, 4000);
    }
  };

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mayank_site_info', JSON.stringify(site));
      } catch (e) {}
    }
  }, [site]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mayank_media_assets', JSON.stringify(mediaAssets));
      } catch (e) {}
    }
  }, [mediaAssets]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mayank_services', JSON.stringify(services));
      } catch (e) {}
    }
  }, [services]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mayank_portfolio', JSON.stringify(portfolio));
      } catch (e) {}
    }
  }, [portfolio]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mayank_ads', JSON.stringify(ads));
      } catch (e) {}
    }
  }, [ads]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mayank_inquiries', JSON.stringify(inquiries));
      } catch (e) {}
    }
  }, [inquiries]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mayank_blog_posts', JSON.stringify(blogPosts));
      } catch (e) {}
    }
  }, [blogPosts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mayank_admin_auth', isAdminLoggedIn ? 'true' : 'false');
      } catch (e) {}
    }
  }, [isAdminLoggedIn]);

  // Actions
  const updateSiteInfo = (newInfo) => {
    setSite((prev) => ({ ...prev, ...newInfo }));
    showToast('Site settings updated successfully');
  };

  // Media & Video CMS Actions
  const updateMediaAsset = (key, updatedData) => {
    setMediaAssets((prev) => {
      const existing = prev[key] || {};
      return {
        ...prev,
        [key]: {
          ...existing,
          ...updatedData,
          updatedAt: new Date().toISOString(),
        },
      };
    });
    showToast('Media asset updated & published successfully');
  };

  const resetMediaAssets = () => {
    setMediaAssets(DEFAULT_MEDIA_ASSETS);
    showToast('Media assets restored to default showreels & photos');
  };

  const addInquiry = (inquiryData) => {
    // 1. Anti-Spam Honeypot Security Check
    if (inquiryData.website_bot_trap || inquiryData.bot_field || inquiryData.website_security_token) {
      console.warn('Spam bot submission caught by honeypot filter.');
      return { id: `inq-bot-blocked`, status: 'Blocked' };
    }

    const newInq = {
      id: `inq-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'New',
      notes: '',
      ...inquiryData,
    };

    // 2. Save locally for Admin Panel & offline resilience
    setInquiries((prev) => [newInq, ...prev]);

    // 3. Dispatch to primary destination: contact.klikwise@gmail.com
    const recipient = site?.inquiryEmail || 'contact.klikwise@gmail.com';
    if (typeof window !== 'undefined') {
      try {
        const payload = {
          _subject: `🎯 New Lead: ${inquiryData.name || 'Website Visitor'} [${inquiryData.page || 'Inbound'}]`,
          _template: 'table',
          _captcha: 'false',
          _replyto: inquiryData.email || 'contact.klikwise@gmail.com',
          FullName: inquiryData.name || 'Not provided',
          Phone_WhatsApp: inquiryData.phone || inquiryData.contact_method || 'Not provided',
          Location_City: inquiryData.location || inquiryData.city || 'Not provided',
          Email: inquiryData.email || 'Not provided',
          Service_Interested: inquiryData.service || 'General Consultation / Growth Strategy',
          Company_Brand: inquiryData.company || 'Individual / Startup',
          Currency: inquiryData.currency || 'USD',
          Budget: inquiryData.budget || 'Flexible',
          Message_Details: inquiryData.description || inquiryData.message || 'Submitted via 30% Scroll Lead Modal',
          PageSource: inquiryData.page || (typeof window !== 'undefined' ? window.location.pathname : '/'),
          SubmissionTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        };

        fetch(`https://formsubmit.co/ajax/${recipient}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.message && data.message.includes('Activation')) {
              console.info('FormSubmit Activation Pending on contact.klikwise@gmail.com');
            }
          })
          .catch((err) => {
            console.log('Background lead dispatcher notice:', err);
          });
      } catch (err) {
        console.warn('Inquiry email forward attempt:', err);
      }
    }

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

  // Blog Actions
  const addBlogPost = (postData) => {
    const now = new Date().toISOString().split('T')[0];
    const newPost = {
      id: `post-${Date.now()}`,
      date: now,
      updated: now,
      published: true,
      author: site.name || 'Mayank Aggarwal',
      authorRole: site.title || 'Digital Marketing & AI Specialist',
      ...postData,
    };
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast('Blog article created successfully');
    return newPost;
  };

  const updateBlogPost = (id, updatedFields) => {
    const now = new Date().toISOString().split('T')[0];
    setBlogPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, ...updatedFields, updated: now }
          : post
      )
    );
    showToast('Blog article updated successfully');
  };

  const deleteBlogPost = (id) => {
    setBlogPosts((prev) => prev.filter((post) => post.id !== id));
    showToast('Blog article removed', 'info');
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
    setMediaAssets(DEFAULT_MEDIA_ASSETS);
    setServices(DEFAULT_SERVICES);
    setPortfolio(DEFAULT_PORTFOLIO);
    setAds(DEFAULT_ADS);
    setInquiries(INITIAL_INQUIRIES);
    setBlogPosts(DEFAULT_BLOG_POSTS);
    showToast('Demo data restored to defaults');
  };

  return (
    <SiteContext.Provider
      value={{
        site,
        mediaAssets,
        services,
        portfolio,
        ads,
        inquiries,
        blogPosts,
        isAdminLoggedIn,
        toast,
        showToast,
        updateSiteInfo,
        updateMediaAsset,
        resetMediaAssets,
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
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
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
