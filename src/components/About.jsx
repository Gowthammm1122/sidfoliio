import React from 'react';
import ScrollAnimateWrapper from './ScrollAnimateWrapper';
// Import your profile image here
import profileAvatar from '../assets/profile/pfp.png';

const About = () => {
  // Data for the stats grid
  const stats = [
    {
      number: "3+",
      label: "years",
      description: "Video & Motion design"
    },
    {
      number: "50+",
      label: "projects",
      description: "Commercials, Reels, explainers, product edits and more"
    },
    {
      number: "20+",
      label: "happy clients",
      description: "Repeat clients, referrals and long-term partnerships"
    },
    {
      number: "100%",
      label: "commitment",
      description: "I own the process from the first pixel to the final edit."
    }
  ];

  return (
    <section className="w-full bg-[#F5F5F7] py-[120px] md:py-[200px] flex justify-center items-center relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[80vw] max-w-[500px] h-[500px] bg-gray-200/50 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-[1120px] px-4 md:px-0 flex flex-col md:flex-row gap-4 z-10">

        {/* --- Left Column: Premium Dark Card --- */}
        <ScrollAnimateWrapper animation="scroll-fade-right" threshold={0.2} className="w-full md:w-[392px]">
          <div className="group w-full h-auto md:h-[540px] bg-[#111] rounded-[32px] relative shadow-2xl overflow-hidden flex flex-col hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">

            {/* Texture & Lighting */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            {/* --- Content Wrapper --- */}
            <div className="p-8 relative z-10 flex flex-col h-full">

              {/* 1. Header: Image + Name (Side by Side) */}
              <div className="flex items-center gap-5 mb-8">

                {/* Profile Image (Square with Rounded Corners) */}
                <div className="w-[80px] h-[80px] shrink-0 rounded-[20px] border border-white/10 shadow-lg overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={profileAvatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle shine on image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                </div>

                {/* Name & Badge Block */}
                <div>
                  <div className="inline-block px-2 py-1 mb-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                    <span className="text-[10px] font-bold text-white/70 tracking-wider uppercase leading-none">The Editor & Colorist</span>
                  </div>
                  <h2 className="font-geist text-[28px] font-bold text-white leading-none tracking-tight">
                    Siddarth A.
                  </h2>
                </div>
              </div>

              {/* 2. Impactful Copy */}
              <div className="space-y-5 mb-8">
                <p className="font-geist text-[18px] font-medium text-white leading-[1.4]">
                  I bridge the gap between <span className="text-[#E34400]">rhythm</span>, <span className="text-[#E34400]">narrative</span>, and <span className="text-[#E34400]">motion</span>.
                </p>
                <p className="font-geist text-[16px] font-normal text-[#A1A1AA] leading-[1.6]">
                 I'm Sid, a visual creative working across video editing, motion graphics and AI-powered visual production. I bring ideas to life through thoughtful storytelling, distinctive visuals and cinematic experiences.
                </p>
              </div>

              {/* 3. Bottom Button (LinkedIn Redirect) */}
              <div className="mt-auto">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn w-full h-[56px] bg-white rounded-[20px] flex items-center justify-between px-6 hover:bg-[#0077B5] transition-colors duration-300"
                >
                  <span className="font-geist text-[16px] font-medium text-[#0A0A0A] group-hover/btn:text-white transition-colors">
                    Connect on LinkedIn
                  </span>
                  <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                    {/* LinkedIn Arrow Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </ScrollAnimateWrapper>

        {/* --- Right Column: Stats Grid --- */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[540px]">
          {stats.map((stat, index) => (
            <ScrollAnimateWrapper
              key={index}
              animation="scroll-fade-up"
              threshold={0.1}
              className="h-full"
            >
              <div className="group bg-white hover:bg-[#ffffff] rounded-[32px] p-8 flex flex-col justify-between h-[262px] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 border border-transparent hover:border-gray-200">

                {/* Header: Number + Label */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-geist text-[64px] font-semibold text-[#111] leading-[1] tracking-tighter group-hover:scale-105 group-hover:origin-left transition-transform duration-300">
                      {stat.number}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-[#E34400] transition-colors duration-300 mt-4"></div>
                  </div>
                  <span className="font-geist text-[16px] font-medium text-[#555] uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>

                {/* Description */}
                <div className="relative">
                  <div className="w-full h-[1px] bg-[#F0F0F0] mb-4 group-hover:w-full transition-all duration-500"></div>
                  <p className="font-geist text-[16px] font-normal text-[#666] leading-[1.5] group-hover:text-[#111] transition-colors">
                    {stat.description}
                  </p>
                </div>
              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>

      </div>
    </section>
  )
}

export default About;