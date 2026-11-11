import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Environment variables or fallback to localStorage config for dynamic client setup
const getStoredConfig = () => {
  try {
    const stored = localStorage.getItem('sidfolio_sanity_config');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading Sanity config from localStorage:', e);
  }
  return {};
};

export const getSanityConfig = () => {
  const stored = getStoredConfig();
  return {
    projectId: stored.projectId || import.meta.env.VITE_SANITY_PROJECT_ID || '',
    dataset: stored.dataset || import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: stored.apiVersion || import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
    token: stored.token || import.meta.env.VITE_SANITY_API_TOKEN || '',
    useCdn: false, // CDN is false for real-time fresh queries
  };
};

export const saveSanityConfig = (config) => {
  try {
    localStorage.setItem('sidfolio_sanity_config', JSON.stringify(config));
    // Reset client instance
    clientInstance = null;
    return true;
  } catch (e) {
    console.error('Error saving Sanity config:', e);
    return false;
  }
};

let clientInstance = null;

export const getSanityClient = () => {
  const config = getSanityConfig();
  if (!config.projectId) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient({
      projectId: config.projectId,
      dataset: config.dataset,
      apiVersion: config.apiVersion,
      token: config.token || undefined,
      useCdn: false,
    });
  }
  return clientInstance;
};

// Image URL builder for Sanity assets
export const urlFor = (source) => {
  const client = getSanityClient();
  if (!client || !source) return '';
  try {
    return imageUrlBuilder(client).image(source).url();
  } catch {
    return typeof source === 'string' ? source : '';
  }
};

// Default reels array (empty so user can upload their own)
export const DEFAULT_REELS = [];

// Helper to get local override reels
const getLocalReels = () => {
  try {
    const saved = localStorage.getItem('sidfolio_local_reels');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    // Filter out any obsolete dummy reels and purge them from localStorage
    const cleaned = Array.isArray(parsed) ? parsed.filter(r => !r._id?.startsWith('default-reel-')) : [];
    if (Array.isArray(parsed) && cleaned.length !== parsed.length) {
      localStorage.setItem('sidfolio_local_reels', JSON.stringify(cleaned));
    }
    return cleaned;
  } catch {
    return [];
  }
};

const saveLocalReels = (reels) => {
  try {
    localStorage.setItem('sidfolio_local_reels', JSON.stringify(reels));
  } catch (e) {
    console.error('Error saving local reels:', e);
  }
};

/**
 * Fetch all reels:
 * 1. Attempts to query Sanity if client is initialized
 * 2. Merges with any locally added reels
 * 3. Falls back gracefully to default sample reels
 */
export const fetchReels = async () => {
  const client = getSanityClient();
  let sanityReels = [];

  if (client) {
    try {
      const query = `*[_type == "reel"] | order(order asc, _createdAt desc) {
        _id,
        title,
        caption,
        videoUrl,
        "sanityVideoUrl": videoFile.asset->url,
        "sanityCoverUrl": coverImage.asset->url,
        coverUrl,
        category,
        views,
        likes,
        commentsCount,
        audio,
        isFeatured,
        order,
        client,
        _createdAt
      }`;
      const results = await client.fetch(query);
      if (Array.isArray(results) && results.length > 0) {
        sanityReels = results.map(item => ({
          ...item,
          videoUrl: item.sanityVideoUrl || item.videoUrl,
          coverUrl: item.sanityCoverUrl || item.coverUrl,
          createdAt: item._createdAt,
        }));
      }
    } catch (err) {
      console.warn('Sanity query failed (will use fallback):', err.message);
    }
  }

  const localReels = getLocalReels();
  const sanityIds = new Set(sanityReels.map(r => r._id));
  const uniqueLocals = localReels.filter(r => !sanityIds.has(r._id));
  return [...sanityReels, ...uniqueLocals];
};

/**
 * Upload Video to Sanity
 * Handles direct file upload through Sanity Asset API
 */
