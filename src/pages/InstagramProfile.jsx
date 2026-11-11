import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Film, Heart, Play, Share2, 
  ExternalLink, Clapperboard, Flame, RefreshCw
} from 'lucide-react';
import profilePic from '../assets/profile/pfp.png';
import { fetchReels } from '../services/sanity';
import ReelViewerModal from '../components/ReelViewerModal';
import Footer from '../components/Footer';

const HIGHLIGHTS = [
  { id: 1, title: 'Showreel', icon: '', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=80' },
  { id: 2, title: 'Commercial', icon: '', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=300&q=80' },
  { id: 3, title: 'Color Grade', icon: '', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
  { id: 4, title: 'Process', icon: '', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80' },
];

const InstagramProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Reels Data State
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('reels'); // 'reels' | 'featured'

  // Modals State
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  // Social Interactive State
  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedProfile, setCopiedProfile] = useState(false);
  const [hoveredReelId, setHoveredReelId] = useState(null);

  const loadReelsData = async () => {
    try {
      setLoading(true);
      const data = await fetchReels();
      setReels(data);
    } catch (err) {
      console.error('Error loading reels:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReelsData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // If query string has ?id=, open that reel
    const params = new URLSearchParams(location.search);
    const targetReelId = params.get('id');
    if (targetReelId && reels.length > 0) {
      const idx = reels.findIndex(r => r._id === targetReelId);
      if (idx !== -1) {
        setActiveReelIndex(idx);
        setViewerOpen(true);
      }
    }
  }, [location.search, reels]);

  // Filter reels
  const filteredReels = reels.filter((reel) => {
    if (activeTab === 'featured' && !reel.isFeatured) return false;
    if (activeCategory === 'All') return true;
    return reel.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const categories = ['All', 'Commercial', 'Motion Graphics', 'Color Grade', 'Fashion', '3D & VFX'];

  const openReelModal = (reel) => {
    const idx = reels.findIndex(r => r._id === reel._id);
    setActiveReelIndex(idx >= 0 ? idx : 0);
    setViewerOpen(true);
  };

  const handleShareProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedProfile(true);
      setTimeout(() => setCopiedProfile(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#E34400] selection:text-white">
      
      {/* --- TOP INSTAGRAM NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 w-full bg-[#080808]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1000px] mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Back button */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30">
              <ArrowLeft size={16} />
            </div>
            <span className="font-geist text-xs md:text-sm font-medium hidden sm:inline">Portfolio</span>
          </button>

          {/* Center Handle */}
          <div className="flex items-center gap-2">
            <span className="font-geist text-base md:text-lg font-bold text-white tracking-tight">
              siddarth.edits
            </span>
            <div className="w-4 h-4 rounded-full bg-[#3897f0] flex items-center justify-center text-white text-[10px]">
              ✓
            </div>
          </div>

          {/* Right Action: Contact */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:siddarthgowtham7@gmail.com"
              className="flex items-center gap-2 bg-[#E34400] hover:bg-orange-600 text-white px-4 py-1.5 rounded-full font-geist text-xs font-semibold shadow-lg shadow-[#E34400]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Get in Touch</span>
            </a>
          </div>

        </div>
      </header>

      {/* --- MAIN PROFILE CONTAINER --- */}
      <main className="max-w-[1000px] mx-auto px-4 md:px-8 pt-8 pb-20">
        
        {/* --- PROFILE HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-14 mb-10 pb-10 border-b border-white/10">
          
          {/* Avatar with Story Gradient Ring */}
          <div className="relative group cursor-pointer mx-auto md:mx-0 flex-shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full p-[3px] bg-[#080808]">
                <img 
                  src={profilePic} 
                  alt="Siddarth" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#3897f0] border-2 border-[#080808] flex items-center justify-center text-white text-xs font-bold">
              ✓
            </div>
          </div>

          {/* Profile Details & Actions */}
          <div className="flex-1 w-full space-y-5">
            
            {/* Row 1: Username & Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-geist text-2xl font-bold text-white tracking-tight">
                siddarth.edits
              </h1>

              <div className="flex items-center gap-2 ml-auto sm:ml-4">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2 rounded-xl font-geist text-xs font-semibold transition-all ${
                    isFollowing 
                      ? 'bg-white/10 text-white hover:bg-white/20' 
                      : 'bg-[#E34400] text-white hover:bg-orange-600 shadow-md shadow-[#E34400]/30'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>

                <a
                  href="mailto:siddarthgowtham7@gmail.com"
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-geist text-xs font-semibold transition-colors"
                >
                  Message
                </a>

                <button
                  onClick={handleShareProfile}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  title="Share Profile"
                >
                  {copiedProfile ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
                </button>
              </div>
            </div>

            {/* Row 2: Stats (Posts, Followers, Following) */}
            <div className="flex items-center gap-8 text-sm font-geist">
              <div>
                <span className="font-bold text-white text-base mr-1.5">{reels.length}</span>
                <span className="text-white/60 text-xs">Reels</span>
              </div>
              <div>
                <span className="font-bold text-white text-base mr-1.5">20K</span>
                <span className="text-white/60 text-xs">Followers</span>
              </div>
              <div>
                <span className="font-bold text-white text-base mr-1.5">0</span>
                <span className="text-white/60 text-xs">Following</span>
              </div>
              <div>
                <span className="font-bold text-white text-base mr-1.5">100k+</span>
                <span className="text-white/60 text-xs">Total Views</span>
              </div>
            </div>

            {/* Row 3: Bio Copy */}
            <div className="space-y-1.5 font-geist text-sm text-white/90">
              <p className="font-bold text-white flex items-center gap-2">
                Siddarth A. 
                <span className="text-xs font-normal text-white/50">| Video Editor & Motion Designer</span>
              </p>
              <p className="text-white/80 text-xs leading-relaxed">
                Crafting high-retention video edits, viral commercial cuts & dynamic motion graphics.
              </p>
              <p className="text-white/80 text-xs">
                DaVinci Resolve • Premiere Pro • After Effects • 3D Blender
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-semibold">
                <a 
                  href="/#works" 
                  className="text-[#E34400] hover:underline flex items-center gap-1"
                >
                  <ExternalLink size={12} /> View Featured Video Edits
                </a>
                <span className="text-white/30">•</span>
                <span className="text-white/60">📍 Open for freelance & brand campaigns</span>
              </div>
            </div>

          </div>
        </div>

        {/* --- STORY HIGHLIGHTS TRAY --- */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center gap-6 min-w-max">
            {HIGHLIGHTS.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full p-[2px] bg-white/20 group-hover:bg-[#E34400] transition-colors">
                  <div className="w-full h-full rounded-full p-[2px] bg-[#080808]">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-800 flex items-center justify-center">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-100" />
                      <span className="absolute inset-0 flex items-center justify-center text-xl bg-black/40">
                        {item.icon}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="font-geist text-xs text-white/70 group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* --- TABS & FILTER BAR --- */}
        <div className="border-t border-white/10 pt-4 mb-6">
          
          {/* Main Instagram Tabs */}
          <div className="flex items-center justify-center gap-12 mb-6">
            <button
              onClick={() => setActiveTab('reels')}
              className={`flex items-center gap-2 pb-3 font-geist text-xs uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'reels' 
                  ? 'border-white text-white' 
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <Clapperboard size={16} />
              <span>All Reels ({reels.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('featured')}
              className={`flex items-center gap-2 pb-3 font-geist text-xs uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'featured' 
                  ? 'border-[#E34400] text-[#E34400]' 
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <Flame size={16} />
              <span>Selected for Homepage</span>
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-geist font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-white text-black font-semibold shadow-md' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="ml-auto pl-4 text-xs text-white/40 font-geist hidden sm:block">
              Click any reel to play full screen
            </div>
          </div>

        </div>

        {/* --- 9:16 INSTAGRAM REELS GRID --- */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <RefreshCw size={28} className="animate-spin text-[#E34400]" />
            <span className="font-geist text-sm text-white/60">Loading Reels Showcase...</span>
          </div>
        ) : filteredReels.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#E34400]">
              <Film size={32} />
            </div>
            <h3 className="font-geist text-lg font-bold text-white">
              {reels.length === 0 ? "No Reels Published Yet" : "No Reels Found in this Category"}
            </h3>
            <p className="text-xs text-white/50 font-geist leading-relaxed">
              {reels.length === 0 
                ? "Your Sanity backend is connected and ready! Head over to the admin portal at /admin to upload your own video reels."
                : "Try selecting a different filter above."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {filteredReels.map((reel) => {
              const isHovered = hoveredReelId === reel._id;

              return (
                <div
                  key={reel._id}
                  onClick={() => openReelModal(reel)}
                  onMouseEnter={() => setHoveredReelId(reel._id)}
                  onMouseLeave={() => setHoveredReelId(null)}
                  className="group relative aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer shadow-lg hover:shadow-2xl hover:border-[#E34400]/50 transition-all duration-300"
                >
                  
                  {/* Poster / Thumbnail Image */}
                  <img
                    src={reel.coverUrl}
                    alt={reel.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                    loading="lazy"
                  />

                  {/* Video Hover Live Preview (plays on hover) */}
                  {isHovered && reel.videoUrl && (
                    <video
                      src={reel.videoUrl}
                      autoPlay
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                  )}

                  {/* Badges Overlay (Top) */}
                  <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {reel.category || 'Reel'}
                    </span>

                    {reel.isFeatured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E34400] text-white shadow-md">
                        ⭐ Home
                      </span>
                    )}
                  </div>

                  {/* Subtle permanent bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-15 pointer-events-none"></div>

                  {/* Bottom Info on Card (Title & Stats) */}
                  <div className="absolute bottom-3 inset-x-3 z-20 pointer-events-none text-white">
                    <h4 className="font-geist text-xs md:text-sm font-bold line-clamp-1 group-hover:text-white transition-colors">
                      {reel.title}
                    </h4>

                    <div className="flex items-center gap-3 text-[11px] text-white/80 mt-1 font-geist">
                      <div className="flex items-center gap-1">
                        <Play size={12} className="fill-white text-white" />
                        <span>{reel.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} className="fill-rose-500 text-rose-500" />
                        <span>{reel.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Play Icon on Hover */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/20 backdrop-blur-[2px]">
                    <div className="w-14 h-14 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                      <Play size={24} className="fill-white translate-x-0.5" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* --- BOTTOM CALLOUT BANNER --- */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-[#141414] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-geist text-xl font-bold text-white">Need high-impact video edits for your brand?</h3>
            <p className="text-xs md:text-sm text-white/60 font-geist">
              From kinetic commercials to viral short-form hooks, let’s bring your story to life.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:siddarthgowtham7@gmail.com"
              className="px-6 py-3 rounded-full bg-[#E34400] hover:bg-orange-600 text-white font-geist text-xs md:text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-[#E34400]/30"
            >
              Start a Project
            </a>
            <button
              onClick={() => navigate('/#works')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-geist text-xs md:text-sm font-semibold transition-colors"
            >
              View Featured Works
            </button>
          </div>
        </div>

      </main>

      {/* --- REEL VIEWER MODAL --- */}
      <ReelViewerModal
        reels={filteredReels}
        activeIndex={activeReelIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onIndexChange={(newIdx) => setActiveReelIndex(newIdx)}
      />

      <Footer />

    </div>
  );
};

export default InstagramProfile;
