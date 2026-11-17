import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrollAnimateWrapper from './ScrollAnimateWrapper';

const Footer = () => {
  // We need custom CSS keyframes for a smooth infinite marquee animation.
  // Injecting it here keeps the component self-contained.
  const marqueeCss = `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: fit-content;
      animation: marquee 30s linear infinite;
    }
  `;

  const marqueeText = "SIDDARTH ✧ VIDEO EDITOR ✧ MOTION DESIGNER ✧ COLORIST ✧ ";

  return (
    <>
      <style>{marqueeCss}</style>
      <footer className="w-full relative overflow-hidden bg-[#E64500] pt-32 md:pt-48 min-h-screen flex flex-col justify-between">

        {/* --- Designer Touch: Background Ambience --- */}
        {/* --- Designer Touch: Background Ambience --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(37deg,#E64500_31%,#FA5914_80%)]"></div>
          <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-400 rounded-full mix-blend-screen blur-[120px] opacity-60 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-500 rounded-full mix-blend-screen blur-[150px] opacity-40"></div>
        </div>

        {/* --- Main Content Container --- */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 w-full h-full flex flex-col flex-grow">

          {/* 1. Top Section: CTA and Navigation */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-auto">

            {/* Left: CTA Text & Buttons */}
            <div className="max-w-2xl">
              <ScrollAnimateWrapper animation="scroll-fade-up">
                <h2 className="font-geist text-[56px] md:text-[80px] font-semibold text-white leading-[0.95] mb-8 tracking-tighter">
                  Ready to create <br />
                  <span className="text-white/50">with purpose?</span>
                </h2>

                <p className="font-geist text-[20px] font-medium text-white/80 leading-[1.6] mb-12 max-w-lg">
                  If you’re looking for a video editing partner who understands rhythm, retention, and cinematic pacing, let’s start the conversation.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <a
                    href="https://wa.me/8903031101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group h-[64px] px-8 bg-white rounded-full flex items-center gap-4 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white group-hover:rotate-[-45deg] transition-transform duration-300">
                      <ArrowUpRight size={18} />
                    </div>
                    <span className="font-geist text-[18px] font-bold text-[#0A0A0A]">
                      Let's Talk
                    </span>
                  </a>

                  <a
                    href="mailto:Siddarth10228@gmail.com"
                    className="group h-[64px] px-8 bg-black/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
                  >
                    <span className="font-geist text-[18px] font-medium text-white group-hover:text-black">
                      Email Me
                    </span>
                  </a>
                </div>
              </ScrollAnimateWrapper>
            </div>

            {/* Right: Navigation Links */}
            <div className="flex gap-20 md:gap-32 mt-10 lg:mt-0">
              <div className="flex flex-col gap-4">
                <span className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2">Menu</span>
                {[
                  { name: 'Home', href: '/#home' },
                  { name: 'my works', href: '/reels' },
                  { name: 'About', href: '/#about' },
                ].map((item) => (
                  <a key={item.name} href={item.href} className="font-geist text-[18px] font-medium text-white hover:text-black transition-colors">
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2">Socials</span>
                <a href="https://www.instagram.com/http.sidarth/" className="font-geist text-[18px] font-medium text-white hover:text-black transition-colors">Instagram</a>
                <a href="https://www.linkedin.com/in/siddarth-a-sid/" target="_blank" rel="noopener noreferrer" className="font-geist text-[18px] font-medium text-white hover:text-black transition-colors">Linkedin</a>
              </div>
            </div>
          </div>

        </div>

        {/* --- Bottom Section: The Scrolling Marquee Footer --- */}
        <div className="relative w-full overflow-hidden mt-20 pt-24 pb-4">

          {/* The Scrolling Container */}
          <div className="animate-marquee whitespace-nowrap opacity-20 select-none pointer-events-none will-change-transform">
            {/* Original Text Block */}
            {/* Adjusted text size from 19vw to 15vw so the longer phrase fits better */}
            <span className="font-geist font-bold text-white text-[15vw] md:text-[12vw] leading-[0.75] tracking-tighter translate-y-4 scale-y-[1.5] origin-bottom px-8">
              {marqueeText}
            </span>
            {/* Duplicate Text Block for seamless looping */}
            <span className="font-geist font-bold text-white text-[15vw] md:text-[12vw] leading-[0.75] tracking-tighter translate-y-4 scale-y-[1.5] origin-bottom px-8">
              {marqueeText}
            </span>
          </div>

          {/* Floating Copyright Bar (Stays on top of marquee) */}
          <div className="absolute bottom-8 left-0 w-full px-6 md:px-10 flex justify-between items-end z-20">
            <p className="font-geist text-[14px] text-white/60">
              © 2025 All rights reserved.
            </p>
          </div>

        </div>

      </footer>
    </>
  )
}

export default Footer;