import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, 
  Play, X, ChevronUp, ChevronDown, Check, Music2, Sparkles, Send
} from 'lucide-react';
import profilePic from '../assets/profile/pfp.png';

const parseCompactNumber = (str) => {
  if (typeof str === 'number') return str;
  const num = parseFloat(str);
  if (str.toLowerCase().includes('k')) return Math.round(num * 1000);
  if (str.toLowerCase().includes('m')) return Math.round(num * 1000000);
  return isNaN(num) ? 1200 : Math.round(num);
};

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// Inner component keyed by reel ID: state naturally resets per reel without setState-in-effect
const ReelPlayerContent = ({ currentReel }) => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(() => parseCompactNumber(currentReel?.likes || '1.2K'));
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState(() => [
    { id: 1, user: 'alex_motion', text: 'That speed ramp at 0:03 is pure magic! 🔥', time: '2h' },
    { id: 2, user: 'sarah.creatives', text: 'The color grading on those skin tones is immaculate 👌', time: '5h' },
    { id: 3, user: 'hyperbrand_co', text: 'Sent you a DM regarding our next campaign!', time: '1d' },
  ]);
  const [progress, setProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [captionExpanded, setCaptionExpanded] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 900);
    } else {
      setIsLiked(false);
      setLikeCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleVideoDoubleClick = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
    setShowHeartPop(true);
    setTimeout(() => setShowHeartPop(false), 900);
  };

  const handleShare = () => {
    const url = window.location.origin + '/reels?id=' + currentReel._id;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComm = {
      id: Date.now(),
      user: 'you',
      text: commentText.trim(),
      time: 'Just now',
    };
    setCommentsList([newComm, ...commentsList]);
    setCommentText('');
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="relative w-full h-full md:h-[90vh] max-w-[460px] md:rounded-[36px] overflow-hidden shadow-2xl bg-[#0F0F0F] border border-white/10 flex flex-col justify-between select-none">
      
      {/* Video Element */}
      <div 
        className="relative w-full h-full bg-black flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={togglePlay}
        onDoubleClick={handleVideoDoubleClick}
      >
        <video
          ref={videoRef}
          src={currentReel.videoUrl}
          poster={currentReel.coverUrl}
          playsInline
          loop
          muted={isMuted}
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />

        {/* Double Click Heart Animation Pop */}
        {showHeartPop && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-in zoom-in-50 fade-in duration-200">
            <Heart size={100} className="fill-red-500 text-red-500 drop-shadow-[0_0_35px_rgba(239,68,68,0.8)] animate-pulse" />
          </div>
        )}

        {/* Pause overlay icon */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-20">
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Play size={28} className="translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none"></div>

        {/* Sound Toggle (Top-Right inside video) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Right Action Rail (Instagram Style) */}
      <div className="absolute right-3 bottom-14 z-30 flex flex-col items-center gap-5">
        
        {/* Like */}
        <button
          onClick={handleLike}
          className="group flex flex-col items-center gap-1 cursor-pointer transition-transform active:scale-75"
        >
          <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isLiked 
              ? 'bg-rose-500/20 text-rose-500' 
              : 'bg-black/40 text-white group-hover:bg-black/60'
          }`}>
            <Heart size={24} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
          </div>
          <span className="text-[12px] font-medium text-white shadow-sm font-geist">
            {formatNumber(likeCount)}
          </span>
        </button>

        {/* Comments */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="group flex flex-col items-center gap-1 cursor-pointer transition-transform active:scale-75"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md group-hover:bg-black/60 transition-all">
            <MessageCircle size={24} />
          </div>
          <span className="text-[12px] font-medium text-white shadow-sm font-geist">
            {currentReel.commentsCount || commentsList.length}
          </span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="group flex flex-col items-center gap-1 cursor-pointer transition-transform active:scale-75"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md group-hover:bg-black/60 transition-all">
            {copiedLink ? <Check size={22} className="text-emerald-400" /> : <Share2 size={24} />}
          </div>
          <span className="text-[11px] font-medium text-white shadow-sm font-geist">
            {copiedLink ? 'Copied!' : 'Share'}
          </span>
        </button>

        {/* Save / Bookmark */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="group flex flex-col items-center gap-1 cursor-pointer transition-transform active:scale-75"
        >
          <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isSaved 
              ? 'bg-amber-500/20 text-amber-400' 
              : 'bg-black/40 text-white group-hover:bg-black/60'
          }`}>
            <Bookmark size={24} className={isSaved ? 'fill-amber-400 text-amber-400' : ''} />
          </div>
          <span className="text-[12px] font-medium text-white shadow-sm font-geist">Save</span>
        </button>

        {/* Spinning Vinyl Audio Disc */}
        <div className="relative mt-2 flex items-center justify-center">
          <div className={`w-10 h-10 rounded-full border-2 border-white/60 p-0.5 overflow-hidden shadow-lg ${
            isPlaying ? 'animate-spin' : ''
          }`} style={{ animationDuration: '4s' }}>
            <img src={profilePic} alt="Audio Cover" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="absolute -top-2 -left-2 text-white/80 animate-bounce pointer-events-none">
            <Music2 size={12} />
          </div>
        </div>
      </div>

      {/* Bottom Creator Info & Caption (Instagram Style) */}
      <div className="absolute bottom-3 left-4 right-16 z-20 text-white flex flex-col gap-2">
        
        {/* Creator Profile Row */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <img src={profilePic} alt="Siddarth" className="w-full h-full rounded-full object-cover" />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-geist text-[14px] font-bold text-white tracking-tight">
              siddarth.edits
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40"></span>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full border transition-all ${
                isFollowing 
                  ? 'bg-white/20 text-white border-white/20' 
                  : 'bg-transparent text-[#E34400] border-[#E34400] hover:bg-[#E34400] hover:text-white'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Category Pill & Title */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/10 rounded-md backdrop-blur-sm text-white/90">
            {currentReel.category || 'Reel'}
          </span>
          <span className="text-[13px] font-semibold text-white truncate max-w-[220px]">
            {currentReel.title}
          </span>
        </div>

        {/* Caption with Expand toggle */}
        <div className="text-[13px] text-white/90 font-normal leading-[1.4] pr-2">
          <p className={captionExpanded ? '' : 'line-clamp-2'}>
            {currentReel.caption}
          </p>
          {currentReel.caption && currentReel.caption.length > 80 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCaptionExpanded(!captionExpanded);
              }}
              className="text-white/60 hover:text-white font-medium text-[12px] mt-0.5"
            >
              {captionExpanded ? 'show less' : '...more'}
            </button>
          )}
        </div>

        {/* Audio Ticker */}
        <div className="flex items-center gap-2 text-white/80 text-[12px] mt-1 overflow-hidden">
          <Music2 size={13} className="flex-shrink-0 animate-pulse text-[#E34400]" />
          <div className="truncate whitespace-nowrap font-geist">
            {currentReel.audio || 'Original audio - Siddarth'}
          </div>
        </div>
      </div>

      {/* Video Progress Bar */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-30">
        <div 
          className="h-full bg-[#E34400] transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Comments Slide-Over Panel */}
      {showComments && (
        <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom-10 duration-200">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <span className="font-geist text-sm font-bold text-white tracking-wide">Comments</span>
            <button 
              onClick={() => setShowComments(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
            >
              <X size={16} />
            </button>
          </div>

          {/* Comment List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {commentsList.map((comm) => (
              <div key={comm.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-xs text-white font-bold flex-shrink-0">
                  {comm.user.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-geist text-xs font-bold text-white">@{comm.user}</span>
                    <span className="text-[10px] text-white/40">{comm.time}</span>
                  </div>
                  <p className="font-geist text-xs text-white/90 mt-0.5">{comm.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* New Comment Input */}
          <form onSubmit={handleAddComment} className="p-3 border-t border-white/10 bg-black/60 flex items-center gap-2">
            <input
              type="text"
              placeholder="Add a comment for Siddarth..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E34400]"
            />
            <button 
              type="submit" 
              disabled={!commentText.trim()}
              className="w-8 h-8 rounded-full bg-[#E34400] disabled:opacity-40 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

const ReelViewerModal = ({ reels = [], activeIndex = 0, isOpen = false, onClose, onIndexChange }) => {
  const currentReel = reels[activeIndex] || reels[0];

  const goToPrev = () => {
    if (activeIndex > 0) {
      onIndexChange(activeIndex - 1);
    } else {
      onIndexChange(reels.length - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex < reels.length - 1) {
      onIndexChange(activeIndex + 1);
    } else {
      onIndexChange(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        goToPrev();
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen || reels.length === 0 || !currentReel) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-6 overflow-hidden">   
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-40 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        title="Close (Esc)"
      >
        <X size={20} />
      </button>

      {/* Vertical Navigation Arrows (Desktop) */}
      <div className="hidden lg:flex flex-col gap-4 absolute right-10 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={goToPrev}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
          title="Previous Reel (Up Arrow)"
        >
          <ChevronUp size={24} />
        </button>
        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
          title="Next Reel (Down Arrow)"
        >
          <ChevronDown size={24} />
        </button>
      </div>

      {/* Keyed Player Content: State re-initializes cleanly per reel */}
      <ReelPlayerContent
        key={currentReel._id || activeIndex}
        currentReel={currentReel}
      />

    </div>
  );
};

export default ReelViewerModal;
