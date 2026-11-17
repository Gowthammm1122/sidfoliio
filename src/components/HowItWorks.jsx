
import React from 'react';
import ScrollAnimateWrapper from './ScrollAnimateWrapper';
import Dhinakar from '../assets/testimonial/dhinakar.png';
import Fazil from '../assets/testimonial/fazil.png';
import Siddarth from '../assets/testimonial/siddarth.png';
import Susa from '../assets/testimonial/susa.png';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Share Your Vision",
      description: "Tell me about your ideas, footage, creative direction, and goals. We'll discuss the style and story you want to bring to life.",
      icon: (
        // Keep your original phone SVG here
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 21.402C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.92C16.7428 21.5857 13.787 20.5342 11.19 18.85C8.77382 17.2435 6.72159 15.1625 5.15001 12.71C3.50284 10.0538 2.48316 7.03969 2.18001 3.9C2.15516 3.61907 2.18915 3.33605 2.27977 3.06911C2.37039 2.80217 2.51556 2.55728 2.70588 2.35061C2.89619 2.14394 3.12726 1.98009 3.38392 1.86968C3.64057 1.75928 3.91696 1.70479 4.19501 1.71H7.29001C7.81577 1.70617 8.32289 1.90799 8.70783 2.27438C9.09277 2.64078 9.32833 3.1462 9.36601 3.68C9.43615 4.75704 9.69906 5.81571 10.14 6.81C10.26 7.07543 10.2861 7.37341 10.2146 7.65682C10.1432 7.94022 9.97825 8.19299 9.74601 8.375L8.47601 9.68C9.89709 12.2343 11.9754 14.3541 14.48 15.8L15.75 14.49C15.93 14.2541 16.1804 14.0864 16.4608 14.0135C16.7412 13.9406 17.0357 13.9666 17.298 14.087C18.2753 14.5292 19.3142 14.7924 20.371 14.863C20.9099 14.9023 21.419 15.1437 21.8028 15.535C22.1866 15.9263 22.4184 16.4402 22.448 16.98L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Plan the Edit",
      description: "Once we're aligned, I'll map out the creative direction, editing style, deliverables, and timeline to ensure everything is on the same page.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Edit & Create",
      description: "From precise cuts and seamless transitions to sound design, color grading, and motion graphics, every detail is crafted to make your story stand out.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Final Delivery",
      description: "Your finished video is delivered in high quality, optimized for your chosen platforms and ready to make an impact.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Ongoing Support",
      description: "Need tweaks or additional edits? I'm here to help with revisions and future creative projects to keep your content looking its best.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4217 14.0609 15 13 15H5C3.93913 15 2.92172 15.4217 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.01 6.11684 19.01 7.005C19.01 7.89316 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-[150px] md:py-[200px] flex justify-center">
      <div className="w-full max-w-[1200px] px-6 md:px-0 flex flex-col md:flex-row gap-16 md:gap-24 relative items-start">

        {/* Left Column */}
        <div className="w-full md:w-[40%] flex flex-col items-start md:sticky md:top-32 h-fit">
          <ScrollAnimateWrapper animation="scroll-fade-up">
            <div className="inline-flex items-center gap-2 border border-[#E34400]/20 bg-[#E34400]/5 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#E34400]"></span>
              <span className="font-geist text-[14px] font-medium text-[#E34400] uppercase tracking-wide">
                The Editing Process
              </span>
            </div>

            <h2 className="font-geist text-[42px] md:text-[52px] font-semibold text-[#0A0A0A] leading-[1.1] tracking-tight mb-8">
              From raw footage <br />
              to something <br />
              <span className="text-gray-400">remarkable.</span>
            </h2>

            <p className="font-geist text-[18px] text-[#666] leading-[1.6] max-w-[350px]">
              Every great video starts with an idea. A clear, collaborative process turns that idea into visuals worth watching.
            </p>
          </ScrollAnimateWrapper>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[60%] flex flex-col gap-8 relative">
          <div className="absolute left-[34px] top-10 bottom-10 w-[2px] border-l-2 border-dashed border-gray-200 hidden md:block z-0 pointer-events-none"></div>

          {steps.map((step, index) => (
            <ScrollAnimateWrapper key={step.id} animation="scroll-fade-left" delay={index * 0.1}>
              <div className="group relative w-full bg-white border border-transparent hover:border-gray-200 rounded-[32px] p-8 md:p-10 flex flex-col gap-6 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 z-10">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-[#FAFAFA] rounded-2xl flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#E34400] group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                  <span className="font-geist text-[40px] font-bold text-gray-100 group-hover:text-gray-200 transition-colors select-none">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-geist text-[24px] font-semibold text-[#0A0A0A] mb-3 leading-[1.2] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-geist text-[17px] text-[#666] leading-[1.6]">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollAnimateWrapper>
          ))}

          {/* Closing Statement */}
          <ScrollAnimateWrapper animation="scroll-fade-up" delay={0.2}>
            <div className="mt-12 p-8 md:p-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-4">
                  {[Dhinakar, Fazil, Siddarth, Susa].map((avatar, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-[3px] border-[#FAFAFA] overflow-hidden bg-gray-200 relative">
                      <img src={avatar} alt="Client" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#0A0A0A]">5+ Happy Clients</span>
                  <span className="text-sm text-gray-500">Creative collaborations</span>
                </div>
              </div>

              <p className="font-geist text-[28px] md:text-[32px] font-medium text-[#0A0A0A] leading-[1.2] tracking-tight">
                "Let's create something <br className="hidden md:block" />
                <span className="text-[#E34400]">worth watching.</span>"
              </p>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
