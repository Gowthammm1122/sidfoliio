import React from 'react';
import { ArrowRight } from 'lucide-react';
import uixd from '../assets/images/whatido/uiux.png';
import wd from '../assets/images/whatido/developer.png';
import ved from '../assets/images/whatido/videoeditor.png';
import ScrollAnimateWrapper from './ScrollAnimateWrapper';

const WhatDo = () => {
  const services = [
    {
      id: 1,
      title: "High-Retention Reels & Social Cuts",
      description: "I craft short-form social edits that hook viewers in the first 2 seconds with rapid pacing, kinetic captions, beat-sync sound design, and retention strategies.",
      image: ved,
      tags: ["Viral Hooks", "Dynamic Subtitles", "Beat-Sync Cuts", "Sound FX", "Retention Strategy", "9:16 Optimization"]
    },
    {
      id: 2,
      title: "Commercials & Brand Films",
      description: "Cinematic commercial editing that elevates products and tells a compelling brand narrative from the opening frame to the final call to action.",
      image: uixd,
      tags: ["Brand Films", "Commercial Pacing", "DaVinci Color Grade", "Multi-Cam Sync", "Audio Mastering", "4K Delivery"]
    },
    {
      id: 3,
      title: "Motion Graphics & 3D VFX",
      description: "Custom After Effects animation, kinetic typography, 3D product integration, and visual effects that give your content an unmistakable premium feel.",
      image: wd,
      tags: ["Kinetic Typography", "After Effects", "3D Animation", "Logo Reveals", "VFX Compositing", "Visual Identity"]
    }
  ];

  return (
    /* 1. REMOVED 'overflow-hidden' from here. It breaks sticky. */
    <section className="relative w-full bg-[#050505] py-[150px] md:py-[200px] flex justify-center">

      {/* Background Ambience Wrapper - CLIPS background elements without breaking sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#E3C100] opacity-[0.03] blur-[150px] rounded-full"></div>
      </div>

      {/* 3. ADDED 'items-start': Essential. 
         Without this, flexbox stretches the left column to the same height as the right, 
         leaving no room for it to "stick". */}
      <div className="relative z-10 w-full max-w-[1240px] px-6 md:px-10 flex flex-col md:flex-row gap-12 lg:gap-24 items-start">

        {/* --- Left Column (Sticky) --- */}
        {/* 4. CHECK: sticky, top-32, and h-fit */}
        <div className="w-full md:w-1/3 flex flex-col items-start md:sticky md:top-32 h-fit">

          <ScrollAnimateWrapper animation="scroll-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-[#E3C100]/30 bg-[#E3C100]/5 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#E3C100] animate-pulse"></span>
              <span className="font-geist text-[14px] font-medium text-[#E3C100] tracking-wide uppercase">
                What I Do
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-geist text-[36px] md:text-[52px] font-semibold text-white leading-[1.1] tracking-tighter mb-10 max-w-[450px]">
              Visual storytelling <br />
              <span className="text-gray-500">crafted to match</span> <br />
              your brand.
            </h2>

            {/* Button */}
            <a href="https://wa.me/9080638903" target="_blank" rel="noopener noreferrer" className="group h-[52px] bg-white pl-6 pr-2 rounded-full inline-flex items-center gap-4 hover:bg-[#E3C100] transition-colors duration-300">
              <span className="font-geist text-[16px] font-medium text-[#0A0A0A] leading-[19.2px]">
                Let's Talk
              </span>
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black text-white transition-all duration-300">
                <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-300" />
              </div>
            </a>
          </ScrollAnimateWrapper>
        </div>

        {/* --- Right Column (Scrollable Cards) --- */}
        <div className="w-full md:w-2/3 flex flex-col gap-8 md:gap-12">
          {services.map((service, index) => (
            <ScrollAnimateWrapper key={service.id} animation="scroll-fade-up" delay={index * 0.1}>
              <div className="group w-full bg-[#111] hover:bg-[#161616] border border-white/10 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row gap-8 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:-translate-y-2">

                {/* Card Image */}
                <div className="w-full md:w-[280px] h-[240px] md:h-auto flex-shrink-0 bg-[#0A0A0A] rounded-[20px] overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale-0 md:grayscale opacity-100 md:opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col justify-center py-2 flex-grow">
                  <h3 className="font-geist text-[28px] font-semibold text-white leading-[1.2] mb-4 tracking-tight group-hover:text-[#E3C100] transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-geist text-[15px] font-normal text-[#888] leading-[1.6] mb-8 group-hover:text-[#AAA] transition-colors">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-x-3 gap-y-3">
                    {service.tags.map((tag, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-3 py-1.5 group-hover:border-white/10 transition-colors">
                        <div className="w-1.5 h-1.5 bg-[#E3C100] rounded-full"></div>
                        <span className="font-geist text-[12px] font-medium text-[#CCC]">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhatDo;