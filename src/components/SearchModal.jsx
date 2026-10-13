import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, FileText, Briefcase, Sparkles, BookOpen } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { DEFAULT_BLOG_POSTS } from '../data/blogData';

export const SearchModal = ({ isOpen, onClose }) => {
  const { services = [], portfolio = [], blogPosts = [] } = useSite();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on modal open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  // Static Pages Index
  const pages = [
    { title: 'Home', path: '/', category: 'Page', desc: 'Overview, hero showcase, and client value proposition' },
    { title: 'About Mayank', path: '/about', category: 'Page', desc: 'Background, 1-year experience, skill matrix, and CV download' },
    { title: 'All Services', path: '/services', category: 'Page', desc: 'Directory of all 7 specialized growth and AI services' },
    { title: 'Portfolio & Work', path: '/portfolio', category: 'Page', desc: 'Selected campaigns, AI reels, and sample case studies' },
    { title: 'Meta & Google Ads', path: '/ads', category: 'Page', desc: 'Performance ad creatives, hooks, and ROAS framework' },
    { title: 'Process & Methodology', path: '/process', category: 'Page', desc: '4-stage client workflow from audit to weekly iteration' },
    { title: 'Blog & Playbooks', path: '/blog', category: 'Page', desc: '8 in-depth tactical guides on Meta Ads, AI video, and SEO' },
    { title: 'Contact & Inquiry', path: '/contact', category: 'Page', desc: 'Direct brief submission and WhatsApp founder chat' },
    { title: 'Privacy Policy', path: '/privacy-policy', category: 'Page', desc: 'Data protection and DPDP Act compliance notice' },
    { title: 'Terms of Service', path: '/terms', category: 'Page', desc: 'Engagement terms, IP rights, and milestones' },
  ];

  // Dynamic Services Index
  const serviceItems = services.map((s) => ({
    title: s.name,
    path: `/services/${s.slug}`,
    category: 'Service',
    desc: s.intro || s.overview || 'Specialized marketing capability',
  }));

  // Dynamic Portfolio Index
  const portfolioItems = portfolio.map((p) => ({
    title: p.title,
    path: '/portfolio',
    category: 'Case Study',
    desc: p.overview || `${p.category} project`,
  }));

  // Dynamic Blog Articles Index
  const postsSource = blogPosts.length > 0 ? blogPosts : DEFAULT_BLOG_POSTS;
  const blogItems = postsSource.map((b) => ({
    title: b.title,
    path: `/blog/${b.slug}`,
    category: 'Article',
    desc: b.summary || b.category,
  }));

  const allItems = [...pages, ...serviceItems, ...blogItems, ...portfolioItems];

  // Filter items based on query
  const q = query.trim().toLowerCase();
  const filteredResults = q
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      ).slice(0, 8)
    : [
        ...pages.slice(0, 4),
        ...serviceItems.slice(0, 3),
        ...blogItems.slice(0, 2),
      ];

  const handleSelect = (item) => {
    navigate(item.path);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Service':
        return <Sparkles size={14} color="#FF3D0A" />;
      case 'Article':
        return <BookOpen size={14} color="#FFB92E" />;
      case 'Case Study':
        return <Briefcase size={14} color="#25D366" />;
      default:
        return <FileText size={14} color="#888" />;
    }
  };

  return (
    <div
      className="search-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Site Search"
    >
      <div
        className="search-modal-box"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="search-modal-header">
          <Search size={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search services, articles, portfolio, pages..."
            className="search-input"
            aria-label="Search site content"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="search-clear-btn"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          ) : (
            <kbd className="search-kbd-badge">ESC</kbd>
          )}
        </div>

        {/* Results List */}
        <div className="search-results-list" role="listbox">
          {filteredResults.length === 0 ? (
            <div className="search-no-results">
              <p>No matches found for "{query}".</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--mutedtext)' }}>
                Try searching for "Meta Ads", "AI Video", "Pricing", or "Blog".
              </span>
            </div>
          ) : (
            filteredResults.map((item, idx) => (
              <div
                key={`${item.path}-${idx}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`search-result-item ${selectedIndex === idx ? 'selected' : ''}`}
                role="option"
                aria-selected={selectedIndex === idx}
              >
                <div className="search-result-left">
                  <div className="search-result-icon">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <div className="search-result-title">
                      <span>{item.title}</span>
                      <span className="search-category-badge">{item.category}</span>
                    </div>
                    <div className="search-result-desc">{item.desc}</div>
                  </div>
                </div>
                <ArrowRight size={15} className="search-result-arrow" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer Shortcuts */}
        <div className="search-modal-footer">
          <div className="search-shortcuts">
            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>ESC</kbd> to dismiss</span>
          </div>
        </div>
      </div>
    </div>
  );
};
