import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Play, Heart, Clapperboard, Sparkles, MoveRight } from 'lucide-react';
import ScrollAnimateWrapper from './ScrollAnimateWrapper';
import { fetchReels } from '../services/sanity';
import ReelViewerModal from './ReelViewerModal';

const Projects = () => {
  const navigate = useNavigate();

  // Category filter state
  const [activeCategory, setActiveCategory] = useState('All');

  // Reels data state
  const [reels, setReels] = useState([]);
  const [hoveredReelId, setHoveredReelId] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  useEffect(() => {
    const loadReels = async () => {
      try {
        const all = await fetchReels();
        setReels(all);
      } catch (e) {
        console.warn('Failed to fetch reels:', e);
      }
    };
    loadReels();
  }, []);

  const categories = ['All', 'Commercial', 'Motion Graphics', 'Color Grade', 'Shorts'];

  const filteredReels = reels.filter((reel) => {
    if (activeCategory === 'All') return true;
    return reel.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  // Display featured reels or up to 8 reels
  const featuredReels = filteredReels.filter(r => r.isFeatured);
  const displayedReels = featuredReels.length > 0 ? featuredReels.slice(0, 8) : filteredReels.slice(0, 8);

  const openReelModal = (index) => {
    setActiveReelIndex(index);
    setViewerOpen(true);
  };

  return (
    <section className="w-full bg-[#FAFAFA] py-[130px] md:py-[180px] flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-[1200px] px-6 md:px-0">
        
        {/* --- HEADER --- */}
        <ScrollAnimateWrapper animation="scroll-fade-up" threshold={0.2}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="relative">
              <div className="w-12 h-1 bg-[#E34400] mb-6"></div>
              <h2 className="font-geist text-[48px] md:text-[64px] font-semibold text-[#0A0A0A] leading-[1.05] tracking-tighter">
                Selected <br /> <span className="text-[#999]">Works</span>
              </h2>
            </div>

            {/* Top Action Button */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/reels')} 
                className="group flex items-center gap-2.5 px-6 py-3.5 bg-[#0A0A0A] hover:bg-[#E34400] text-white rounded-full transition-all duration-300 shadow-md cursor-pointer"
              >
                <Clapperboard size={16} className="text-[#E34400] group-hover:text-white transition-colors" />
                <span className="font-geist text-[14px] font-semibold">Instagram Reels Profile</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </ScrollAnimateWrapper>

        {/* --- CATEGORY FILTER TABS --- */}
        <ScrollAnimateWrapper animation="scroll-fade-up" threshold={0.1}>
          <div className="flex flex-wrap items-center gap-2.5 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-geist text-[14px] font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0A0A0A] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-[#666] hover:border-gray-400 hover:text-black'
                }`}
              >
                {cat === 'All' ? 'All Video Edits' : cat}
              </button>
            ))}
          </div>
        </ScrollAnimateWrapper>

        {/* --- 9:16 VIDEO REELS GRID OR EMPTY STATE --- */}
        <ScrollAnimateWrapper animation="scroll-fade-up" threshold={0.1}>
          {displayedReels.length === 0 ? (
            <div className="w-full p-12 md:p-16 rounded-[32px] bg-white border border-gray-200 text-center flex flex-col items-center justify-center gap-4 mb-16 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#E34400]/10 border border-[#E34400]/20 flex items-center justify-center text-[#E34400]">
                <Clapperboard size={28} />
              </div>
              <div>
                <h3 className="font-geist text-xl font-bold text-[#0A0A0A]">Fresh Video Edits Coming Soon</h3>
                <p className="font-geist text-sm text-[#666] mt-1 max-w-md">
                  Currently curating and uploading commercial cuts and viral reels directly to the showcase.
                </p>
              </div>
              <button
                onClick={() => navigate('/reels')}
                className="mt-2 px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#E34400] text-white font-geist text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Instagram Profile</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {displayedReels.map((reel, idx) => {
                const isHovered = hoveredReelId === reel._id;

                return (
                  <div
                    key={reel._id}
                    onClick={() => openReelModal(idx)}
                    onMouseEnter={() => setHoveredReelId(reel._id)}
                    onMouseLeave={() => setHoveredReelId(null)}
                    className="group relative aspect-[9/16] rounded-[24px] md:rounded-[30px] overflow-hidden bg-zinc-900 border border-gray-200 hover:border-[#E34400] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    {/* Cover Poster Image */}
                    <img
                      src={reel.coverUrl}
                      alt={reel.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isHovered ? 'scale-105' : 'scale-100'
                      }`}
                      loading="lazy"
                    />

                    {/* Video Live Preview on Hover */}
                    {isHovered && reel.videoUrl && (
                      <video
                        src={reel.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-10"
                      />
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/10 font-geist">
                        {reel.category || 'Reel'}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center">
                        <Clapperboard size={12} />
                      </div>
                    </div>

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-15 pointer-events-none"></div>

                    {/* Center Play Icon on Hover */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                        <Play size={18} className="fill-black translate-x-0.5" />
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-4 inset-x-4 z-20 pointer-events-none text-white">
                      <h4 className="font-geist text-[13px] md:text-[15px] font-bold line-clamp-1 leading-snug group-hover:text-[#E34400] transition-colors">
                        {reel.title}
                      </h4>

                      <div className="flex items-center gap-3 text-[11px] text-white/80 mt-1 font-geist">
                        <div className="flex items-center gap-1">
                          <Play size={11} className="fill-white text-white" />
                          <span>{reel.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart size={11} className="fill-rose-500 text-rose-500" />
                          <span>{reel.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollAnimateWrapper>

        {/* --- INSTAGRAM SHOWCASE BANNER --- */}
        <ScrollAnimateWrapper animation="scroll-fade-up" threshold={0.1}>
          <div className="p-6 md:p-10 rounded-[28px] bg-white border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-5 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg">
                <Clapperboard size={26} />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-[#E34400] text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles size={13} />
                  <span>Interactive Experience</span>
                </div>
                <h4 className="font-geist text-[20px] md:text-[22px] font-bold text-[#0A0A0A]">
                  Explore the Complete Instagram Reels Profile
                </h4>
                <p className="font-geist text-[14px] text-[#666] mt-0.5 max-w-xl">
                  Watch full-length edits, commercial campaigns, sound design breakdowns, and client work in an authentic Instagram interface.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/reels')}
              className="px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#E34400] text-white font-geist text-[14px] font-semibold rounded-full flex items-center gap-2.5 transition-colors flex-shrink-0 cursor-pointer shadow-md"
            >
              <span>Open Instagram View</span>
              <MoveRight size={16} />
            </button>
          </div>
        </ScrollAnimateWrapper>

      </div>

      {/* Full-Screen Instagram Reel Viewer Modal */}
      <ReelViewerModal
        reels={displayedReels}
        activeIndex={activeReelIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onIndexChange={(newIdx) => setActiveReelIndex(newIdx)}
      />
    </section>
  );
};

export default Projects;
