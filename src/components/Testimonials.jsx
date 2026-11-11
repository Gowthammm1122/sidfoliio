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
  // --- DATA ---
 const col1 = [
  {
    id: 1,
    quote:
      "He picked up our product in a single call and turned a rough idea into a clear, conversion-focused site that actually brings us leads.",
    name: "Dhinakar S.",
    role: "Design Lead - Square",
    avatar: Dhina,
  },
  {
    id: 2,
    quote:
      "Super fast, thoughtful, and easy to work with. The new dashboard feels clean, intuitive, and my team adopted it immediately.",
    name: "Shanmugavel.",
    role: "Founder of VelzX",
    avatar: Shanmugavel,
  },
];

const col2 = [
  {
    id: 3,
    type: "standard",
    quote:
      "Communication was smooth from day one, and the final design felt completely on-brand without us needing endless revisions.",
    name: "Siddharth.",
    role: "Visual Artist - PingUS",
    avatar: Siddharth,
  },
  {
    id: 4,
    type: "featured",
    quote:
      "Within a few weeks of the redesign, we saw about a 40% lift in sign‑ups. The work was sharp, reliable, and way above expectations.",
    name: "Shanmugavel.",
    role: "Founder of Shadivi",
    image: Featured,
    roleColor: "text-gray-400",
  },
  {
    id: 5,
    type: "standard",
    quote:
      "Easily the best design partner we’ve worked with. He understands the brief quickly and just ‘gets’ what we’re trying to build.",
    name: "Sudharsan",
    role: "Senior Software Engineer - Square",
    avatar: Susa,
  },
];

const col3 = [
  {
    id: 6,
    quote:
      "The attention to detail is incredible. The micro-interactions and animations make the site feel polished and alive without being over the top.",
    name: "Priya.",
    role: "Manager - k.S.Muthu Constructions",
    avatar: Priya,
  },
  {
    id: 7,
    quote:
      "Delivered ahead of schedule and better than we had in mind. Clear communication, no drama, and a result we’re proud to show clients.",
    name: "Fazil.",
    role: "Senior Software Engineer - Square",
    avatar: Fazil,
  },
];

const allTestimonials = [...col1, ...col2, ...col3];

  // --- COMPONENT: Standard Card ---
  const TestimonialCard = ({ data }) => (
    <div className="group w-full bg-white rounded-[24px] p-8 relative flex flex-col justify-between min-h-[320px] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Decorative Background Quote */}
      <Quote className="absolute top-6 right-8 text-gray-50 w-16 h-16 rotate-180 transform group-hover:scale-110 group-hover:text-gray-100 transition-all duration-500" />

      {/* Quote Text */}
      <div className="relative z-10 mt-4 mb-8">
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 bg-[#E3C100] rounded-full opacity-80" style={{ transform: 'scale(0.6)' }} />)}
        </div>
        <p className="font-geist text-[20px] font-medium text-[#111] leading-[1.5] tracking-tight">
          "{data.quote}"
        </p>
      </div>

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 ring-2 ring-white shadow-md">
          <img src={data.avatar} alt={data.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
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

  // --- COMPONENT: Featured Card (Dark) ---
  const FeaturedCard = ({ data }) => (
    <div className="group w-full bg-[#111] rounded-[24px] p-2 overflow-hidden shadow-2xl relative flex flex-col min-h-[480px] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-shadow duration-500">

      {/* Image Window */}
      <div className="relative w-full h-[240px] rounded-[20px] overflow-hidden mb-6">
        <img src={data.image} alt="Project" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80"></div>

        {/* Floating Tag */}
        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
          <span className="text-[12px] font-medium text-white tracking-wide">Featured Client</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8 flex flex-col flex-1 justify-between relative z-10">
        <div className="mb-6">
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 bg-[#E3C100] rounded-full" style={{ transform: 'scale(0.6)' }} />)}
          </div>
          <p className="font-geist text-[22px] font-medium text-white leading-[1.4] tracking-tight">
            "{data.quote}"
          </p>
        </div>

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

  return (
    <section className="relative w-full bg-[#FAFAFA] pb-[120px] md:pb-[200px] pt-[0px] md:pt-[0px] flex flex-col items-center overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      {/* Section Header */}
      <div className="relative z-10 max-w-2xl text-center px-6 mb-20">
        <div className="inline-flex items-center gap-2 border border-gray-200 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="font-geist text-[13px] font-medium text-gray-600 uppercase tracking-wide">
            Wall of Love
          </span>
        </div>
        <h2 className="font-geist text-[40px] md:text-[52px] font-semibold text-[#0A0A0A] leading-[1.1] tracking-tight">
          Trusted by founders <br /> & product teams.
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-8 xl:px-0">

        {/* --- MOBILE/TABLET (<1024px) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
          {allTestimonials.map((item) => (
            <ScrollAnimateWrapper key={`mob-${item.id}`} animation="scroll-fade-up">
              {item.type === 'featured' ? <FeaturedCard data={item} /> : <TestimonialCard data={item} />}
            </ScrollAnimateWrapper>
          ))}
        </div>

        {/* --- DESKTOP (Aligned Center) --- */}
        {/* CHANGED: items-start -> items-center */}
        <div className="hidden lg:grid grid-cols-3 gap-6 items-center">

          {/* Column 1 (2 Cards) - Automatically centered vertically */}
          <div className="flex flex-col gap-6">
            {col1.map((item, i) => (
              <ScrollAnimateWrapper key={item.id} animation="scroll-fade-up" delay={i * 0.1}>
                <TestimonialCard data={item} />
              </ScrollAnimateWrapper>
            ))}
          </div>

          {/* Column 2 (3 Cards) - Defines the height of the grid */}
          {/* REMOVED: pt-16 (No longer needed for alignment) */}
          <div className="flex flex-col gap-6">
            {col2.map((item, i) => (
              <ScrollAnimateWrapper key={item.id} animation="scroll-fade-up" delay={0.2 + (i * 0.1)}>
                {item.type === 'featured' ? <FeaturedCard data={item} /> : <TestimonialCard data={item} />}
              </ScrollAnimateWrapper>
            ))}
          </div>

          {/* Column 3 (2 Cards) - Automatically centered vertically */}
          <div className="flex flex-col gap-6">
            {col3.map((item, i) => (
              <ScrollAnimateWrapper key={item.id} animation="scroll-fade-up" delay={0.1 + (i * 0.1)}>
                <TestimonialCard data={item} />
              </ScrollAnimateWrapper>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Testimonials;