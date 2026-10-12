import { MAX_IMAGE_SIZE_MB, MAX_VIDEO_SIZE_MB } from '../data/initialData';

/**
 * Detects the video platform and builds an embed URL and thumbnail if possible.
 */
export const detectVideoLink = (rawUrl = '') => {
  const url = rawUrl.trim();
  if (!url) {
    return { source: 'unknown', embedUrl: '', thumbnail: '', originalUrl: '' };
  }

  // 1. YouTube
  // Matches: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      source: 'youtube',
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      originalUrl: url,
    };
  }

  // 2. Vimeo
  // Matches: vimeo.com/123456789
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[3]) {
    const videoId = vimeoMatch[3];
    return {
      source: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
      thumbnail: '',
      originalUrl: url,
    };
  }

  // 3. Google Drive
  // Matches: drive.google.com/file/d/ID/view
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/i);
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    return {
      source: 'drive',
      videoId: fileId,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      thumbnail: '',
      originalUrl: url,
    };
  }

  // 4. Instagram Reel or Post
  // Matches: instagram.com/reel/ID or instagram.com/p/ID
  const instaMatch = url.match(/instagram\.com\/(?:p|reel)\/([\w-]+)/i);
  if (instaMatch && instaMatch[1]) {
    const postId = instaMatch[1];
    return {
      source: 'instagram',
      videoId: postId,
      embedUrl: `https://www.instagram.com/reel/${postId}/embed`,
      thumbnail: '',
      originalUrl: url,
    };
  }

  // 5. Direct MP4 / WebM video link
  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    return {
      source: 'direct',
      embedUrl: url,
      thumbnail: '',
      originalUrl: url,
    };
  }

  return {
    source: 'other',
    embedUrl: url,
    thumbnail: '',
    originalUrl: url,
  };
};

/**
 * Validates an image file by size and type.
 */
export const validateImageFile = (file) => {
  if (!file) return { valid: false, error: 'No file provided' };

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid file type: ${file.name}. Only JPG, PNG, and WebP are allowed.`,
    };
  }

  const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File ${file.name} is ${mb}MB. Maximum allowed is ${MAX_IMAGE_SIZE_MB}MB.`,
    };
  }

  return { valid: true };
};

/**
 * Validates a video file by size and type.
 */
export const validateVideoFile = (file) => {
  if (!file) return { valid: false, error: 'No file provided' };

  const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid video format: ${file.name}. Only MP4 and WebM are supported.`,
    };
  }

  const maxBytes = MAX_VIDEO_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Video ${file.name} is ${mb}MB. Maximum allowed is ${MAX_VIDEO_SIZE_MB}MB.`,
    };
  }

  return { valid: true };
};

/**
 * Converts a File object to a base64 Data URL.
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
