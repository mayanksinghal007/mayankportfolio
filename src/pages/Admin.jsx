import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Settings,
  Sparkles,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  Download,
  Search,
  CheckCircle2,
  Save,
  RotateCcw,
  ExternalLink,
  MessageCircle,
  Mail,
  Video,
  Mic,
  FileText,
  Megaphone,
  BookOpen,
  Film,
  MapPin,
  Phone,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { AdminAdsTab } from '../components/AdminAdsTab';
import { AdminBlogTab } from '../components/AdminBlogTab';
import { AdminMediaTab } from '../components/AdminMediaTab';
import { SeoHead } from '../components/SeoHead';

export const Admin = () => {
  const {
    site,
    mediaAssets = {},
    services,
    portfolio,
    ads,
    inquiries,
    blogPosts = [],
    isAdminLoggedIn,
    loginAdmin,
    loginAdminDirect,
    logoutAdmin,
    updateSiteInfo,
    updateInquiryStatus,
    updateInquiryNotes,
    deleteInquiry,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    updateService,
    resetAllData,
    showToast,
  } = useSite();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('inquiries');

  // Inquiries Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');

  // Portfolio Management State
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Performance Marketing',
    client: '',
    overview: '',
    results: '',
    tags: 'Meta Ads, Campaign Strategy, Creative Angles',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80',
    hasVideoDemo: false,
    hasAudioDemo: false,
    verified: false,
  });

  // Site Settings Local State
  const [settingsForm, setSettingsForm] = useState(site);

  // AI Prompt Playground State
  const [aiPrompt, setAiPrompt] = useState('Cinematic 4K hyper-realistic macro shot of luxury streetwear fabric under neon lighting, camera pan down, 60fps');
  const [aiModel, setAiModel] = useState('Runway Gen-3 Alpha');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // If Not Authenticated: Show High-Security Editorial Passkey Gate
  if (!isAdminLoggedIn) {
    return (
      <>
        <SeoHead
          title="Admin CMS Portal | Private Access"
          description="Administration management portal for Mayank Aggarwal portfolio."
          canonicalPath="/admin"
          noindex={true}
        />
        <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--charcoal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          color: 'var(--softwhite)',
        }}
      >
        <div
          style={{
            maxWidth: '440px',
            width: '100%',
            backgroundColor: 'var(--charcoal-card)',
            border: '1px solid var(--charcoal-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 61, 10, 0.15)',
              color: 'var(--brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <Shield size={32} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '8px' }}>
            MAYANK ADMIN CMS
          </h2>
          <p style={{ color: 'rgba(255, 253, 249, 0.65)', fontSize: '0.88rem', marginBottom: '28px' }}>
            Protected management portal for inquiries, portfolio showcases, and site configurations.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAdmin(passwordInput);
            }}
          >
            <div style={{ marginBottom: '18px' }}>
              <input
                type="password"
                placeholder="Enter Admin Passkey (admin123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="form-control"
                style={{
                  backgroundColor: '#161616',
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.15)',
                  textAlign: 'center',
                  fontSize: '1rem',
                }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
              Unlock Dashboard
            </button>

            <button
              type="button"
              onClick={loginAdminDirect}
              className="btn-secondary"
              style={{ width: '100%', color: 'var(--gold)', borderColor: 'rgba(255, 185, 46, 0.3)' }}
            >
              1-Click Demo Access
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Link to="/" style={{ fontSize: '0.82rem', color: 'rgba(255,253,249,0.5)' }}>
              ← Return to Public Portfolio
            </Link>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export Inquiries to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Company', 'Service', 'Currency', 'Budget', 'Method', 'Status', 'Notes'];
    const rows = inquiries.map((i) => [
      i.id,
      new Date(i.created_at).toLocaleDateString(),
      `"${i.name}"`,
      i.email,
      `"${i.company || ''}"`,
      `"${i.service}"`,
      `"${i.currency || 'USD'}"`,
      `"${i.budget}"`,
      i.contact_method,
      i.status,
      `"${i.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mayank_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Inquiries exported to CSV');
  };

  // Add Project Submit
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.overview) {
      showToast('Please provide a title and overview', 'error');
      return;
    }

    addPortfolioItem({
      title: projectForm.title,
      category: projectForm.category,
      client: projectForm.client || 'Client Commission',
      overview: projectForm.overview,
      results: projectForm.results,
      tags: projectForm.tags.split(',').map((t) => t.trim()),
      image: projectForm.image,
      hasVideoDemo: projectForm.hasVideoDemo,
      hasAudioDemo: projectForm.hasAudioDemo,
    });

    setIsAddingProject(false);
    setProjectForm({
      title: '',
      category: 'Performance Marketing',
      client: '',
      overview: '',
      results: '',
      tags: 'Meta Ads, Scaling',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80',
      hasVideoDemo: false,
      hasAudioDemo: false,
    });
  };

  // Run AI Generator Simulator
  const handleRunAiPlayground = () => {
    setAiGenerating(true);
    setAiResult(null);
    setTimeout(() => {
      setAiGenerating(false);
      setAiResult({
        model: aiModel,
        prompt: aiPrompt,
        status: 'Render Completed in 4.2s (4K 60fps)',
        previewUrl: '/images/hero-showreel.jpg',
      });
      showToast('AI simulation rendered successfully!');
    }, 1200);
  };

  return (
    <>
      <SeoHead
        title="Admin CMS Dashboard | Mayank Aggarwal"
        description="Private CMS Dashboard"
        canonicalPath="/admin"
        noindex={true}
      />
      <div className="admin-layout">
      {/* Top Navbar */}
      <header className="admin-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--brand)' }}>
            MAYANK CMS
          </span>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>|</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Phase 2 Full CMS Management</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/"
            target="_blank"
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.78rem', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <ExternalLink size={13} /> View Live Website
          </Link>
          <button
            onClick={resetAllData}
            title="Reset to default demo data"
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RotateCcw size={14} /> Reset Data
          </button>
          <button
            onClick={logoutAdmin}
            style={{ color: 'var(--brand)', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LogOut size={14} /> Exit
          </button>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <div className="admin-body">
        {/* Sidebar Tabs */}
        <aside className="admin-sidebar">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          >
            <Inbox size={18} /> Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`admin-tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          >
            <FolderKanban size={18} /> Portfolio CMS ({portfolio.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`admin-tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
          >
            <BookOpen size={18} /> Blog CMS ({blogPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`admin-tab-btn ${activeTab === 'media' ? 'active' : ''}`}
            style={{ color: activeTab === 'media' ? 'var(--brand)' : 'inherit' }}
          >
            <Film size={18} /> Media & Video CMS ({Object.keys(mediaAssets).length})
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`admin-tab-btn ${activeTab === 'ads' ? 'active' : ''}`}
          >
            <Megaphone size={18} /> Ads Creatives ({ads.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`admin-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          >
            <FileText size={18} /> Services Copy ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('ai-lab')}
            className={`admin-tab-btn ${activeTab === 'ai-lab' ? 'active' : ''}`}
          >
            <Sparkles size={18} /> AI Media Lab
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <Settings size={18} /> Site Settings
          </button>
        </aside>

        {/* Content View */}
        <main className="admin-content">
          {/* STATS STRIP */}
          <div className="stats-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            <div className="stat-card">
              <div className="val">{inquiries.length}</div>
              <div className="lbl">Total Client Inquiries</div>
            </div>
            <div className="stat-card">
              <div className="val" style={{ color: 'var(--brand)' }}>
                {Object.keys(mediaAssets).length}
              </div>
              <div className="lbl">Managed Media Slots</div>
            </div>
            <div className="stat-card">
              <div className="val" style={{ color: 'var(--charcoal)' }}>
                {ads.length}
              </div>
              <div className="lbl">Ad Creatives ({ads.filter((a) => a.type === 'photo').length}P / {ads.filter((a) => a.type === 'video').length}V)</div>
            </div>
            <div className="stat-card">
              <div className="val" style={{ color: 'var(--gold)' }}>
                {portfolio.length}
              </div>
              <div className="lbl">Active Case Studies</div>
            </div>
          </div>

          {/* TAB: MEDIA & VIDEO CMS MANAGEMENT */}
          {activeTab === 'media' && <AdminMediaTab />}

          {/* TAB: BLOG CMS MANAGEMENT */}
          {activeTab === 'blog' && <AdminBlogTab />}

          {/* TAB: ADS MANAGEMENT */}
          {activeTab === 'ads' && <AdminAdsTab />}

          {/* TAB 1: INQUIRIES MANAGEMENT */}
          {activeTab === 'inquiries' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
                    INBOUND CLIENT BRIEFS
                  </h2>
                  <p style={{ color: 'var(--mutedtext)', fontSize: '0.88rem' }}>
                    Manage new project submissions, track negotiation stages, and add private follow-up notes.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={handleExportCSV} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                    <Download size={15} /> Export CSV
                  </button>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--mutedtext)' }} />
                  <input
                    type="text"
                    placeholder="Search by client name, email, brand, service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    style={{ paddingLeft: '38px', padding: '10px 14px 10px 38px', fontSize: '0.88rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {['All', 'New', 'In Discussion', 'Contacted', 'Closed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
                      style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Client & Contact</th>
                      <th>Service Required</th>
                      <th>Budget</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--mutedtext)' }}>
                          No inquiries found matching this search or filter.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq.id}>
                          <td style={{ fontSize: '0.8rem', color: 'var(--mutedtext)' }}>
                            {new Date(inq.created_at).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td>
                            <strong>{inq.name}</strong>
                            {inq.company && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)' }}>{inq.company}</div>
                            )}
                            <div style={{ fontSize: '0.78rem', color: 'var(--brand)' }}>{inq.email}</div>
                            {inq.phone && (
                              <div style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                <Phone size={11} /> {inq.phone}
                              </div>
                            )}
                            {inq.location && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                <MapPin size={11} /> {inq.location}
                              </div>
                            )}
                          </td>
                          <td style={{ fontWeight: 600 }}>{inq.service}</td>
                          <td>
                            {inq.currency && (
                              <span style={{ fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', backgroundColor: 'rgba(255, 61, 10, 0.15)', color: '#FF7A00', marginRight: '6px', fontWeight: 700 }}>
                                {inq.currency}
                              </span>
                            )}
                            {inq.budget || 'Flexible'}
                          </td>
                          <td>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                              }}
                            >
                              {inq.contact_method === 'WhatsApp' ? (
                                <MessageCircle size={13} color="#25D366" />
                              ) : (
                                <Mail size={13} color="#FF3D0A" />
                              )}
                              {inq.contact_method || 'WhatsApp'}
                            </span>
                          </td>
                          <td>
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                              style={{
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                border: '1px solid var(--border-color)',
                                backgroundColor:
                                  inq.status === 'New'
                                    ? 'rgba(255,61,10,0.1)'
                                    : inq.status === 'In Discussion'
                                    ? 'rgba(255,185,46,0.15)'
                                    : 'rgba(37,211,102,0.12)',
                              }}
                            >
                              <option value="New">New</option>
                              <option value="In Discussion">In Discussion</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => {
                                  setSelectedInquiry(inq);
                                  setEditingNotes(inq.notes || '');
                                }}
                                className="btn-secondary"
                                style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                title="Inspect Brief"
                              >
                                <Eye size={13} />
                              </button>
                              <button
                                onClick={() => deleteInquiry(inq.id)}
                                style={{ color: 'var(--brand)', padding: '6px 8px' }}
                                title="Delete Inquiry"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Inquiry Detail Modal */}
              {selectedInquiry && (
                <div className="modal-backdrop" onClick={() => setSelectedInquiry(null)}>
                  <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                      <div>
                        <span className="editorial-eyebrow">Brief Details</span>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginTop: '4px' }}>
                          {selectedInquiry.name}
                        </h3>
                      </div>
                      <button onClick={() => setSelectedInquiry(null)}>✕</button>
                    </div>
                    <div className="modal-body">
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)', fontWeight: 700 }}>EMAIL</div>
                          <div>{selectedInquiry.email}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)', fontWeight: 700 }}>PHONE / WHATSAPP</div>
                          <div style={{ color: '#10B981', fontWeight: 600 }}>{selectedInquiry.phone || 'Not Specified'}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)', fontWeight: 700 }}>CITY / LOCATION</div>
                          <div>{selectedInquiry.location || 'Not Specified'}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)', fontWeight: 700 }}>SOURCE PAGE</div>
                          <div>{selectedInquiry.page || 'Direct Inbound Form'}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)', fontWeight: 700 }}>SERVICE</div>
                          <div style={{ fontWeight: 700 }}>{selectedInquiry.service}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)', fontWeight: 700 }}>ESTIMATED BUDGET</div>
                          <div>{selectedInquiry.budget || 'Flexible'}</div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)', fontWeight: 700, marginBottom: '6px' }}>
                          PROJECT DESCRIPTION
                        </div>
                        <div
                          style={{
                            backgroundColor: 'var(--softwhite)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '16px',
                            fontSize: '0.92rem',
                            lineHeight: 1.6,
                          }}
                        >
                          {selectedInquiry.description}
                        </div>
                      </div>

                      {/* Internal Notes Editor */}
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--mutedtext)', fontWeight: 700, marginBottom: '6px' }}>
                          INTERNAL NOTES & NEXT ACTIONS
                        </div>
                        <textarea
                          rows={3}
                          value={editingNotes}
                          onChange={(e) => setEditingNotes(e.target.value)}
                          placeholder="Add private follow-up notes, audit links, or call summaries..."
                          className="form-control"
                        />
                        <button
                          onClick={() => updateInquiryNotes(selectedInquiry.id, editingNotes)}
                          className="btn-dark"
                          style={{ marginTop: '8px', padding: '8px 16px', fontSize: '0.8rem' }}
                        >
                          <Save size={13} /> Save Notes
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <a
                          href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi ${selectedInquiry.name}, thank you for your inquiry regarding ${selectedInquiry.service}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp"
                          style={{ flexGrow: 1 }}
                        >
                          <MessageCircle size={15} /> Reply via WhatsApp
                        </a>
                        <a
                          href={`mailto:${selectedInquiry.email}?subject=Regarding%20Your%20Inquiry%20%E2%80%94%20Mayank%20Aggarwal`}
                          className="btn-primary"
                          style={{ flexGrow: 1 }}
                        >
                          <Mail size={15} /> Reply via Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PORTFOLIO CMS */}
          {activeTab === 'portfolio' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
                    PORTFOLIO & CASE STUDIES
                  </h2>
                  <p style={{ color: 'var(--mutedtext)', fontSize: '0.88rem' }}>
                    Add, edit, publish, or remove project showcases dynamically reflected on the public portfolio.
                  </p>
                </div>
                <button onClick={() => setIsAddingProject(true)} className="btn-primary">
                  <Plus size={16} /> Add New Case Study
                </button>
              </div>

              {/* Add Project Form Modal */}
              {isAddingProject && (
                <div className="modal-backdrop" onClick={() => setIsAddingProject(false)}>
                  <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>
                        CREATE PORTFOLIO ENTRY
                      </h3>
                      <button onClick={() => setIsAddingProject(false)}>✕</button>
                    </div>
                    <form onSubmit={handleCreateProject} className="modal-body">
                      <div className="form-group">
                        <label className="form-label">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          placeholder="e.g. Nexus AI — Cinematic Video Campaign"
                          className="form-control"
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="form-control"
                          >
                            <option value="Performance Marketing">Performance Marketing</option>
                            <option value="AI Video & Filmmaking">AI Video & Filmmaking</option>
                            <option value="AI Voiceover">AI Voiceover</option>
                            <option value="Content & Reel Strategy">Content & Reel Strategy</option>
                            <option value="AI Images & Creative Design">AI Images & Creative Design</option>
                            <option value="SEO & Content">SEO & Content</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Client / Brand</label>
                          <input
                            type="text"
                            value={projectForm.client}
                            onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                            placeholder="e.g. Nexus Tech"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Overview & Strategy *</label>
                        <textarea
                          rows={3}
                          required
                          value={projectForm.overview}
                          onChange={(e) => setProjectForm({ ...projectForm, overview: e.target.value })}
                          placeholder="Explain what problem was solved and creative approach taken..."
                          className="form-control"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Results & Key Impact / Learnings</label>
                        <input
                          type="text"
                          value={projectForm.results}
                          onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                          placeholder="e.g. Approach: Scaled Advantage+ testing with 3-second reel hooks"
                          className="form-control"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Cover Image URL</label>
                        <input
                          type="url"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={projectForm.tags}
                          onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                          className="form-control"
                        />
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                          <input
                            type="checkbox"
                            checked={projectForm.verified || false}
                            onChange={(e) => setProjectForm({ ...projectForm, verified: e.target.checked })}
                          />
                          <span style={{ fontWeight: 600, color: 'var(--brand)' }}>Verified Client Case Study (Shows metric boxes)</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                          <input
                            type="checkbox"
                            checked={projectForm.hasVideoDemo}
                            onChange={(e) => setProjectForm({ ...projectForm, hasVideoDemo: e.target.checked })}
                          />
                          <span>Has Interactive Video Demo</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                          <input
                            type="checkbox"
                            checked={projectForm.hasAudioDemo}
                            onChange={(e) => setProjectForm({ ...projectForm, hasAudioDemo: e.target.checked })}
                          />
                          <span>Has Audio Demo</span>
                        </label>
                      </div>

                      <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        Publish to Portfolio
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Projects Grid in Admin */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {portfolio.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      backgroundColor: 'var(--purewhite)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span className="project-category-badge">{p.category}</span>
                    </div>
                    <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '4px' }}>
                          {p.title}
                        </h4>
                        <div style={{ fontSize: '0.8rem', color: 'var(--brand)', fontWeight: 700, marginBottom: '8px' }}>
                          {p.client}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--mutedtext)', lineHeight: 1.5, marginBottom: '16px' }}>
                          {p.overview.slice(0, 110)}...
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--mutedtext)' }}>{p.date}</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() =>
                              updatePortfolioItem(p.id, { published: !p.published })
                            }
                            className="btn-secondary"
                            style={{
                              padding: '4px 10px',
                              fontSize: '0.72rem',
                              backgroundColor: p.published ? 'rgba(37,211,102,0.1)' : 'rgba(25,25,25,0.06)',
                              color: p.published ? '#128C40' : 'var(--mutedtext)',
                            }}
                          >
                            {p.published ? 'Published' : 'Draft'}
                          </button>
                          <button
                            onClick={() => deletePortfolioItem(p.id)}
                            style={{ color: 'var(--brand)', padding: '4px 8px' }}
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES COPY CMS */}
          {activeTab === 'services' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
                  SERVICES DIRECTORY & COPY
                </h2>
                <p style={{ color: 'var(--mutedtext)', fontSize: '0.88rem' }}>
                  Edit headlines, summaries, and deliverables for each of the 7 core offerings.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {services.map((s) => (
                  <div
                    key={s.slug}
                    style={{
                      backgroundColor: 'var(--purewhite)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '28px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-display)', color: 'var(--brand)', fontSize: '1.2rem' }}>
                          {s.num}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--charcoal)' }}>
                          {s.name}
                        </h3>
                      </div>
                      <Link
                        to={`/services/${s.slug}`}
                        target="_blank"
                        className="btn-secondary"
                        style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                      >
                        View Live Page <ExternalLink size={12} />
                      </Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '16px' }}>
                      <div>
                        <label className="form-label">Headline</label>
                        <input
                          type="text"
                          defaultValue={s.headline}
                          onBlur={(e) => updateService(s.slug, { headline: e.target.value })}
                          className="form-control"
                          style={{ fontSize: '0.85rem' }}
                        />
                      </div>
                      <div>
                        <label className="form-label">Intro Snippet</label>
                        <input
                          type="text"
                          defaultValue={s.intro}
                          onBlur={(e) => updateService(s.slug, { intro: e.target.value })}
                          className="form-control"
                          style={{ fontSize: '0.85rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--mutedtext)' }}>
                      Inclusions count: <strong>{s.includes.length} deliverables</strong> · Suitable for:{' '}
                      <strong>{s.suitable.length} segments</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AI MEDIA LAB */}
          {activeTab === 'ai-lab' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
                  AI MEDIA PRODUCTION SIMULATOR
                </h2>
                <p style={{ color: 'var(--mutedtext)', fontSize: '0.88rem' }}>
                  Test prompt generation workflows across Runway Gen-3 Alpha, Kling AI, and ElevenLabs audio models.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--charcoal)',
                  color: 'var(--softwhite)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="form-label" style={{ color: 'var(--gold)' }}>
                      Target Generative Model
                    </label>
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="form-control"
                      style={{ backgroundColor: '#111', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <option value="Runway Gen-3 Alpha">Runway Gen-3 Alpha (Cinematic 4K)</option>
                      <option value="Kling AI">Kling AI (High Fluidity Action)</option>
                      <option value="Google Flow">Google Flow (Experimental Video)</option>
                      <option value="ElevenLabs Audio">ElevenLabs Neural Voice (Emotional Audio)</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label" style={{ color: 'var(--gold)' }}>
                      Aspect Ratio & Resolution
                    </label>
                    <input
                      type="text"
                      disabled
                      value="9:16 Vertical (1080x1920) · 60fps Upscaled"
                      className="form-control"
                      style={{ backgroundColor: '#111', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label" style={{ color: 'var(--gold)' }}>
                    Prompt Directive
                  </label>
                  <textarea
                    rows={3}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="form-control"
                    style={{ backgroundColor: '#111', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
                  />
                </div>

                <button
                  onClick={handleRunAiPlayground}
                  disabled={aiGenerating}
                  className="btn-primary"
                  style={{ width: '100%', marginBottom: '24px' }}
                >
                  {aiGenerating ? 'Synthesizing Neural Render...' : 'Run Generative Simulation'}
                </button>

                {/* Simulation Result Preview */}
                {aiResult && (
                  <div
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.15)',
                      paddingTop: '20px',
                      display: 'flex',
                      gap: '24px',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={aiResult.previewUrl}
                      alt="AI Simulation"
                      style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                    />
                    <div>
                      <div style={{ color: '#25D366', fontWeight: 700, fontSize: '0.85rem' }}>
                        ✓ {aiResult.status}
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginTop: '4px' }}>
                        {aiResult.model} Output
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginTop: '6px' }}>
                        "{aiResult.prompt}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: SITE SETTINGS & SEO */}
          {activeTab === 'settings' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
                  WEBSITE SETTINGS & CONTACT CHANNELS
                </h2>
                <p style={{ color: 'var(--mutedtext)', fontSize: '0.88rem' }}>
                  Update your contact phone, email, WhatsApp, and social profile links across the entire website.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--purewhite)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px',
                  maxWidth: '720px',
                }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Professional Title</label>
                    <input
                      type="text"
                      value={settingsForm.title}
                      onChange={(e) => setSettingsForm({ ...settingsForm, title: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">WhatsApp Number (e.g. 919217756033)</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      value={settingsForm.location}
                      onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={settingsForm.linkedin}
                    onChange={(e) => setSettingsForm({ ...settingsForm, linkedin: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Instagram Profile URL</label>
                  <input
                    type="url"
                    value={settingsForm.instagram}
                    onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                    className="form-control"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => updateSiteInfo(settingsForm)}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '14px' }}
                >
                  <Save size={16} /> Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  );
};