export const uploadVideoToSanity = async (file) => {
  const client = getSanityClient();
  const config = getSanityConfig();

  if (!client || !config.token) {
    throw new Error('Sanity Write Token is required to upload files directly. You can set it in the Admin Settings.');
  }

  const asset = await client.assets.upload('file', file, {
    filename: file.name,
    contentType: file.type || 'video/mp4',
  });

  return asset;
};

/**
 * Upload Image to Sanity
 */
export const uploadImageToSanity = async (file) => {
  const client = getSanityClient();
  const config = getSanityConfig();

  if (!client || !config.token) {
    throw new Error('Sanity Write Token is required to upload images.');
  }

  const asset = await client.assets.upload('image', file, {
    filename: file.name,
    contentType: file.type || 'image/jpeg',
  });

  return asset;
};

/**
 * Create a new Reel
 * Uploads to Sanity if configured with token; also saves to localStorage
 */
export const createReel = async (reelData) => {
  const client = getSanityClient();
  const config = getSanityConfig();
  let createdSanityDoc = null;

  if (client && config.token) {
    try {
      const doc = {
        _type: 'reel',
        title: reelData.title,
        caption: reelData.caption || '',
        videoUrl: reelData.videoUrl || '',
        coverUrl: reelData.coverUrl || '',
        category: reelData.category || 'Commercial',
        views: reelData.views || '1.2K',
        likes: reelData.likes || '240',
        commentsCount: reelData.commentsCount || '18',
        audio: reelData.audio || 'Original Audio - Siddarth',
        isFeatured: Boolean(reelData.isFeatured),
        order: reelData.order || 0,
        client: reelData.client || 'Client Project',
      };

      if (reelData.videoAssetId) {
        doc.videoFile = {
          _type: 'file',
          asset: { _type: 'reference', _ref: reelData.videoAssetId },
        };
      }
      if (reelData.coverAssetId) {
        doc.coverImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: reelData.coverAssetId },
        };
      }

      createdSanityDoc = await client.create(doc);
    } catch (err) {
      console.warn('Failed to publish document directly to Sanity:', err);
    }
  }

  // Also store locally for instant responsiveness
  const newReel = {
    _id: createdSanityDoc ? createdSanityDoc._id : `local-${Date.now()}`,
    ...reelData,
    createdAt: new Date().toISOString(),
  };

  const locals = getLocalReels();
  locals.unshift(newReel);
  saveLocalReels(locals);

  return newReel;
};

/**
 * Delete a Reel
 */
export const deleteReel = async (reelId) => {
  const client = getSanityClient();
  const config = getSanityConfig();

  if (client && config.token && !reelId.startsWith('local-') && !reelId.startsWith('default-')) {
    try {
      await client.delete(reelId);
    } catch (e) {
      console.warn('Sanity delete error:', e.message);
    }
  }

  const locals = getLocalReels();
  const filtered = locals.filter(r => r._id !== reelId);
  saveLocalReels(filtered);
  return true;
};

/**
 * Toggle Featured status of a reel
 */
export const toggleFeaturedReel = async (reelId, currentStatus) => {
  const newStatus = !currentStatus;
  const client = getSanityClient();
  const config = getSanityConfig();

  if (client && config.token && !reelId.startsWith('local-') && !reelId.startsWith('default-')) {
    try {
      await client.patch(reelId).set({ isFeatured: newStatus }).commit();
    } catch (e) {
      console.warn('Sanity patch error:', e.message);
    }
  }

  const locals = getLocalReels();
  const updated = locals.map(r => r._id === reelId ? { ...r, isFeatured: newStatus } : r);
  saveLocalReels(updated);
  return newStatus;
};

/**
 * Test Sanity credentials connection
 */
export const testSanityConnection = async (projectId, dataset = 'production', token = '') => {
  if (!projectId) {
    throw new Error('Please enter a Project ID.');
  }

  try {
    const testClient = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      token: token || undefined,
      useCdn: false,
    });

    // Simple test query
    const res = await testClient.fetch('count(*[_type == "reel"])');
    return {
      success: true,
      reelCount: res,
      message: `Connected successfully! Found ${res} reel document(s) in dataset "${dataset}".`,
    };
  } catch (err) {
    throw new Error(err.message || 'Failed to connect to Sanity.');
  }
};
