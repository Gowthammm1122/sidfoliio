import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import profilePic from '../assets/profile/pfp.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const footerElement = document.querySelector('footer');
    if (footerElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsFooterVisible(entry.isIntersecting);
          });
        },
        { root: null, rootMargin: '0px', threshold: 0 }
      );

      observer.observe(footerElement);
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
      };
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Works', link: '#works' },
    { name: 'Reels', link: '/reels', isSpecial: true },
    { name: 'FAQ', link: '#faq' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (link.startsWith('/')) {
      navigate(link);
      return;
    }

    const targetId = link.replace('#', '');

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      } else if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { targetId } });
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* NAVBAR CONTAINER 
          - Changed 'w-full' to 'inset-x-0' (left-0 right-0) for better mobile stability.
          - REMOVED padding (px-5) from here.
      */}
      <div
        className={`fixed top-0 inset-x-0 z-50 py-3 transition-all duration-300 
        ${isFooterVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        ${isScrolled ? 'bg-white/90 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none shadow-sm md:shadow-none' : 'bg-transparent'}
        `}
      >
        {/* INNER CONTAINER
            - MOVED padding here (px-5 md:px-10).
            - This ensures the flex items stop exactly at the padding edge, keeping the hamburger inside.
        */}
        <div className="w-full max-w-[1360px] mx-auto px-5 md:px-10 h-[48px] relative flex items-center justify-between">

          {/* --- Left Section: Profile --- */}
          <div
            onClick={() => navigate('/')}
            className={`flex items-center gap-3 transition-all duration-300 cursor-pointer 
              ${isScrolled ? 'md:opacity-0 md:pointer-events-none' : 'opacity-100'}`}
          >
            <div className="w-10 h-10 bg-white rounded-lg overflow-hidden flex items-center justify-center shadow-[0px_15px_15px_-3.75px_rgba(0,0,0,0.06)] flex-shrink-0">
              <img
                src={profilePic}
                alt="Profile"
                className="w-[36px] h-[33px] rounded-md object-cover"
              />
            </div>
            <span className="font-geist text-[18px] text-[#0A0A0A] font-normal leading-[23.4px] whitespace-nowrap">
              Siddarth
            </span>
          </div>

          {/* --- Center Section: Desktop Navigation Links --- */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <div className="bg-white px-6 h-[40px] flex items-center gap-[30px] rounded-lg shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">
              {navLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className={`font-satoshi text-[16px] font-medium leading-[24px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                    item.isSpecial
                      ? 'text-[#E34400] font-semibold hover:text-black'
                      : 'text-[#121212] hover:text-[#E34400]'
                  }`}
                >
                  {item.name}
                  {item.isSpecial && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E34400] animate-pulse"></span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* --- Right Section: Wrapper --- */}
          <div className="flex items-center justify-end">

            {/* Desktop CTA Button */}
            <a
              href="mailto:siddarthgowtham7@gmail.com"
              className={`hidden md:flex bg-[#E34400] text-white h-[40px] px-6 rounded-[10px] shadow-[0px_3px_10px_rgba(0,0,0,0.20)] font-satoshi text-[16px] font-medium leading-[24px] hover:bg-orange-700 transition-all duration-300 items-center justify-center 
                ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              Contact me
            </a>

            {/* Mobile Hamburger Button */}
            {/* Added flex-shrink-0 to prevent squishing */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-[0px_2px_10px_rgba(0,0,0,0.05)] text-[#121212] active:scale-95 transition-transform flex-shrink-0 ml-auto"
              aria-label="Open Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">

          {/* Header - Matching Navbar Spacing exactly to prevent jumps */}
          <div className="w-full px-5 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
                <img src={profilePic} alt="Profile" className="w-[36px] h-[33px] rounded-md object-cover" />
              </div>
              <span className="font-geist text-[18px] font-medium text-[#0A0A0A]">Siddarth</span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#121212] active:scale-90 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Links Container - Scrollable */}
          <div className="flex flex-col gap-6 items-center flex-1 justify-center overflow-y-auto p-6">
            {navLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                className="font-geist text-[28px] font-medium text-[#0A0A0A] hover:text-[#E34400] transition-colors active:scale-95 duration-200 flex items-center gap-2"
              >
                {item.name}
                {item.isSpecial && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E34400]/10 text-[#E34400] font-bold uppercase tracking-wider">Reels</span>
                )}
              </a>
            ))}

            {/* Mobile Contact Button */}
            <a
              href="mailto:siddarthgowtham7@gmail.com"
              className="w-full bg-[#E34400] text-white h-[56px] rounded-[16px] font-satoshi text-[18px] font-medium flex items-center justify-center shadow-[0px_4px_14px_rgba(227,68,0,0.4)] active:scale-[0.98] transition-all flex-shrink-0 mt-4"
            >
              Contact me
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;