
import React from 'react';
import { Quote } from 'lucide-react';
import ScrollAnimateWrapper from './ScrollAnimateWrapper';

import Dhina from '../assets/testimonial/dhinakar.png';
import Shanmugavel from '../assets/testimonial/shanmu.png';
import Siddharth from '../assets/testimonial/siddarth.png';
import Fazil from '../assets/testimonial/fazil.png';
import Featured from '../assets/testimonial/featured.png';
import Susa from '../assets/testimonial/susa.png';
import Priya from '../assets/testimonial/priya.png';

const Testimonials = () => {

  // --- TESTIMONIAL DATA ---

  const col1 = [
    {
      id: 1,
      quote:
        "Replace with a genuine review about the quality of video editing, creative storytelling, and the overall project experience.",
      name: "Client Name",
      role: "Brand / Business",
      avatar: Dhina,
    },
    {
      id: 2,
      quote:
        "Replace with genuine feedback about the creative approach, attention to detail, smooth communication, and editing quality.",
      name: "Client Name",
      role: "Content Creator",
      avatar: Shanmugavel,
    },
  ];

  const col2 = [
    {
      id: 3,
      type: "standard",
      quote:
        "Replace with feedback about the editing style, transitions, pacing, and how the final visuals brought their vision to life.",
      name: "Client Name",
      role: "Brand Collaborator",
      avatar: Siddharth,
    },
    {
      id: 4,
      type: "featured",
      quote:
        "Replace with an approved testimonial about a successful video campaign, creative direction, or the impact of the delivered content.",
      name: "Client Name",
      role: "Brand / Business",
      image: Featured,
      roleColor: "text-gray-400",
    },
    {
      id: 5,
      type: "standard",
      quote:
        "Replace with genuine feedback about motion graphics, visual details, and the professional quality of the final video.",
      name: "Client Name",
      role: "Creative Collaborator",
      avatar: Susa,
    },
  ];

  const col3 = [
    {
      id: 6,
      quote:
        "Replace with feedback about understanding a creative brief and transforming raw footage into engaging visual content.",
      name: "Client Name",
      role: "Business Owner",
      avatar: Priya,
    },
    {
      id: 7,
      quote:
        "Replace with feedback about delivery, turnaround time, and the overall quality of the finished project.",
      name: "Client Name",
      role: "Content Creator",
      avatar: Fazil,
    },
  ];

  const allTestimonials = [...col1, ...col2, ...col3];

  // --- COMPONENT: STANDARD TESTIMONIAL CARD ---

  const TestimonialCard = ({ data }) => (
    <div className="group w-full bg-white rounded-[24px] p-8 relative flex flex-col justify-between min-h-[320px] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Decorative Background Quote */}
      <Quote className="absolute top-6 right-8 text-gray-50 w-16 h-16 rotate-180 transform group-hover:scale-110 group-hover:text-gray-100 transition-all duration-500" />

      {/* Quote Text */}
      <div className="relative z-10 mt-4 mb-8">

        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="w-4 h-4 bg-[#E3C100] rounded-full opacity-80"
              style={{ transform: 'scale(0.6)' }}
            />
          ))}
        </div>

        <p className="font-geist text-[20px] font-medium text-[#111] leading-[1.5] tracking-tight">
          "{data.quote}"
        </p>
      </div>

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">

        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 ring-2 ring-white shadow-md">
          <img
            src={data.avatar}
            alt={data.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        </div>

        <div>
          <span className="block font-geist text-[15px] font-semibold text-[#0A0A0A] leading-tight">
            {data.name}
          </span>

          <span className="block font-geist text-[13px] font-medium text-gray-400 leading-tight mt-0.5">
            {data.role}
          </span>
        </div>

      </div>
    </div>
  );

  // --- COMPONENT: FEATURED TESTIMONIAL CARD ---

  const FeaturedCard = ({ data }) => (
    <div className="group w-full bg-[#111] rounded-[24px] p-2 overflow-hidden shadow-2xl relative flex flex-col min-h-[480px] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-shadow duration-500">

      {/* Image Window */}
      <div className="relative w-full h-[240px] rounded-[20px] overflow-hidden mb-6">

        <img
          src={data.image}
          alt="Featured video project"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80"></div>

        {/* Floating Tag */}
        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
          <span className="text-[12px] font-medium text-white tracking-wide">
            Featured Project
          </span>
        </div>

      </div>

      {/* Content */}
      <div className="px-6 pb-8 flex flex-col flex-1 justify-between relative z-10">

        <div className="mb-6">

          {/* Star Rating */}
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className="w-4 h-4 bg-[#E3C100] rounded-full"
                style={{ transform: 'scale(0.6)' }}
              />
            ))}
          </div>

          <p className="font-geist text-[22px] font-medium text-white leading-[1.4] tracking-tight">
            "{data.quote}"
          </p>

        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 border-t border-white/10 pt-6">

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-white font-bold text-sm">
            {data.name.charAt(0)}
          </div>

          <div>
            <span className="block font-geist text-[15px] font-semibold text-white leading-tight">
              {data.name}
            </span>

            <span className="block font-geist text-[13px] font-medium text-gray-500 leading-tight mt-0.5">
              {data.role}
            </span>
          </div>

        </div>
      </div>
    </div>
  );

  // --- MAIN SECTION ---

  return (
    <section className="relative w-full bg-[#FAFAFA] pb-[120px] md:pb-[200px] pt-[0px] md:pt-[0px] flex flex-col items-center overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      {/* Section Header */}
      <div className="relative z-10 max-w-2xl text-center px-6 mb-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-gray-200 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>

          <span className="font-geist text-[13px] font-medium text-gray-600 uppercase tracking-wide">
            Client Experiences
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-geist text-[40px] md:text-[52px] font-semibold text-[#0A0A0A] leading-[1.1] tracking-tight">
          Good work speaks <br />
          <span className="text-gray-400">for itself.</span>
        </h2>

      </div>

      {/* Testimonials Container */}
      <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-8 xl:px-0">

        {/* --- MOBILE / TABLET (<1024px) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">

          {allTestimonials.map((item) => (
            <ScrollAnimateWrapper
              key={`mob-${item.id}`}
              animation="scroll-fade-up"
            >
              {item.type === 'featured'
                ? <FeaturedCard data={item} />
                : <TestimonialCard data={item} />
              }
            </ScrollAnimateWrapper>
          ))}

        </div>

        {/* --- DESKTOP (3 COLUMN MASONRY LAYOUT) --- */}
        <div className="hidden lg:grid grid-cols-3 gap-6 items-center">

          {/* Column 1 */}
          <div className="flex flex-col gap-6">

            {col1.map((item, i) => (
              <ScrollAnimateWrapper
                key={item.id}
                animation="scroll-fade-up"
                delay={i * 0.1}
              >
                <TestimonialCard data={item} />
              </ScrollAnimateWrapper>
            ))}

          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">

            {col2.map((item, i) => (
              <ScrollAnimateWrapper
                key={item.id}
                animation="scroll-fade-up"
                delay={0.2 + (i * 0.1)}
              >
                {item.type === 'featured'
                  ? <FeaturedCard data={item} />
                  : <TestimonialCard data={item} />
                }
              </ScrollAnimateWrapper>
            ))}

          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">

            {col3.map((item, i) => (
              <ScrollAnimateWrapper
                key={item.id}
                animation="scroll-fade-up"
                delay={0.1 + (i * 0.1)}
              >
                <TestimonialCard data={item} />
              </ScrollAnimateWrapper>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
