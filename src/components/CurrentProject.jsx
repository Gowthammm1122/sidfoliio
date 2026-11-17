import React from 'react';
import { ArrowUpRight } from 'lucide-react'; // Make sure to install lucide-react
import hero1 from "../assets/hero/1.webp";
import hero2 from "../assets/hero/2.webp";
import hero3 from "../assets/hero/3.webp";

const CurrentProject = () => {
  const projects = [
    {
      id: 1,
      status: "Completed",
      statusColor: "bg-green-400",
      title: "Podcast",
      description: "A high-octane commercial cut for Nike athletic wear. Pacing, beat-sync sound design, and custom kinetic typography transitions crafted in Premiere Pro & After Effects.",
      tags: ["Commercial Cut"],
      link: "/reels",
      images: [hero1, hero3, hero2, hero1, hero2, hero3, hero1, hero3]
    },
  ];

  return (
    <section className="w-full bg-white pt-[150px] pb-20 flex flex-col items-center overflow-hidden">

      {/* --- Header Section (Editorial Style) --- */}
      <div className="relative z-10 flex flex-col items-center gap-6 mb-24 px-4 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-full px-4 py-1.5 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E34400] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E34400]"></span>
          </span>
          <span className="font-geist text-[13px] font-medium text-gray-600 uppercase tracking-wide">
            Active Video Projects
          </span>
        </div>

        <h2 className="font-geist text-[32px] md:text-[56px] font-semibold text-[#0A0A0A] leading-[1.1] tracking-tight">
          Crafting <span className="text-gray-400 italic font-medium">visual stories</span><br />
          that stop the scroll.
        </h2>
      </div>

      {/* --- Projects Container --- */}
      <div className="w-full max-w-[1200px] flex flex-col gap-20 px-4 md:px-0">

        {projects.map((project) => (
          <div key={project.id} className="group relative w-full h-[600px] md:h-[700px] bg-[#F2F2F2] rounded-[32px] overflow-hidden border border-gray-100 shadow-2xl flex items-center justify-center">

            {/* --- 1. Dynamic Background (Angled Marquee) --- */}
            {/* We rotate the entire background container to give it that 'Awwwards' tilt */}
            {/* --- 1. Dynamic Background (Angled Marquee) --- */}
            {/* We rotate the entire background container to give it that 'Awwwards' tilt */}
            <div className="absolute inset-0 overflow-hidden rounded-[32px] scale-[1.2] rotate-[-3deg] opacity-40 group-hover:opacity-20 group-hover:scale-[1.25] transition-all duration-700 ease-out pointer-events-none grayscale-[30%]">

              {/* Gradient Overlay for Vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F2F2F2] via-transparent to-[#F2F2F2] z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F2F2F2] via-transparent to-[#F2F2F2] z-10" />

              {/* Row 1: Left Scroll */}
              <div className="flex gap-6 w-max animate-scroll mb-6">
                {[...project.images, ...project.images].map((src, i) => (
                  <img key={i} src={src} alt="bg" className="w-[400px] h-[260px] rounded-[12px] object-cover shadow-lg" />
                ))}
              </div>

              {/* Row 2: Right Scroll */}
              <div className="flex gap-6 w-max animate-scroll-reverse">
                {[...project.images, ...project.images].map((src, i) => (
                  <img key={i} src={src} alt="bg" className="w-[400px] h-[260px] rounded-[12px] object-cover shadow-lg" />
                ))}
              </div>
            </div>

            {/* --- 2. Texture Overlay (Noise) --- */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0"></div>

            {/* --- 3. Glassmorphism Card (The Focus) --- */}
            <div className="relative z-20 w-[90%] md:w-[480px] bg-white/80 backdrop-blur-xl border border-white/40 rounded-[28px] p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.15)] transition-shadow duration-500">

              {/* Header: Status + Tags */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full border border-gray-100">
                  <div className={`w-2 h-2 rounded-full ${project.statusColor} shadow-[0_0_8px_rgba(0,0,0,0.2)]`} />
                  <span className="font-geist text-[13px] font-medium text-gray-600 uppercase tracking-wider">
                    {project.status}
                  </span>
                </div>
                {/* Tech Tags */}
                <div className="flex gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="hidden md:inline-block text-[12px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-geist text-[36px] font-semibold text-[#0A0A0A] leading-[1.1] mb-4 tracking-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-geist text-[17px] text-[#666] leading-[1.6] mb-8">
                {project.description}
              </p>

              {/* Button */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn w-full h-[56px] bg-[#0A0A0A] text-white rounded-[16px] flex items-center justify-between px-6 hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-geist text-[16px] font-medium">
                  View Project
                </span>
                <div className="bg-white/20 p-2 rounded-full group-hover/btn:bg-white group-hover/btn:text-black transition-colors duration-300">
                  <ArrowUpRight size={18} />
                </div>
              </a>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}

export default CurrentProject