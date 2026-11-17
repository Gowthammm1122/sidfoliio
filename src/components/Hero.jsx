import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import ScrollAnimateWrapper from "./ScrollAnimateWrapper";

// Assets
import hero1 from "../assets/hero/1.webp";
import hero2 from "../assets/hero/2.webp";
import hero3 from "../assets/hero/3.webp";
import hero4 from "../assets/hero/4.webp";
import letstalkWhiteIcon from "../assets/logos/letstalkwhite.png";

const Hero = () => {
  const portfolioImages = [hero1, hero3, hero2, hero4, hero1, hero3, hero2, hero4];

  return (
    <section className="relative w-full min-h-[110vh] bg-white pt-[140px] pb-20 flex flex-col items-center overflow-hidden">

      {/* --- DESIGNER TOUCH: Background Ambience --- */}
      {/* 1. Subtle Grid Pattern */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* 2. Glowing Gradient Orb behind text */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gray-100 to-transparent opacity-60 blur-[80px] rounded-full pointer-events-none z-0"></div>

      {/* --- Main Content --- */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* --- 1. Availability Badge (Pulsing) --- */}
        <ScrollAnimateWrapper animation="scroll-scale" threshold={0.1}>
          <div className="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full p-1 pr-5 inline-flex items-center gap-3 mb-10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#E34400] opacity-20"></span>
              <div className="bg-[#E34400] text-white px-4 py-1.5 rounded-full font-geist text-[14px] font-medium tracking-wide">
                Available
              </div>
            </div>
            <span className="text-[#555] font-geist text-[14px] font-medium">
              For Video Editing & Motion Designing
            </span>
          </div>
        </ScrollAnimateWrapper>


        {/* --- 2. Main Heading --- */}
        <ScrollAnimateWrapper animation="scroll-fade-up" threshold={0.1}>
          <div className="text-center max-w-5xl px-4 mb-8 mx-auto">
            <h1 className="font-geist text-[42px] md:text-[76px] font-semibold leading-[1.08] tracking-[-0.055em] text-[#0A0A0A]">
              <span className="text-[#888] font-normal">
                Video Editor &
              </span>{" "}
              Motion Designer
              <br className="hidden md:block" />
              <span className="relative inline-block">
                Creating
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-[#E34400] opacity-80"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              Visual Stories.
            </h1>
          </div>
        </ScrollAnimateWrapper>


        {/* --- 3. Subtext --- */}
        <ScrollAnimateWrapper animation="scroll-fade-up" threshold={0.1}>
          <div className="text-center max-w-xl px-4 mb-12">
            <p className="text-[#666] font-geist text-[18px] md:text-[20px] font-normal leading-[1.6] tracking-tight">
              Crafting compelling visuals through cinematic edits, engaging reels, and creative motion graphics.
            </p>
          </div>
        </ScrollAnimateWrapper>

        {/* --- 4. CTA Buttons --- */}
        <ScrollAnimateWrapper animation="scroll-fade-up" threshold={0.1}>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-24">
            {/* Explore Reels */}
            <a
              href="/reels"
              className="group h-[56px] px-8 bg-[#111] hover:bg-[#E34400] text-white rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="font-geist text-[16px] font-medium tracking-wide">Explore my works</span>
            </a>

            {/* Let's Talk */}
            <a
              href="https://wa.me/8903031101"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[56px] px-8 bg-white border border-gray-200 text-[#141414] rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <img src={letstalkWhiteIcon} alt="Let's Talk" className="w-5 h-5 invert opacity-80 mr-2" />
              <span className="font-geist text-[16px] font-medium tracking-wide">Let's Talk</span>
            </a>
          </div>
        </ScrollAnimateWrapper>
      </div>

      {/* --- 5. Designer Touch: Tilted Marquee Carousel --- */}
      {/* We rotate the container slightly to give it a modern, dynamic look */}
      <div className="w-full max-w-[100vw] relative z-10 rotate-[-2deg] scale-100 md:scale-105 origin-center translate-y-10 overflow-hidden">

        {/* Gradient Masks to fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          speed={3000} // Slower, smoother speed
          autoplay={{
            delay: 0, // Continuous flow
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          allowTouchMove={false}
          className="hero-swiper !ease-linear" // Ensure you add CSS for linear easing
        >
          {portfolioImages.map((src, index) => (
            <SwiperSlide key={index} style={{ width: '500px' }}>
              <div className="group relative w-[500px] h-[350px] flex-shrink-0 rounded-[24px] overflow-hidden border-[6px] border-white shadow-2xl">
                <img
                  src={src}
                  alt={`Project ${index + 1}`}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                {/* Inner Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;