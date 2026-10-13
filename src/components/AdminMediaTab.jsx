import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Video,
  Upload,
  Link as LinkIcon,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  Eye,
  ExternalLink,
  Sparkles,
  Play,
  Film,
  Camera,
  Layers,
  Save,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

// Curated high-res aesthetics for instant 1-click swapping
const PRESET_LIBRARY = [
  {
    name: 'Cyberpunk Neon Studio',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Minimalist Editorial Portrait',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Modern Streetwear Editorial',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Sound Studio Waveform & Mic',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Luxury Product Aesthetic',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'D2C Skincare Botanical Shot',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'AI Automation Video Reel (YouTube)',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

export const AdminMediaTab = () => {
  const { mediaAssets = {}, updateMediaAsset, resetMediaAssets, showToast } = useSite();

  const [activeAssetKey, setActiveAssetKey] = useState(
    Object.keys(mediaAssets)[0] || 'home_hero_visual'
  );
  const [filterType, setFilterType] = useState('all'); // 'all', 'image', 'video'
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAssetForm, setNewAssetForm] = useState({
    id: '',
    name: '',
    location: '',
    type: 'image',
    url: '',
    videoUrl: '',
    alt: '',
    title: '',
  });

  const activeAsset = mediaAssets[activeAssetKey] || Object.values(mediaAssets)[0];

  // Local editing buffer for the selected asset
  const [editBuffer, setEditBuffer] = useState(activeAsset || {});

  // When active asset changes, sync buffer
  React.useEffect(() => {
    if (activeAsset) {
      setEditBuffer(activeAsset);
    }
  }, [activeAssetKey, mediaAssets]);

  const handleFieldChange = (field, val) => {
    setEditBuffer((prev) => ({ ...prev, [field]: val }));
  };

  const handleSaveChanges = () => {
    if (!editBuffer || !activeAssetKey) return;
    updateMediaAsset(activeAssetKey, editBuffer);
    showToast(`Updated: ${editBuffer.name || activeAssetKey}`);
  };

  // Handle local file upload (converts to base64 data URL for instant live persistence)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 15MB for browser storage safety
    if (file.size > 15 * 1024 * 1024) {
      showToast('File exceeds 15MB size limit. Please use an image or video URL link.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target.result;
      if (file.type.startsWith('video/')) {
        setEditBuffer((prev) => ({
          ...prev,
          type: 'video',
          videoUrl: dataUrl,
          url: dataUrl,
        }));
      } else {
        setEditBuffer((prev) => ({
          ...prev,
          url: dataUrl,
        }));
      }
      showToast(`Uploaded ${file.name}! Click 'Save & Publish' to apply.`, 'success');
    };
    reader.onerror = () => {
      showToast('Failed to read file from disk.', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyPreset = (preset) => {
    setEditBuffer((prev) => ({
      ...prev,
      url: preset.url,
      videoUrl: preset.videoUrl || prev.videoUrl || '',
      type: preset.type,
    }));
    showToast(`Applied preset: ${preset.name}`);
  };

  const handleCreateNewAsset = (e) => {
    e.preventDefault();
    if (!newAssetForm.name || !newAssetForm.url) {
      showToast('Please provide a name and media URL', 'error');
      return;
    }
    const cleanId = (newAssetForm.id || newAssetForm.name.toLowerCase().replace(/[^a-z0-9]/g, '_')) + `_${Date.now()}`;
    updateMediaAsset(cleanId, {
      ...newAssetForm,
      id: cleanId,
    });
    setActiveAssetKey(cleanId);
    setIsAddingNew(false);
    setNewAssetForm({
      id: '',
      name: '',
      location: '',
      type: 'image',
      url: '',
      videoUrl: '',
      alt: '',
      title: '',
    });
    showToast('New media slot added successfully');
  };

  const assetList = Object.entries(mediaAssets).filter(([k, asset]) => {
    if (filterType === 'all') return true;
    return asset.type === filterType;
  });

  return (
    <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
      {/* Top Banner / Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--charcoal-border)',
        }}
      >
        <div>
          <span className="editorial-eyebrow" style={{ color: 'var(--brand)' }}>
            Dynamic Content CMS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff' }}>
            MEDIA & VIDEO ASSET MANAGER
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '4px' }}>
            Directly change, upload, or replace any image and video across the entire website with instant live preview.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setIsAddingNew(true)}
            className="btn-brand hover-lift"
            style={{ padding: '9px 18px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} /> Add Custom Media Slot
          </button>
          <button
            onClick={resetMediaAssets}
            className="btn-secondary"
            style={{
              padding: '9px 16px',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.7)',
              borderColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title="Reset all images and videos to factory showreels"
          >
            <RotateCcw size={14} /> Restore Defaults
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <button
          onClick={() => setFilterType('all')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: filterType === 'all' ? 'var(--brand)' : 'rgba(255,255,255,0.06)',
            color: filterType === 'all' ? '#fff' : 'rgba(255,255,255,0.7)',
            border: 'none',
          }}
        >
          All Media ({Object.keys(mediaAssets).length})
        </button>
        <button
          onClick={() => setFilterType('image')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: filterType === 'image' ? 'var(--brand)' : 'rgba(255,255,255,0.06)',
            color: filterType === 'image' ? '#fff' : 'rgba(255,255,255,0.7)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Camera size={13} /> Images ({Object.values(mediaAssets).filter((a) => a.type === 'image').length})
        </button>
        <button
          onClick={() => setFilterType('video')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: filterType === 'video' ? 'var(--brand)' : 'rgba(255,255,255,0.06)',
            color: filterType === 'video' ? '#fff' : 'rgba(255,255,255,0.7)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Film size={13} /> Videos / Reels ({Object.values(mediaAssets).filter((a) => a.type === 'video').length})
        </button>
      </div>

      {/* Main CMS Split: Left Media Selector & Right Editor + Live Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Side: Media Slots List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {assetList.map(([key, asset]) => {
            const isSelected = key === activeAssetKey;
            return (
              <div
                key={key}
                onClick={() => setActiveAssetKey(key)}
                style={{
                  backgroundColor: isSelected ? '#222' : 'var(--charcoal-card)',
                  border: isSelected ? '1px solid var(--brand)' : '1px solid var(--charcoal-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 20px rgba(255, 61, 10, 0.15)' : 'none',
                }}
                className="hover-lift"
              >
                {/* Media Thumbnail */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    backgroundColor: '#111',
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  <img
                    src={asset.url || 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=400&q=80'}
                    alt={asset.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  {asset.type === 'video' && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                      }}
                    >
                      <Play size={16} />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: asset.type === 'video' ? 'rgba(255, 185, 46, 0.2)' : 'rgba(255, 61, 10, 0.2)',
                        color: asset.type === 'video' ? 'var(--gold)' : 'var(--brand)',
                      }}
                    >
                      {asset.type}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {asset.location}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      color: isSelected ? 'var(--brand)' : '#fff',
                      whiteEmpty: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {asset.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Media Asset Editor & Live Preview */}
        {editBuffer && (
          <div
            style={{
              backgroundColor: 'var(--charcoal-card)',
              border: '1px solid var(--charcoal-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div>
                <span className="editorial-eyebrow" style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>
                  Slot: {editBuffer.location || 'Website Media'}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#fff', marginTop: '2px' }}>
                  {editBuffer.name}
                </h3>
              </div>

              <button
                onClick={handleSaveChanges}
                className="btn-brand hover-lift"
                style={{ padding: '10px 20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Save size={16} /> Save & Publish Live
              </button>
            </div>

            {/* LIVE PREVIEW WINDOW */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Eye size={14} /> Live Visual Preview
              </div>

              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16/9',
                  maxHeight: '340px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  backgroundColor: '#111',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {editBuffer.type === 'video' && editBuffer.videoUrl && editBuffer.videoUrl.includes('youtube.com') ? (
                  <iframe
                    src={editBuffer.videoUrl.replace('watch?v=', 'embed/')}
                    title={editBuffer.name}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={editBuffer.url || 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80'}
                    alt={editBuffer.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                )}

                {/* Overlay Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(6px)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={12} style={{ color: 'var(--brand)' }} />
                  <span>{editBuffer.title || editBuffer.name}</span>
                </div>
              </div>
            </div>

            {/* EDITING CONTROLS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '20px' }}>
              {/* Media Type Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>
                  Media Format
                </label>
                <select
                  value={editBuffer.type || 'image'}
                  onChange={(e) => handleFieldChange('type', e.target.value)}
                  className="form-control"
                  style={{ backgroundColor: '#1c1c1c', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  <option value="image">Static Image / Photo</option>
                  <option value="video">Video / Reel Showcase</option>
                </select>
              </div>

              {/* Title / Headline */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>
                  Display Title / Headline
                </label>
                <input
                  type="text"
                  value={editBuffer.title || ''}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="e.g. THE GENERATIVE ERA"
                  className="form-control"
                  style={{ backgroundColor: '#1c1c1c', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }}
                />
              </div>
            </div>

            {/* URL Input */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>
                Image URL (Direct link from Unsplash, Imgur, Cloudinary, etc.)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="url"
                  value={editBuffer.url || ''}
                  onChange={(e) => handleFieldChange('url', e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="form-control"
                  style={{ backgroundColor: '#1c1c1c', color: '#fff', borderColor: 'rgba(255,255,255,0.15)', flex: 1 }}
                />
                {editBuffer.url && (
                  <a
                    href={editBuffer.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ padding: '8px 14px', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
                    title="Open URL in new tab"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Video URL (if type is video) */}
            {editBuffer.type === 'video' && (
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>
                  Video URL (YouTube Watch URL, Vimeo, or Direct MP4 link)
                </label>
                <input
                  type="url"
                  value={editBuffer.videoUrl || ''}
                  onChange={(e) => handleFieldChange('videoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="form-control"
                  style={{ backgroundColor: '#1c1c1c', color: '#fff', borderColor: 'rgba(255, 185, 46, 0.4)' }}
                />
              </div>
            )}

            {/* File Upload Option */}
            <div
              style={{
                backgroundColor: 'rgba(255, 61, 10, 0.05)',
                border: '1px dashed rgba(255, 61, 10, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '24px',
              }}
            >
              <Upload size={24} style={{ color: 'var(--brand)', margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', marginBottom: '4px' }}>
                Upload From Your Local Computer
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
                Choose an image (PNG, JPG, WebP) or short video clip from your machine to replace this asset instantly.
              </p>
              <label
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--charcoal)',
                  color: 'var(--brand)',
                  border: '1px solid var(--brand)',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                className="hover-lift"
              >
                Choose Local File
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {/* 1-Click Aesthetic Presets */}
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--gold)' }} /> Instant High-Aesthetic Presets
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
                {PRESET_LIBRARY.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    style={{
                      backgroundColor: '#1b1b1b',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '0.78rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                    className="hover-lift"
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <img src={preset.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD CUSTOM MEDIA SLOT */}
      {isAddingNew && (
        <div
          className="modal-backdrop"
          onClick={() => setIsAddingNew(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
          }}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '480px',
              width: '100%',
              backgroundColor: 'var(--charcoal-card)',
              border: '1px solid var(--charcoal-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              color: '#fff',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}>
              REGISTER NEW MEDIA SLOT
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Add a new media identifier for custom sections, banners, or campaign landing slots.
            </p>

            <form onSubmit={handleCreateNewAsset}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    Slot Identifier / Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Festival Campaign Hero"
                    value={newAssetForm.name}
                    onChange={(e) => setNewAssetForm((p) => ({ ...p, name: e.target.value }))}
                    className="form-control"
                    style={{ backgroundColor: '#181818', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    Website Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Services Page Banner"
                    value={newAssetForm.location}
                    onChange={(e) => setNewAssetForm((p) => ({ ...p, location: e.target.value }))}
                    className="form-control"
                    style={{ backgroundColor: '#181818', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    Media Type
                  </label>
                  <select
                    value={newAssetForm.type}
                    onChange={(e) => setNewAssetForm((p) => ({ ...p, type: e.target.value }))}
                    className="form-control"
                    style={{ backgroundColor: '#181818', color: '#fff' }}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    Media URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newAssetForm.url}
                    onChange={(e) => setNewAssetForm((p) => ({ ...p, url: e.target.value }))}
                    className="form-control"
                    style={{ backgroundColor: '#181818', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', color: '#fff' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-brand"
                  style={{ padding: '8px 20px', fontWeight: 700 }}
                >
                  Create Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
