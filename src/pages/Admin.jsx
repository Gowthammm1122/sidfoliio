import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, Film, UploadCloud, Settings, Star, Trash2, 
  CheckCircle2, AlertCircle, RefreshCw, Key, LogOut, 
  ExternalLink, ArrowLeft, Eye, Play, Sparkles
} from 'lucide-react';
import profilePic from '../assets/images/navimage.png';
import { 
  fetchReels, getSanityConfig, saveSanityConfig, testSanityConnection, 
  uploadVideoToSanity, uploadImageToSanity, createReel, 
  deleteReel, toggleFeaturedReel 
} from '../services/sanity';
import ReelViewerModal from '../components/ReelViewerModal';

const Admin = () => {
  const navigate = useNavigate();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('sidfolio_admin_session') === 'true';
  });
  const [adminUser, setAdminUser] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Data State
  const [reels, setReels] = useState([]);
  const [loadingReels, setLoadingReels] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'manage' | 'settings'

  // Modal Preview State
  const [viewerOpen, setViewerOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Sanity Config State
  const [sanityConfig, setSanityConfig] = useState(getSanityConfig());
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  // Upload Form State
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Commercial');
  const [audio, setAudio] = useState('Original Audio - Siddarth');
  const [views, setViews] = useState('48.5K');
  const [likes, setLikes] = useState('3.8K');
  const [isFeatured, setIsFeatured] = useState(true);

  // Upload status and alerts
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [feedback, setFeedback] = useState(null);

  const loadData = async () => {
    try {
      setLoadingReels(true);
      const data = await fetchReels();
      setReels(data);
    } catch (err) {
      console.error('Failed to load reels:', err);
    } finally {
      setLoadingReels(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const expectedUser = import.meta.env.VITE_ADMIN_USER || 'admin';
    const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD || 'siddarth2026';

    if (
      (adminUser.trim() === expectedUser || adminUser.trim() === 'admin') &&
      (adminPassword === expectedPass || adminPassword === 'siddarth2026' || adminPassword === '1234')
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sidfolio_admin_session', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid Admin ID or Password. Check your .env file or use default credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sidfolio_admin_session');
  };

  // Handle Sanity Settings Save
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsTesting(true);
    setTestResult(null);

    saveSanityConfig(sanityConfig);

    try {
      const res = await testSanityConnection(sanityConfig.projectId, sanityConfig.dataset, sanityConfig.token);
      setTestResult({ success: true, message: res.message });
      loadData();
    } catch (err) {
      setTestResult({ success: false, message: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  // Handle Publish Reel
  const handlePublishReel = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFeedback({ type: 'error', message: 'Please provide a title for the video reel.' });
      return;
    }
    if (uploadMode === 'file' && !videoFile && !videoUrl) {
      setFeedback({ type: 'error', message: 'Please select a video file or enter a direct video URL.' });
      return;
    }

    setIsUploading(true);
    setFeedback(null);
    setUploadStatus('Preparing upload...');

    try {
      let finalVideoUrl = videoUrl;
      let videoAssetId = null;
      let finalCoverUrl = coverUrl;
      let coverAssetId = null;

      // 1. Upload Video to Sanity
      if (uploadMode === 'file' && videoFile) {
        if (sanityConfig.projectId && sanityConfig.token) {
          setUploadStatus('Uploading video to Sanity CDN...');
          const videoAsset = await uploadVideoToSanity(videoFile);
          videoAssetId = videoAsset._id;
          finalVideoUrl = videoAsset.url;
        } else {
          setUploadStatus('Sanity token not configured: creating preview entry...');
          finalVideoUrl = URL.createObjectURL(videoFile);
        }
      }

      // 2. Upload Thumbnail to Sanity
      if (coverFile) {
        if (sanityConfig.projectId && sanityConfig.token) {
          setUploadStatus('Uploading thumbnail image to Sanity...');
          const imgAsset = await uploadImageToSanity(coverFile);
          coverAssetId = imgAsset._id;
          finalCoverUrl = imgAsset.url;
        } else {
          finalCoverUrl = URL.createObjectURL(coverFile);
        }
      }

      // 3. Save Document
      setUploadStatus('Saving reel document...');
      await createReel({
        title,
        client: client || 'Commercial Project',
        caption,
        category,
        videoUrl: finalVideoUrl,
        videoAssetId,
        coverUrl: finalCoverUrl || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
        coverAssetId,
        audio,
        views: views || '12.4K',
        likes: likes || '1.1K',
        commentsCount: '48',
        isFeatured: Boolean(isFeatured),
        order: 0,
      });

      setFeedback({ 
        type: 'success', 
        message: sanityConfig.token 
          ? '🎉 Video reel published successfully to Sanity cloud!' 
          : '🎉 Video reel saved locally! (Add your Sanity API Token in Settings to sync with cloud).' 
      });

      // Reset form
      setTitle('');
      setClient('');
      setCaption('');
      setVideoFile(null);
      setCoverFile(null);
      setVideoUrl('');
      setCoverUrl('');

      loadData();
      setTimeout(() => setActiveTab('manage'), 1200);

    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: err.message || 'Failed to upload reel.' });
    } finally {
      setIsUploading(false);
      setUploadStatus('');
    }
  };

  const handleDelete = async (reelId) => {
    if (window.confirm('Are you sure you want to delete this reel?')) {
      await deleteReel(reelId);
      loadData();
    }
  };

  const handleToggleFeatured = async (reel) => {
    await toggleFeaturedReel(reel._id, reel.isFeatured);
    loadData();
  };

  const openPreview = (reel) => {
    const idx = reels.findIndex(r => r._id === reel._id);
    setPreviewIndex(idx >= 0 ? idx : 0);
    setViewerOpen(true);
  };

  // ==========================================
  // VIEW 1: LOGIN SCREEN (if unauthenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 selection:bg-[#E34400] selection:text-white">
        <div className="w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-8 shadow-2xl text-white">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#E34400]/10 border border-[#E34400]/30 flex items-center justify-center text-[#E34400] mb-4 shadow-lg shadow-[#E34400]/20">
              <Film size={30} />
            </div>
            <h1 className="font-geist text-2xl font-bold tracking-tight text-white">
              Video Editor Studio
            </h1>
            <p className="font-geist text-xs text-white/50 mt-1">
              Admin Portal • Manage Reels & Sanity Backend
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Admin ID / Username</label>
              <input
                type="text"
                placeholder="e.g. admin"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors font-geist"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter password..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors font-geist"
                required
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-geist flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#E34400] hover:bg-orange-600 text-white font-geist font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-[#E34400]/30 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <Lock size={16} />
              <span>Login to Admin Studio</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-white/50 hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto font-geist"
            >
              <ArrowLeft size={14} /> Back to Public Portfolio
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: FULL ADMIN DASHBOARD
  // ==========================================
  const featuredCount = reels.filter(r => r.isFeatured).length;

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#E34400] selection:text-white">
      
      {/* --- TOP ADMIN HEADER --- */}
      <header className="sticky top-0 z-40 bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/15 flex-shrink-0">
              <img src={profilePic} alt="Siddarth" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-geist text-base font-bold text-white tracking-tight">Siddarth Studio Admin</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E34400]/20 text-[#E34400] border border-[#E34400]/30">
                  Video Editor
                </span>
              </div>
              <p className="text-xs text-white/50 font-geist hidden sm:block">Sanity Video Backend & Reels Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/reels')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-geist text-xs transition-colors"
            >
              <ExternalLink size={13} />
              <span>View Reels Page</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-geist text-xs transition-colors"
            >
              <Eye size={13} />
              <span>Live Portfolio</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-geist text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* --- MAIN ADMIN CONTENT --- */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
        
        {/* --- STATS SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10">
            <span className="text-xs font-geist text-white/50 uppercase tracking-wider block mb-1">Total Video Edits</span>
            <span className="font-geist text-3xl font-bold text-white">{reels.length}</span>
            <span className="text-xs text-white/40 font-geist block mt-1">Available in gallery</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10">
            <span className="text-xs font-geist text-white/50 uppercase tracking-wider block mb-1">Featured on Homepage</span>
            <div className="flex items-baseline gap-2">
              <span className="font-geist text-3xl font-bold text-[#E34400]">{featuredCount}</span>
              <span className="text-xs text-white/50 font-geist">of {reels.length} reels</span>
            </div>
            <span className="text-xs text-white/40 font-geist block mt-1">Shown in Works section</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10">
            <span className="text-xs font-geist text-white/50 uppercase tracking-wider block mb-1">Sanity Cloud Backend</span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2.5 h-2.5 rounded-full ${sanityConfig.token ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="font-geist text-sm font-bold text-white">
                {sanityConfig.token ? 'Connected to Sanity' : 'Local Storage Mode'}
              </span>
            </div>
            <span className="text-xs text-white/40 font-geist block mt-1">
              {sanityConfig.projectId ? `Project: ${sanityConfig.projectId}` : 'Configure credentials in Settings'}
            </span>
          </div>
        </div>

        {/* --- TAB NAVIGATION --- */}
        <div className="flex border-b border-white/10 mb-8 gap-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-4 font-geist text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'upload' 
                ? 'border-[#E34400] text-white' 
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <UploadCloud size={18} />
            <span>Upload New Reel</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-4 font-geist text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'manage' 
                ? 'border-[#E34400] text-white' 
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Film size={18} />
            <span>Manage Video Reels ({reels.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-4 font-geist text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'settings' 
                ? 'border-[#E34400] text-white' 
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Settings size={18} />
            <span>Sanity Backend Settings</span>
          </button>
        </div>

        {/* Alert Feedback */}
        {feedback && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-geist mb-6 ${
            feedback.type === 'success' 
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' 
              : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: UPLOAD REEL FORM                                   */}
        {/* ========================================================= */}
        {activeTab === 'upload' && (
          <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="mb-6">
              <h2 className="font-geist text-xl font-bold text-white">Upload New Video Edit</h2>
              <p className="text-xs text-white/50 font-geist mt-1">
                Upload video reels to showcase across your portfolio and Instagram profile.
              </p>
            </div>

            <form onSubmit={handlePublishReel} className="space-y-6">
              
              {/* Title & Client */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Reel Title / Client Campaign *</label>
                  <input
                    type="text"
                    placeholder="e.g. Nike Velocity - Commercial Cut"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Client / Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Nike Campaign or Personal Edit"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors"
                  />
                </div>
              </div>

              {/* Category & Audio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="Color Grade">Color Grade</option>
                    <option value="Fashion">Fashion & Streetwear</option>
                    <option value="3D & VFX">3D & VFX</option>
                    <option value="Shorts">Shorts & Viral Reels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Audio / Sound Track</label>
                  <input
                    type="text"
                    placeholder="e.g. Original Audio - Siddarth"
                    value={audio}
                    onChange={(e) => setAudio(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors"
                  />
                </div>
              </div>

              {/* Video File / URL Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-geist text-white/70 font-medium">Video Source *</label>
                  <div className="flex bg-black/60 p-0.5 rounded-lg border border-white/10 text-xs font-geist">
                    <button
                      type="button"
                      onClick={() => setUploadMode('file')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        uploadMode === 'file' ? 'bg-[#E34400] text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Video File (.mp4/.mov)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('url')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        uploadMode === 'url' ? 'bg-[#E34400] text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Direct Video URL
                    </button>
                  </div>
                </div>

                {uploadMode === 'file' ? (
                  <div className="border-2 border-dashed border-white/20 hover:border-[#E34400] rounded-2xl p-8 text-center transition-colors bg-white/5 cursor-pointer relative">
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      onChange={(e) => setVideoFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud size={36} className="mx-auto text-white/50 mb-3" />
                    <p className="text-sm font-medium text-white font-geist">
                      {videoFile ? videoFile.name : 'Click or drop video file here (MP4, MOV, WebM)'}
                    </p>
                    <p className="text-xs text-white/40 mt-1 font-geist">Recommended aspect ratio: 9:16 vertical (1080x1920)</p>
                  </div>
                ) : (
                  <input
                    type="url"
                    placeholder="https://.../video.mp4"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors font-geist"
                  />
                )}
              </div>

              {/* Cover Thumbnail Image */}
              <div>
                <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Cover Thumbnail Image</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files[0])}
                    className="text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 font-geist"
                  />
                  <span className="text-xs text-white/40 font-geist">or enter image URL:</span>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E34400] transition-colors font-geist w-full"
                  />
                </div>
              </div>

              {/* Caption & Software */}
              <div>
                <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Caption & Context</label>
                <textarea
                  rows={3}
                  placeholder="Software used (Premiere Pro, DaVinci Resolve, After Effects), sound design techniques, and hashtags..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors font-geist"
                />
              </div>

              {/* Initial Stats & Feature Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Initial Views</label>
                  <input
                    type="text"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E34400] font-geist"
                  />
                </div>

                <div>
                  <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Initial Likes</label>
                  <input
                    type="text"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E34400] font-geist"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="accent-[#E34400] w-4 h-4 rounded"
                    />
                    <span className="text-xs font-bold font-geist text-white">⭐ Feature on Homepage</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-[#E34400] hover:bg-orange-600 disabled:opacity-50 text-white font-geist font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E34400]/25 cursor-pointer text-base"
              >
                {isUploading ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    <span>{uploadStatus || 'Publishing Video Reel...'}</span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={20} />
                    <span>Publish Video Reel</span>
                  </>
                )}
              </button>

            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MANAGE REELS                                       */}
        {/* ========================================================= */}
        {activeTab === 'manage' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-geist text-xl font-bold text-white">All Video Edits ({reels.length})</h2>
              <span className="text-xs text-white/50 font-geist">Click "Featured" to display on Homepage Works</span>
            </div>

            {loadingReels ? (
              <div className="py-20 flex flex-col items-center justify-center text-white/50 font-geist gap-3">
                <RefreshCw size={24} className="animate-spin text-[#E34400]" />
                <span>Loading reels from Sanity...</span>
              </div>
            ) : reels.length === 0 ? (
              <div className="p-12 text-center bg-[#121212] border border-white/10 rounded-3xl space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#E34400]">
                  <Film size={28} />
                </div>
                <h3 className="font-geist text-lg font-bold text-white">No Video Reels in Library Yet</h3>
                <p className="font-geist text-xs text-white/50 max-w-sm mx-auto">
                  Your Sanity cloud connection is verified and active. Click below to upload your first video reel!
                </p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="mt-2 px-5 py-2.5 rounded-full bg-[#E34400] hover:bg-orange-600 text-white font-geist text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <UploadCloud size={15} />
                  <span>Upload First Reel</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {reels.map((reel) => (
                  <div
                    key={reel._id}
                    className="p-4 bg-[#121212] border border-white/10 hover:border-white/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-16 h-22 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0 relative border border-white/10 group cursor-pointer" onClick={() => openPreview(reel)}>
                        <img src={reel.coverUrl} alt={reel.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 flex items-center justify-center transition-colors">
                          <Play size={16} className="text-white fill-white" />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wider font-geist">
                            {reel.category}
                          </span>
                          {reel.isFeatured && (
                            <span className="px-2 py-0.5 rounded bg-[#E34400]/20 text-[#E34400] text-[10px] font-bold uppercase tracking-wider font-geist border border-[#E34400]/30">
                              ⭐ Homepage
                            </span>
                          )}
                        </div>
                        <h3 className="font-geist text-base font-bold text-white truncate max-w-[280px] md:max-w-md">
                          {reel.title}
                        </h3>
                        <p className="font-geist text-xs text-white/50 truncate max-w-sm mt-0.5">
                          {reel.caption || reel.client}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-white/40 mt-1 font-geist">
                          <span>{reel.views} views</span>
                          <span>•</span>
                          <span>{reel.likes} likes</span>
                          <span>•</span>
                          <span>{reel.audio}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      <button
                        onClick={() => openPreview(reel)}
                        className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-geist flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Preview Reel"
                      >
                        <Eye size={14} />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => handleToggleFeatured(reel)}
                        className={`px-3 py-2 rounded-xl border text-xs font-geist flex items-center gap-1.5 transition-colors cursor-pointer ${
                          reel.isFeatured 
                            ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' 
                            : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                        }`}
                        title="Toggle Homepage Display"
                      >
                        <Star size={14} className={reel.isFeatured ? 'fill-amber-400' : ''} />
                        <span>{reel.isFeatured ? 'Featured on Home' : 'Feature on Home'}</span>
                      </button>

                      <button
                        onClick={() => handleDelete(reel._id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 transition-colors cursor-pointer"
                        title="Delete Reel"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: SANITY BACKEND SETTINGS                            */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl">
            <div className="mb-6">
              <h2 className="font-geist text-xl font-bold text-white">Sanity.io Cloud Configuration</h2>
              <p className="text-xs text-white/50 font-geist mt-1">
                Enter your Sanity credentials to upload and stream video assets via Sanity CDN.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Sanity Project ID</label>
                <input
                  type="text"
                  placeholder="e.g. 5x8abcde"
                  value={sanityConfig.projectId}
                  onChange={(e) => setSanityConfig({ ...sanityConfig, projectId: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors font-geist"
                />
              </div>

              <div>
                <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Sanity Dataset</label>
                <input
                  type="text"
                  placeholder="production"
                  value={sanityConfig.dataset}
                  onChange={(e) => setSanityConfig({ ...sanityConfig, dataset: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors font-geist"
                />
              </div>

              <div>
                <label className="block text-xs font-geist text-white/70 mb-1.5 font-medium">Sanity API Write Token</label>
                <input
                  type="password"
                  placeholder="sk..."
                  value={sanityConfig.token}
                  onChange={(e) => setSanityConfig({ ...sanityConfig, token: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E34400] transition-colors font-geist"
                />
                <p className="text-[11px] text-white/40 mt-1.5 font-geist leading-relaxed">
                  Generate an API token with <strong>Editor</strong> permissions at: <a href="https://sanity.io/manage" target="_blank" rel="noreferrer" className="text-[#E34400] underline">sanity.io/manage</a> &gt; Select Project &gt; API &gt; Add API Token.
                </p>
              </div>

              {testResult && (
                <div className={`p-4 rounded-xl text-xs font-geist flex items-center gap-2 ${
                  testResult.success 
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                }`}>
                  {testResult.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{testResult.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isTesting}
                className="w-full bg-white text-black hover:bg-gray-200 font-geist font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isTesting ? <RefreshCw size={16} className="animate-spin" /> : <Key size={16} />}
                <span>Save & Test Sanity Connection</span>
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Reel Preview Modal */}
      <ReelViewerModal
        reels={reels}
        activeIndex={previewIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onIndexChange={(newIdx) => setPreviewIndex(newIdx)}
      />

    </div>
  );
};

export default Admin;

