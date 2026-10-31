import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  BookOpen,
  ExternalLink,
  Save,
  X,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { BLOG_CATEGORIES, DEFAULT_BLOG_POSTS } from '../data/blogData';

export const AdminBlogTab = () => {
  const { blogPosts = [], addBlogPost, updateBlogPost, deleteBlogPost, showToast } = useSite();
  const activePosts = blogPosts && blogPosts.length > 0 ? blogPosts : DEFAULT_BLOG_POSTS;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Form state
  const initialFormState = {
    id: null,
    title: '',
    slug: '',
    category: BLOG_CATEGORIES[0] || 'Meta Ads',
    summary: '',
    readTime: '6 min read',
    coverImage: '/images/blog/photo-1618005182384-a83a8bd57fbe.webp',
    tags: 'Meta Ads, Scaling, Marketing',
    content: '',
    published: true,
    seoTitle: '',
    metaDescription: '',
    faqs: [
      { q: '', a: '' },
    ],
  };

  const [formData, setFormData] = useState(initialFormState);

  // Filter posts
  const filteredPosts = activePosts.filter((post) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCreate = () => {
    setFormData(initialFormState);
    setActivePost(null);
    setIsEditing(true);
    setPreviewMode(false);
  };

  const handleOpenEdit = (post) => {
    setActivePost(post);
    setFormData({
      id: post.id,
      title: post.title || '',
      slug: post.slug || '',
      category: post.category || 'Meta Ads',
      summary: post.summary || '',
      readTime: post.readTime || '6 min read',
      coverImage: post.coverImage || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      content: post.content || '',
      published: post.published !== false,
      seoTitle: post.seoTitle || post.title || '',
      metaDescription: post.metaDescription || post.summary || '',
      faqs: post.faqs && post.faqs.length > 0 ? post.faqs : [{ q: '', a: '' }],
    });
    setIsEditing(true);
    setPreviewMode(false);
  };

  const handleGenerateSlug = () => {
    if (!formData.title) return;
    const generated = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    setFormData((prev) => ({
      ...prev,
      slug: generated,
      seoTitle: prev.seoTitle || prev.title,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Article title is required', 'error');
      return;
    }

    const slug = (formData.slug.trim() || formData.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'))
      .replace(/--+/g, '-');

    const cleanFaqs = (formData.faqs || []).filter((f) => f.q.trim() && f.a.trim());

    const postPayload = {
      title: formData.title.trim(),
      slug,
      category: formData.category,
      summary: formData.summary.trim(),
      readTime: formData.readTime.trim() || '6 min read',
      coverImage: formData.coverImage.trim(),
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      content: formData.content,
      published: formData.published,
      seoTitle: formData.seoTitle.trim() || formData.title.trim(),
      metaDescription: formData.metaDescription.trim() || formData.summary.trim(),
      faqs: cleanFaqs,
    };

    if (activePost && activePost.id) {
      updateBlogPost(activePost.id, postPayload);
    } else {
      addBlogPost(postPayload);
    }

    setIsEditing(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(id);
    }
  };

  const handleTogglePublish = (post) => {
    updateBlogPost(post.id, { published: !post.published });
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { q: '', a: '' }],
    }));
  };

  const handleRemoveFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setFormData((prev) => {
      const nextFaqs = [...prev.faqs];
      nextFaqs[index] = { ...nextFaqs[index], [field]: value };
      return { ...prev, faqs: nextFaqs };
    });
  };

  return (
    <div className="admin-blog-tab" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--charcoal)', marginBottom: '4px' }}>
            Blog & Guides CMS
          </h2>
          <p style={{ color: 'var(--mutedtext)', fontSize: '0.9rem' }}>
            Manage in-depth technical playbooks, SEO metadata, and publishing status.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
        >
          <Plus size={16} /> Write New Article
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          backgroundColor: 'var(--purewhite)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1', minWidth: '260px' }}>
          <Search size={18} color="var(--mutedtext)" />
          <input
            type="text"
            placeholder="Search articles by title or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '0.92rem',
              color: 'var(--charcoal)',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`admin-filter-pill ${selectedCategory === 'All' ? 'active' : ''}`}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: '1px solid var(--border-color)',
              backgroundColor: selectedCategory === 'All' ? 'var(--charcoal)' : 'var(--cream-subtle)',
              color: selectedCategory === 'All' ? '#fff' : 'var(--charcoal)',
              cursor: 'pointer',
            }}
          >
            All ({activePosts.length})
          </button>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid var(--border-color)',
                backgroundColor: selectedCategory === cat ? 'var(--charcoal)' : 'var(--cream-subtle)',
                color: selectedCategory === cat ? '#fff' : 'var(--charcoal)',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid / Table */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: 'var(--purewhite)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Thumbnail */}
            <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#eee' }}>
              <img
                src={post.coverImage}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/blog/photo-1460925895917-afdab827c52f.webp';
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: 'rgba(26,26,26,0.85)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  textTransform: 'uppercase',
                }}
              >
                {post.category}
              </span>

              <button
                onClick={() => handleTogglePublish(post)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: post.published ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {post.published ? 'Published' : 'Draft'}
              </button>
            </div>

            {/* Info */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--mutedtext)', marginBottom: '6px' }}>
                {post.date} · {post.readTime}
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', lineHeight: 1.35, marginBottom: '8px' }}>
                {post.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--mutedtext)', lineHeight: 1.5, marginBottom: '16px', flexGrow: 1 }}>
                {post.summary?.slice(0, 110)}...
              </p>

              {/* Actions Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <Link
                  to={`/blog/${post.slug}`}
                  target="_blank"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    color: 'var(--mutedtext)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  <ExternalLink size={13} /> View Live
                </Link>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleOpenEdit(post)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'var(--cream-subtle)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--charcoal)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    <Edit size={13} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: 'rgba(255, 74, 28, 0.08)',
                      border: '1px solid rgba(255, 74, 28, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      color: 'var(--brand)',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    title="Delete Article"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isEditing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--purewhite)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>
                {activePost ? 'Edit Blog Article' : 'Create New Blog Article'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mutedtext)' }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Title & Slug */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. How to Start Meta Ads for a Small Business in India"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'flex-end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="how-to-start-meta-ads-small-business-india"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  style={{ padding: '10px 16px', backgroundColor: 'var(--cream-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Auto-Gen Slug
                </button>
              </div>

              {/* Category, Read Time & Published Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  >
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="6 min read"
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    Publish Status
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                      {formData.published ? 'Published (Live)' : 'Draft (Hidden)'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Cover Image & Tags */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Meta Ads, India, Scaling"
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Summary / Excerpt */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Summary / Excerpt (Answer-First Introduction)
                </label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Direct 40-60 word answer for AEO and preview cards..."
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.92rem', lineHeight: 1.6 }}
                />
              </div>

              {/* Markdown Content */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                    Article Markdown Body
                  </label>
                  <span style={{ fontSize: '0.78rem', color: 'var(--mutedtext)', fontFamily: 'var(--font-mono)' }}>
                    Supports H2 (##), H3 (###), lists, bold, blockquotes
                  </span>
                </div>
                <textarea
                  rows={12}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="## What You Will Learn in This Guide..."
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem', fontFamily: 'monospace', lineHeight: 1.6 }}
                />
              </div>

              {/* SEO Meta Fields Accordion */}
              <div style={{ backgroundColor: 'var(--cream-subtle)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '12px' }}>
                  SEO & Social Metadata
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      SEO Meta Title ({formData.seoTitle?.length || 0}/60 chars)
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      placeholder="Title displayed in Google search results..."
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      SEO Meta Description ({formData.metaDescription?.length || 0}/160 chars)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder="140-160 character description snippet for search engines..."
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem', lineHeight: 1.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* FAQs Builder */}
              <div style={{ backgroundColor: 'var(--purewhite)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                    Frequently Asked Questions (Schema FAQPage)
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    style={{ padding: '6px 12px', backgroundColor: 'var(--cream-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    + Add FAQ
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {formData.faqs.map((faq, index) => (
                    <div key={index} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '12px', backgroundColor: 'var(--cream-subtle)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--brand)' }}>
                          Question #{index + 1}
                        </span>
                        {formData.faqs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveFaq(index)}
                            style={{ background: 'none', border: 'none', color: '#c00', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. What is the minimum ad spend required?"
                        value={faq.q}
                        onChange={(e) => handleFaqChange(index, 'q', e.target.value)}
                        style={{ width: '100%', padding: '6px 10px', marginBottom: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                      />
                      <textarea
                        rows={2}
                        placeholder="Detailed, direct answer to the question..."
                        value={faq.a}
                        onChange={(e) => handleFaqChange(index, 'a', e.target.value)}
                        style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ padding: '12px 24px', backgroundColor: 'var(--cream-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Save size={16} /> Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
