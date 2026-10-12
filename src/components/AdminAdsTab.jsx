import React, { useState, useMemo, useRef } from 'react';
import {
  Megaphone,
  Layers,
  Film,
  Play,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  Copy,
  CheckSquare,
  Square,
  ArrowUp,
  ArrowDown,
  Upload,
  Link as LinkIcon,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  Tag,
  Star,
  SlidersHorizontal,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { AdLightboxModal } from './AdLightboxModal';
import {
  detectVideoLink,
  validateImageFile,
  validateVideoFile,
  fileToDataUrl,
} from '../utils/mediaUtils';
import {
  AD_INDUSTRIES,
  AD_PLATFORMS,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
} from '../data/initialData';

export const AdminAdsTab = () => {
  const {
    ads,
    addAd,
    updateAd,
    deleteAd,
    duplicateAd,
    bulkDeleteAds,
    bulkUpdateAdStatus,
    showToast,
  } = useSite();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'photo' | 'video'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [sortBy, setSortBy] = useState('order_asc'); // 'order_asc' | 'order_desc' | 'newest' | 'title_asc' | 'featured_first'

  // Multi-select bulk state
  const [selectedIds, setSelectedIds] = useState([]);

  // Preview Lightbox Modal
  const [previewAd, setPreviewAd] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Delete Confirmation Modal State
  const [adToDelete, setAdToDelete] = useState(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdId, setEditingAdId] = useState(null); // null for new ad

  // Video Mode in Modal: 'link' | 'upload'
  const [videoInputMode, setVideoInputMode] = useState('link');

  // Direct Image URL input in Photo section
  const [directImageUrl, setDirectImageUrl] = useState('');

  // Custom Industry state
  const [isCustomIndustry, setIsCustomIndustry] = useState(false);
  const [customIndustryValue, setCustomIndustryValue] = useState('');

  // Uploading state indicator
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  // Form State
  const initialFormState = {
    title: '',
    type: 'photo', // 'photo' | 'video'
    brand: '',
    industry: 'Fashion & Apparel',
    platform: 'Instagram',
    description: '',
    results: '',
    media: [], // array of image URLs
    thumbnail: '', // cover image
    videoSource: 'youtube', // 'upload' | 'youtube' | 'vimeo' | 'drive' | 'instagram' | 'direct'
    videoUrl: '',
    order: ads.length + 1,
    featured: false,
    status: 'published',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  // File input refs
  const photoFileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);
  const thumbFileInputRef = useRef(null);

  // Filtered & Sorted Ads
  const filteredAds = useMemo(() => {
    let result = ads.filter((ad) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ad.title?.toLowerCase().includes(q) ||
        ad.brand?.toLowerCase().includes(q) ||
        ad.industry?.toLowerCase().includes(q) ||
        ad.description?.toLowerCase().includes(q) ||
        ad.platform?.toLowerCase().includes(q);

      const matchesType = typeFilter === 'all' || ad.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || ad.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'order_asc') {
        return (Number(a.order) || 0) - (Number(b.order) || 0);
      }
      if (sortBy === 'order_desc') {
        return (Number(b.order) || 0) - (Number(a.order) || 0);
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'title_asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'featured_first') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (Number(a.order) || 0) - (Number(b.order) || 0);
      }
      return 0;
    });

    return result;
  }, [ads, searchQuery, typeFilter, statusFilter, sortBy]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = ads.length;
    const photo = ads.filter((a) => a.type === 'photo').length;
    const video = ads.filter((a) => a.type === 'video').length;
    const published = ads.filter((a) => a.status === 'published').length;
    const draft = ads.filter((a) => a.status === 'draft').length;
    const featured = ads.filter((a) => a.featured).length;
    return { total, photo, video, published, draft, featured };
  }, [ads]);

  // Bulk Selection Handlers
  const handleSelectAll = () => {
    if (selectedIds.length === filteredAds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAds.map((a) => a.id));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkPublish = () => {
    bulkUpdateAdStatus(selectedIds, 'published');
    setSelectedIds([]);
  };

  const handleBulkUnpublish = () => {
    bulkUpdateAdStatus(selectedIds, 'draft');
    setSelectedIds([]);
  };

  const handleConfirmBulkDelete = () => {
    bulkDeleteAds(selectedIds);
    setSelectedIds([]);
    setIsBulkDeleteModalOpen(false);
  };

  // Open Form for Adding
  const handleOpenAdd = () => {
    setEditingAdId(null);
    setFormData({
      ...initialFormState,
      order: ads.length + 1,
    });
    setIsCustomIndustry(false);
    setCustomIndustryValue('');
    setDirectImageUrl('');
    setVideoInputMode('link');
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open Form for Editing
  const handleOpenEdit = (ad) => {
    setEditingAdId(ad.id);
    const isCustom = !AD_INDUSTRIES.includes(ad.industry);
    setIsCustomIndustry(isCustom);
    setCustomIndustryValue(isCustom ? ad.industry : '');

    setFormData({
      title: ad.title || '',
      type: ad.type || 'photo',
      brand: ad.brand || '',
      industry: isCustom ? 'Other' : ad.industry || 'Fashion & Apparel',
      platform: ad.platform || 'Instagram',
      description: ad.description || '',
      results: ad.results || '',
      media: Array.isArray(ad.media) ? [...ad.media] : [],
      thumbnail: ad.thumbnail || '',
      videoSource: ad.videoSource || 'youtube',
      videoUrl: ad.videoUrl || '',
      order: ad.order !== undefined ? ad.order : 1,
      featured: !!ad.featured,
      status: ad.status || 'published',
    });

    setVideoInputMode(ad.videoSource === 'upload' ? 'upload' : 'link');
    setDirectImageUrl('');
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Quick Status Toggle in Table
  const handleToggleStatus = (ad) => {
    const nextStatus = ad.status === 'published' ? 'draft' : 'published';
    updateAd(ad.id, { status: nextStatus });
  };

  // Quick Featured Toggle
  const handleToggleFeatured = (ad) => {
    updateAd(ad.id, { featured: !ad.featured });
  };

  // Quick Order Up/Down
  const handleMoveOrder = (ad, delta) => {
    const currentOrder = Number(ad.order) || 0;
    const newOrder = Math.max(1, currentOrder + delta);
    updateAd(ad.id, { order: newOrder });
  };

  // Photo uploads handler (drag & drop or file dialog)
  const handlePhotoFilesSelected = async (files) => {
    if (!files || files.length === 0) return;
    setIsUploadingMedia(true);

    const validNewUrls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validation = validateImageFile(file);
      if (!validation.valid) {
        showToast(validation.error, 'error');
        continue;
      }
      try {
        const dataUrl = await fileToDataUrl(file);
        validNewUrls.push(dataUrl);
      } catch (err) {
        showToast(`Failed to load ${file.name}`, 'error');
      }
    }

    if (validNewUrls.length > 0) {
      setFormData((prev) => {
        const updatedMedia = [...prev.media, ...validNewUrls];
        const updatedThumbnail = prev.thumbnail || updatedMedia[0];
        return {
          ...prev,
          media: updatedMedia,
          thumbnail: updatedThumbnail,
        };
      });
      showToast(`${validNewUrls.length} image(s) added`);
    }

    setIsUploadingMedia(false);
  };

  // Add Direct Image URL to media array
  const handleAddDirectImageUrl = () => {
    const url = directImageUrl.trim();
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('data:')) {
      showToast('Please provide a valid image URL (http:// or https://)', 'error');
      return;
    }

    setFormData((prev) => {
      const updatedMedia = [...prev.media, url];
      const updatedThumbnail = prev.thumbnail || url;
      return {
        ...prev,
        media: updatedMedia,
        thumbnail: updatedThumbnail,
      };
    });

    setDirectImageUrl('');
    showToast('Image URL added to ad media');
  };

  // Reorder photos in form
  const handleMovePhoto = (index, delta) => {
    setFormData((prev) => {
      const newMedia = [...prev.media];
      const targetIndex = index + delta;
      if (targetIndex < 0 || targetIndex >= newMedia.length) return prev;
      const [item] = newMedia.splice(index, 1);
      newMedia.splice(targetIndex, 0, item);
      return { ...prev, media: newMedia };
    });
  };

  // Remove photo from media array
  const handleRemovePhoto = (index) => {
    setFormData((prev) => {
      const newMedia = prev.media.filter((_, i) => i !== index);
      let newThumb = prev.thumbnail;
      if (prev.thumbnail === prev.media[index]) {
        newThumb = newMedia.length > 0 ? newMedia[0] : '';
      }
      return {
        ...prev,
        media: newMedia,
        thumbnail: newThumb,
      };
    });
  };

  // Set photo as cover thumbnail
  const handleSetCoverPhoto = (url) => {
    setFormData((prev) => ({ ...prev, thumbnail: url }));
    showToast('Cover thumbnail updated');
  };

  // Video File Upload handler
  const handleVideoFileSelected = async (file) => {
    if (!file) return;
    const validation = validateVideoFile(file);
    if (!validation.valid) {
      showToast(validation.error, 'error');
      return;
    }

    setIsUploadingMedia(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setFormData((prev) => ({
        ...prev,
        videoUrl: dataUrl,
        videoSource: 'upload',
      }));
      showToast(`Video loaded (${(file.size / (1024 * 1024)).toFixed(1)}MB)`);
    } catch (err) {
      showToast('Failed to process video file', 'error');
    }
    setIsUploadingMedia(false);
  };

  // Custom Thumbnail for Video upload
  const handleCustomThumbnailSelected = async (file) => {
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) {
      showToast(validation.error, 'error');
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setFormData((prev) => ({ ...prev, thumbnail: dataUrl }));
      showToast('Custom video thumbnail uploaded');
    } catch (err) {
      showToast('Failed to load thumbnail file', 'error');
    }
  };

  // Video Link Change with Auto-Detection & YouTube Auto-Thumbnail
  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    const detected = detectVideoLink(url);

    setFormData((prev) => {
      let updatedThumb = prev.thumbnail;
      // Auto-set YouTube thumbnail if none set or if previous thumbnail was an auto-thumbnail
      if (detected.source === 'youtube' && detected.thumbnail) {
        if (!prev.thumbnail || prev.thumbnail.includes('img.youtube.com')) {
          updatedThumb = detected.thumbnail;
        }
      }

      return {
        ...prev,
        videoUrl: url,
        videoSource: detected.source,
        thumbnail: updatedThumb,
      };
    });
  };

  // Validate and Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    const finalIndustry = isCustomIndustry
      ? (customIndustryValue.trim() || 'Other')
      : formData.industry;

    if (formData.type === 'photo') {
      if ((!formData.media || formData.media.length === 0) && !formData.thumbnail) {
        errors.media = 'Please upload at least 1 image or specify a cover thumbnail';
      }
    } else if (formData.type === 'video') {
      if (!formData.videoUrl.trim()) {
        errors.videoUrl = 'Please provide a video link or upload a video file';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Please fix the form errors before submitting', 'error');
      return;
    }

    const payload = {
      ...formData,
      industry: finalIndustry,
      order: Number(formData.order) || 1,
      // If photo ad and no thumbnail explicitly set, use first media image
      thumbnail:
        formData.thumbnail ||
        (formData.type === 'photo' && formData.media?.[0]) ||
        '',
    };

    if (editingAdId) {
      updateAd(editingAdId, payload);
    } else {
      addAd(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      {/* HEADER & TOP STATS CARDS */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '-0.02em', margin: 0 }}>
            ADS & CAMPAIGNS MANAGER
          </h2>
          <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', marginTop: '6px' }}>
            Manage high-converting photo carousels and cinematic video ads displayed on the live portfolio.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Add New Ad Creative
        </button>
      </div>

      {/* STATS STRIP */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div className="stat-card" style={{ padding: '20px' }}>
          <div className="val" style={{ fontSize: '2rem' }}>{stats.total}</div>
          <div className="lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Megaphone size={13} /> Total Ad Creatives
          </div>
        </div>

        <div className="stat-card" style={{ padding: '20px' }}>
          <div className="val" style={{ fontSize: '2rem', color: 'var(--brand)' }}>
            {stats.photo}
          </div>
          <div className="lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={13} /> Photo Ads
          </div>
        </div>

        <div className="stat-card" style={{ padding: '20px' }}>
          <div className="val" style={{ fontSize: '2rem', color: 'var(--amber)' }}>
            {stats.video}
          </div>
          <div className="lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Film size={13} /> Video Ads
          </div>
        </div>

        <div className="stat-card" style={{ padding: '20px' }}>
          <div className="val" style={{ fontSize: '2rem', color: '#16A34A' }}>
            {stats.published}
          </div>
          <div className="lbl">Published Live</div>
        </div>

        <div className="stat-card" style={{ padding: '20px' }}>
          <div className="val" style={{ fontSize: '2rem', color: 'var(--mutedtext)' }}>
            {stats.draft}
          </div>
          <div className="lbl">Drafts</div>
        </div>
      </div>

      {/* CONTROLS TOOLBAR: Search, Filters, Sort */}
      <div
        style={{
          backgroundColor: 'var(--purewhite)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '380px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--mutedtext)',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, brand, industry..."
            className="form-control"
            style={{ paddingLeft: '36px', height: '40px', fontSize: '0.88rem' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--mutedtext)',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Type Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--mutedtext)', fontWeight: 600 }}>Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="form-control"
              style={{ height: '38px', padding: '6px 12px', fontSize: '0.84rem' }}
            >
              <option value="all">All Types ({stats.total})</option>
              <option value="photo">Photo Ads ({stats.photo})</option>
              <option value="video">Video Ads ({stats.video})</option>
            </select>
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--mutedtext)', fontWeight: 600 }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control"
              style={{ height: '38px', padding: '6px 12px', fontSize: '0.84rem' }}
            >
              <option value="all">All Status</option>
              <option value="published">Published ({stats.published})</option>
              <option value="draft">Draft ({stats.draft})</option>
            </select>
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--mutedtext)', fontWeight: 600 }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
              style={{ height: '38px', padding: '6px 12px', fontSize: '0.84rem' }}
            >
              <option value="order_asc">Display Order (Asc)</option>
              <option value="order_desc">Display Order (Desc)</option>
              <option value="featured_first">★ Featured First</option>
              <option value="newest">Newest Created</option>
              <option value="title_asc">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* BULK ACTIONS STRIP (Displays when items are selected) */}
      {selectedIds.length > 0 && (
        <div
          style={{
            backgroundColor: 'var(--charcoal)',
            color: 'var(--softwhite)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 20px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 700, color: 'var(--gold)' }}>
              {selectedIds.length} ad{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => setSelectedIds([])}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.8rem',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Clear selection
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleBulkPublish}
              className="btn-secondary"
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#4ADE80',
              }}
            >
              Publish Selected
            </button>
            <button
              onClick={handleBulkUnpublish}
              className="btn-secondary"
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'var(--mutedtext)',
              }}
            >
              Unpublish (Draft)
            </button>
            <button
              onClick={() => setIsBulkDeleteModalOpen(true)}
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#EF4444',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* ADS TABLE / LIST VIEW */}
      {filteredAds.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--purewhite)',
            borderRadius: 'var(--radius-xl)',
            border: '1px dashed var(--border-color)',
            padding: '60px 24px',
            textAlign: 'center',
          }}
        >
          <Megaphone size={44} style={{ color: 'var(--mutedtext)', margin: '0 auto 16px', opacity: 0.4 }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '8px' }}>
            No ad creatives found
          </h3>
          <p style={{ color: 'var(--mutedtext)', fontSize: '0.92rem', marginBottom: '20px' }}>
            {searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search criteria or clearing filters.'
              : 'Start by creating your first photo carousel or video ad creative.'}
          </p>
          <button onClick={handleOpenAdd} className="btn-primary" style={{ fontSize: '0.88rem' }}>
            <Plus size={16} /> Add Your First Ad Creative
          </button>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'var(--purewhite)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '980px' }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: 'var(--cream-subtle)',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--mutedtext)',
                  }}
                >
                  <th style={{ padding: '14px 16px', width: '40px' }}>
                    <button
                      onClick={handleSelectAll}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                      title="Select All"
                    >
                      {selectedIds.length === filteredAds.length && filteredAds.length > 0 ? (
                        <CheckSquare size={17} color="var(--brand)" />
                      ) : (
                        <Square size={17} color="var(--mutedtext)" />
                      )}
                    </button>
                  </th>
                  <th style={{ padding: '14px 16px', width: '80px' }}>Media</th>
                  <th style={{ padding: '14px 16px' }}>Campaign Title & Client</th>
                  <th style={{ padding: '14px 16px', width: '110px' }}>Type</th>
                  <th style={{ padding: '14px 16px', width: '120px' }}>Platform</th>
                  <th style={{ padding: '14px 16px', width: '130px' }}>Results</th>
                  <th style={{ padding: '14px 16px', width: '90px', textAlign: 'center' }}>Order</th>
                  <th style={{ padding: '14px 16px', width: '100px' }}>Status</th>
                  <th style={{ padding: '14px 16px', width: '130px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAds.map((ad) => {
                  const isSelected = selectedIds.includes(ad.id);
                  const isPhoto = ad.type === 'photo';
                  const isVideo = ad.type === 'video';
                  const thumb =
                    ad.thumbnail ||
                    (isPhoto && ad.media?.[0]) ||
                    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80';

                  return (
                    <tr
                      key={ad.id}
                      style={{
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: isSelected ? 'rgba(255, 61, 10, 0.04)' : 'transparent',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      {/* Checkbox */}
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          onClick={() => handleToggleSelect(ad.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                        >
                          {isSelected ? (
                            <CheckSquare size={17} color="var(--brand)" />
                          ) : (
                            <Square size={17} color="var(--mutedtext)" />
                          )}
                        </button>
                      </td>

                      {/* Thumbnail & Media Count */}
                      <td style={{ padding: '14px 16px' }}>
                        <div
                          onClick={() => {
                            setPreviewAd(ad);
                            setIsPreviewOpen(true);
                          }}
                          style={{
                            position: 'relative',
                            width: '68px',
                            height: '50px',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            backgroundColor: 'var(--charcoal)',
                            cursor: 'pointer',
                            border: '1px solid var(--border-color)',
                          }}
                          title="Click to preview ad creative"
                        >
                          <img
                            src={thumb}
                            alt={ad.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {isVideo && (
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0,0,0,0.3)',
                              }}
                            >
                              <Play size={14} fill="#FFF" color="#FFF" />
                            </div>
                          )}
                          {isPhoto && Array.isArray(ad.media) && ad.media.length > 1 && (
                            <span
                              style={{
                                position: 'absolute',
                                bottom: '2px',
                                right: '2px',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                color: '#FFF',
                                fontSize: '0.62rem',
                                padding: '1px 4px',
                                borderRadius: '3px',
                                fontWeight: 700,
                              }}
                            >
                              +{ad.media.length}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Title, Brand, Industry */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: '0.94rem',
                              color: 'var(--charcoal)',
                            }}
                          >
                            {ad.title}
                          </span>

                          {ad.featured && (
                            <span
                              style={{
                                padding: '2px 7px',
                                borderRadius: '999px',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                backgroundColor: 'rgba(255, 185, 46, 0.2)',
                                color: 'var(--charcoal)',
                                border: '1px solid rgba(255, 185, 46, 0.4)',
                              }}
                            >
                              ★ Featured
                            </span>
                          )}

                          {ad.isSample && (
                            <span
                              style={{
                                padding: '1px 6px',
                                borderRadius: '4px',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                backgroundColor: 'rgba(0,0,0,0.06)',
                                color: 'var(--mutedtext)',
                              }}
                              title="Marked as seed sample data, safe to delete"
                            >
                              Sample
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--mutedtext)' }}>
                          <span>{ad.brand || 'Client Campaign'}</span>
                          {ad.industry && (
                            <>
                              <span>•</span>
                              <span style={{ color: 'var(--brand)', fontWeight: 500 }}>{ad.industry}</span>
                            </>
                          )}
                          {ad.createdAt && (
                            <>
                              <span>•</span>
                              <span style={{ fontSize: '0.75rem' }}>
                                {new Date(ad.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 9px',
                            borderRadius: '999px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            backgroundColor: isPhoto ? 'rgba(255, 61, 10, 0.12)' : 'rgba(255, 185, 46, 0.15)',
                            color: isPhoto ? 'var(--brand)' : '#B45309',
                          }}
                        >
                          {isPhoto ? <Layers size={12} /> : <Film size={12} />}
                          {isPhoto ? 'Photo' : 'Video'}
                        </span>
                      </td>

                      {/* Platform */}
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--charcoal)',
                          }}
                        >
                          {ad.platform || 'General'}
                        </span>
                      </td>

                      {/* Results */}
                      <td style={{ padding: '14px 16px' }}>
                        {ad.results ? (
                          <span
                            style={{
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: '#16A34A',
                              backgroundColor: 'rgba(22, 163, 74, 0.1)',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <TrendingUp size={12} />
                            {ad.results}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--mutedtext)', fontSize: '0.78rem' }}>—</span>
                        )}
                      </td>

                      {/* Display Order with Up/Down buttons */}
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <button
                            onClick={() => handleMoveOrder(ad, -1)}
                            style={{
                              padding: '3px',
                              borderRadius: '4px',
                              border: '1px solid var(--border-color)',
                              background: '#FFF',
                              cursor: 'pointer',
                              display: 'flex',
                            }}
                            title="Move Up"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', minWidth: '22px' }}>
                            {ad.order ?? 1}
                          </span>
                          <button
                            onClick={() => handleMoveOrder(ad, 1)}
                            style={{
                              padding: '3px',
                              borderRadius: '4px',
                              border: '1px solid var(--border-color)',
                              background: '#FFF',
                              cursor: 'pointer',
                              display: 'flex',
                            }}
                            title="Move Down"
                          >
                            <ArrowDown size={12} />
                          </button>
                        </div>
                      </td>

                      {/* Status Toggle */}
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          onClick={() => handleToggleStatus(ad)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: ad.status === 'published' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(156, 163, 175, 0.2)',
                            color: ad.status === 'published' ? '#15803D' : '#6B7280',
                            transition: 'all 0.2s ease',
                          }}
                          title={`Click to ${ad.status === 'published' ? 'unpublish' : 'publish'}`}
                        >
                          {ad.status === 'published' ? '● Published' : '○ Draft'}
                        </button>
                      </td>

                      {/* Row Actions */}
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => handleToggleFeatured(ad)}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              border: '1px solid var(--border-color)',
                              background: ad.featured ? 'rgba(255, 185, 46, 0.2)' : '#FFF',
                              color: ad.featured ? '#B45309' : 'var(--mutedtext)',
                              cursor: 'pointer',
                            }}
                            title={ad.featured ? 'Remove from Featured' : 'Mark as Featured'}
                          >
                            <Star size={14} fill={ad.featured ? '#B45309' : 'none'} />
                          </button>

                          <button
                            onClick={() => {
                              setPreviewAd(ad);
                              setIsPreviewOpen(true);
                            }}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              border: '1px solid var(--border-color)',
                              background: '#FFF',
                              color: 'var(--charcoal)',
                              cursor: 'pointer',
                            }}
                            title="Interactive Preview"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            onClick={() => duplicateAd(ad.id)}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              border: '1px solid var(--border-color)',
                              background: '#FFF',
                              color: 'var(--charcoal)',
                              cursor: 'pointer',
                            }}
                            title="Duplicate Ad"
                          >
                            <Copy size={14} />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(ad)}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              border: '1px solid var(--border-color)',
                              background: '#FFF',
                              color: 'var(--brand)',
                              cursor: 'pointer',
                            }}
                            title="Edit Ad"
                          >
                            <Edit size={14} />
                          </button>

                          <button
                            onClick={() => setAdToDelete(ad)}
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              background: 'rgba(239, 68, 68, 0.08)',
                              color: '#EF4444',
                              cursor: 'pointer',
                            }}
                            title="Delete Ad"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SINGLE AD DELETE CONFIRMATION MODAL */}
      {adToDelete && (
        <div className="modal-backdrop" onClick={() => setAdToDelete(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header" style={{ borderBottomColor: 'rgba(239, 68, 68, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#EF4444' }}>
                <AlertTriangle size={22} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: 0 }}>
                  CONFIRM DELETION
                </h3>
              </div>
              <button onClick={() => setAdToDelete(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.94rem', lineHeight: '1.5', color: 'var(--charcoal)', marginBottom: '16px' }}>
                Are you sure you want to permanently delete{' '}
                <strong>"{adToDelete.title}"</strong>?
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--mutedtext)', marginBottom: '24px' }}>
                This will remove the creative and its assets from the live ads gallery.
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button onClick={() => setAdToDelete(null)} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteAd(adToDelete.id);
                    setAdToDelete(null);
                  }}
                  style={{
                    backgroundColor: '#EF4444',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    padding: '9px 18px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Yes, Delete Ad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BULK DELETE CONFIRMATION MODAL */}
      {isBulkDeleteModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsBulkDeleteModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#EF4444' }}>
                <AlertTriangle size={22} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: 0 }}>
                  BULK DELETE ADS
                </h3>
              </div>
              <button onClick={() => setIsBulkDeleteModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.94rem', lineHeight: '1.5', color: 'var(--charcoal)', marginBottom: '20px' }}>
                Are you sure you want to delete all <strong>{selectedIds.length}</strong> selected ad creatives?
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button onClick={() => setIsBulkDeleteModalOpen(false)} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBulkDelete}
                  style={{
                    backgroundColor: '#EF4444',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    padding: '9px 18px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Delete {selectedIds.length} Ads
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT AD MODAL */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '780px', width: '100%' }}
          >
            <div className="modal-header">
              <div>
                <span className="editorial-eyebrow">
                  {editingAdId ? 'Edit Ad Creative' : 'New Ad Creative'}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '4px 0 0' }}>
                  {editingAdId ? 'UPDATE AD CAMPAIGN' : 'CREATE AD CAMPAIGN'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: '6px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.06)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="modal-body">
              {/* Type Switcher */}
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Ad Type *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'photo' })}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-lg)',
                      border: formData.type === 'photo' ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                      backgroundColor: formData.type === 'photo' ? 'rgba(255, 61, 10, 0.05)' : '#FFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      fontWeight: 700,
                      color: formData.type === 'photo' ? 'var(--brand)' : 'var(--charcoal)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Layers size={18} />
                    <span>Photo Ad (Single or Carousel)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'video' })}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-lg)',
                      border: formData.type === 'video' ? '2px solid var(--charcoal)' : '1px solid var(--border-color)',
                      backgroundColor: formData.type === 'video' ? 'var(--charcoal)' : '#FFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      fontWeight: 700,
                      color: formData.type === 'video' ? 'var(--gold)' : 'var(--charcoal)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Film size={18} />
                    <span>Video Ad (Link or Upload)</span>
                  </button>
                </div>
              </div>

              {/* Campaign Title */}
              <div className="form-group">
                <label className="form-label">Campaign / Ad Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Aura Luxe Skincare — Festive Glow Social Carousel"
                  className="form-control"
                  style={{ borderColor: formErrors.title ? '#EF4444' : undefined }}
                />
                {formErrors.title && (
                  <span style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
                    {formErrors.title}
                  </span>
                )}
              </div>

              {/* Brand & Industry Row */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Brand / Client Name</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Aura Luxe Botanicals"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Industry / Category</label>
                  {!isCustomIndustry ? (
                    <select
                      value={formData.industry}
                      onChange={(e) => {
                        if (e.target.value === 'Other') {
                          setIsCustomIndustry(true);
                          setFormData({ ...formData, industry: 'Other' });
                        } else {
                          setFormData({ ...formData, industry: e.target.value });
                        }
                      }}
                      className="form-control"
                    >
                      {AD_INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={customIndustryValue}
                        onChange={(e) => setCustomIndustryValue(e.target.value)}
                        placeholder="Type custom industry..."
                        className="form-control"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomIndustry(false);
                          setFormData({ ...formData, industry: 'Fashion & Apparel' });
                        }}
                        style={{
                          padding: '0 12px',
                          border: '1px solid var(--border-color)',
                          background: '#FFF',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Platform & Results Row */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Target Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="form-control"
                  >
                    {AD_PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Results / Campaign Impact (Optional)</label>
                  <input
                    type="text"
                    value={formData.results}
                    onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                    placeholder="e.g. Concept Carousel · Festive Angle"
                    className="form-control"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="form-group">
                <label className="form-label">Short Description / Campaign Details</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain the visual hook, creative strategy, or target audience..."
                  className="form-control"
                />
              </div>

              {/* MEDIA SECTION: PHOTO ADS */}
              {formData.type === 'photo' && (
                <div
                  style={{
                    backgroundColor: 'var(--cream-subtle)',
                    padding: '20px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Layers size={16} color="var(--brand)" />
                      <span style={{ fontWeight: 700, fontSize: '0.94rem' }}>
                        Photo Ad Media ({formData.media.length} slides)
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--mutedtext)' }}>
                      Max {MAX_IMAGE_SIZE_MB}MB per image · JPG, PNG, WebP
                    </span>
                  </div>

                  {/* Drag and Drop Upload Zone */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handlePhotoFilesSelected(e.dataTransfer.files);
                    }}
                    onClick={() => photoFileInputRef.current?.click()}
                    style={{
                      border: '2px dashed var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '24px 16px',
                      textAlign: 'center',
                      backgroundColor: '#FFF',
                      cursor: 'pointer',
                      marginBottom: '14px',
                      transition: 'border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--brand)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                  >
                    <input
                      type="file"
                      ref={photoFileInputRef}
                      onChange={(e) => handlePhotoFilesSelected(e.target.files)}
                      multiple
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      style={{ display: 'none' }}
                    />
                    <Upload size={24} style={{ color: 'var(--brand)', margin: '0 auto 8px' }} />
                    <p style={{ fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>
                      Click or drag images here to upload
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--mutedtext)', margin: '4px 0 0' }}>
                      Add multiple slides for carousel ads or a single high-impact image
                    </p>
                  </div>

                  {/* Or Add Direct URL */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <input
                      type="url"
                      value={directImageUrl}
                      onChange={(e) => setDirectImageUrl(e.target.value)}
                      placeholder="Or paste an image URL (Unsplash, CDN, etc.)..."
                      className="form-control"
                      style={{ height: '38px', fontSize: '0.84rem' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddDirectImageUrl}
                      className="btn-secondary"
                      style={{ padding: '0 16px', height: '38px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                    >
                      Add URL
                    </button>
                  </div>

                  {/* List of Uploaded Photos with Reorder & Cover select */}
                  {formData.media.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {formData.media.map((imgUrl, idx) => {
                        const isCover = formData.thumbnail === imgUrl;
                        return (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 12px',
                              backgroundColor: '#FFF',
                              borderRadius: 'var(--radius-md)',
                              border: isCover ? '2px solid var(--brand)' : '1px solid var(--border-color)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={imgUrl}
                                alt={`Slide ${idx + 1}`}
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  objectFit: 'cover',
                                  borderRadius: '4px',
                                }}
                              />
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                                    Slide {idx + 1}
                                  </span>
                                  {isCover && (
                                    <span
                                      style={{
                                        fontSize: '0.68rem',
                                        backgroundColor: 'var(--brand)',
                                        color: '#FFF',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 700,
                                      }}
                                    >
                                      Cover Thumbnail
                                    </span>
                                  )}
                                </div>
                                <span style={{ fontSize: '0.74rem', color: 'var(--mutedtext)' }}>
                                  {imgUrl.startsWith('data:') ? 'Local uploaded file' : imgUrl.slice(0, 40) + '...'}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {!isCover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCoverPhoto(imgUrl)}
                                  style={{
                                    fontSize: '0.75rem',
                                    padding: '4px 8px',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '4px',
                                    background: '#FFF',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Make Cover
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => handleMovePhoto(idx, -1)}
                                disabled={idx === 0}
                                style={{
                                  padding: '4px',
                                  border: '1px solid var(--border-color)',
                                  borderRadius: '4px',
                                  background: '#FFF',
                                  cursor: idx === 0 ? 'not-allowed' : 'pointer',
                                  opacity: idx === 0 ? 0.3 : 1,
                                }}
                                title="Move up"
                              >
                                <ArrowUp size={12} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleMovePhoto(idx, 1)}
                                disabled={idx === formData.media.length - 1}
                                style={{
                                  padding: '4px',
                                  border: '1px solid var(--border-color)',
                                  borderRadius: '4px',
                                  background: '#FFF',
                                  cursor: idx === formData.media.length - 1 ? 'not-allowed' : 'pointer',
                                  opacity: idx === formData.media.length - 1 ? 0.3 : 1,
                                }}
                                title="Move down"
                              >
                                <ArrowDown size={12} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(idx)}
                                style={{
                                  padding: '4px',
                                  border: '1px solid rgba(239, 68, 68, 0.3)',
                                  borderRadius: '4px',
                                  background: 'rgba(239, 68, 68, 0.08)',
                                  color: '#EF4444',
                                  cursor: 'pointer',
                                }}
                                title="Remove photo"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '10px', color: 'var(--mutedtext)', fontSize: '0.82rem' }}>
                      No photos added yet. Upload files or paste an image URL above.
                    </div>
                  )}

                  {formErrors.media && (
                    <span style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '8px', display: 'block' }}>
                      {formErrors.media}
                    </span>
                  )}
                </div>
              )}

              {/* MEDIA SECTION: VIDEO ADS */}
              {formData.type === 'video' && (
                <div
                  style={{
                    backgroundColor: 'var(--cream-subtle)',
                    padding: '20px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Film size={16} color="var(--amber)" />
                      <span style={{ fontWeight: 700, fontSize: '0.94rem' }}>
                        Video Ad Media & Embed
                      </span>
                    </div>

                    {/* Mode selector */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setVideoInputMode('link')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          border: '1px solid var(--border-color)',
                          backgroundColor: videoInputMode === 'link' ? 'var(--charcoal)' : '#FFF',
                          color: videoInputMode === 'link' ? '#FFF' : 'var(--charcoal)',
                          cursor: 'pointer',
                        }}
                      >
                        Video Link / Embed
                      </button>
                      <button
                        type="button"
                        onClick={() => setVideoInputMode('upload')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          border: '1px solid var(--border-color)',
                          backgroundColor: videoInputMode === 'upload' ? 'var(--charcoal)' : '#FFF',
                          color: videoInputMode === 'upload' ? '#FFF' : 'var(--charcoal)',
                          cursor: 'pointer',
                        }}
                      >
                        Upload Video File
                      </button>
                    </div>
                  </div>

                  {/* Mode A: Paste Link */}
                  {videoInputMode === 'link' && (
                    <div style={{ marginBottom: '16px' }}>
                      <label className="form-label">
                        Video URL (YouTube, Vimeo, Google Drive, Instagram Reel) *
                      </label>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={handleVideoUrlChange}
                        placeholder="https://www.youtube.com/watch?v=... or https://instagram.com/reel/..."
                        className="form-control"
                        style={{ borderColor: formErrors.videoUrl ? '#EF4444' : undefined }}
                      />
                      {formErrors.videoUrl && (
                        <span style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
                          {formErrors.videoUrl}
                        </span>
                      )}

                      {/* Link Detection Badge */}
                      {formData.videoUrl && (
                        <div
                          style={{
                            marginTop: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.8rem',
                          }}
                        >
                          <span style={{ color: 'var(--mutedtext)' }}>Detected Source:</span>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(255, 185, 46, 0.2)',
                              color: '#B45309',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                            }}
                          >
                            {formData.videoSource || 'Custom Link'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode B: Video File Upload */}
                  {videoInputMode === 'upload' && (
                    <div style={{ marginBottom: '16px' }}>
                      <div
                        onClick={() => videoFileInputRef.current?.click()}
                        style={{
                          border: '2px dashed var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          padding: '20px',
                          textAlign: 'center',
                          backgroundColor: '#FFF',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="file"
                          ref={videoFileInputRef}
                          onChange={(e) => handleVideoFileSelected(e.target.files?.[0])}
                          accept="video/mp4,video/webm"
                          style={{ display: 'none' }}
                        />
                        <Film size={24} style={{ color: 'var(--amber)', margin: '0 auto 8px' }} />
                        <p style={{ fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>
                          Click to upload MP4 or WebM video
                        </p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--mutedtext)', margin: '4px 0 0' }}>
                          Maximum size: {MAX_VIDEO_SIZE_MB}MB
                        </p>
                      </div>

                      {formData.videoSource === 'upload' && formData.videoUrl && (
                        <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#16A34A', fontWeight: 600 }}>
                          ✓ Video file loaded ready for saving
                        </div>
                      )}
                    </div>
                  )}

                  {/* Video Thumbnail Section */}
                  <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                    <label className="form-label">
                      Video Thumbnail / Poster Image (Auto-generated for YouTube or upload custom)
                    </label>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      {formData.thumbnail && (
                        <img
                          src={formData.thumbnail}
                          alt="Thumbnail preview"
                          style={{
                            width: '80px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            border: '1px solid var(--border-color)',
                          }}
                        />
                      )}

                      <div style={{ flex: 1 }}>
                        <input
                          type="url"
                          value={formData.thumbnail}
                          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                          placeholder="Thumbnail image URL (e.g. Unsplash or CDN)..."
                          className="form-control"
                          style={{ height: '38px', fontSize: '0.84rem', marginBottom: '6px' }}
                        />
                        <button
                          type="button"
                          onClick={() => thumbFileInputRef.current?.click()}
                          style={{
                            fontSize: '0.76rem',
                            padding: '4px 10px',
                            border: '1px solid var(--border-color)',
                            borderRadius: '4px',
                            background: '#FFF',
                            cursor: 'pointer',
                          }}
                        >
                          Or Upload Thumbnail Image File
                        </button>
                        <input
                          type="file"
                          ref={thumbFileInputRef}
                          onChange={(e) => handleCustomThumbnailSelected(e.target.files?.[0])}
                          accept="image/*"
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Display Order, Featured & Status Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: '#FFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <label className="form-label">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div>
                  <label className="form-label">Publication Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="form-control"
                  >
                    <option value="published">Published (Visible to public)</option>
                    <option value="draft">Draft (Admin only)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span style={{ fontWeight: 600 }}>Mark as Featured Creative</span>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                  style={{ fontSize: '0.88rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingMedia}
                  className="btn-primary"
                  style={{ fontSize: '0.88rem' }}
                >
                  {isUploadingMedia
                    ? 'Processing Media...'
                    : editingAdId
                    ? 'Update Ad Campaign'
                    : 'Save Ad Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Lightbox / Modal Preview */}
      <AdLightboxModal ad={previewAd} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </div>
  );
};
