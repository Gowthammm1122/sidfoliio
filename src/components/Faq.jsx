
import React, { useState } from 'react';
import ScrollAnimateWrapper from './ScrollAnimateWrapper';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What kind of videos do you edit?",
      answer: "I work on a range of creative projects, including Instagram Reels, YouTube videos, promotional content, brand campaigns, cinematic edits, and motion graphics."
    },
    {
      question: "How long does a typical edit take?",
      answer: "Turnaround time depends on the project's length, complexity, and creative requirements. Short-form videos usually take less time, while larger projects require additional editing and refinement."
    },
    {
      question: "What do I need to provide to get started?",
      answer: "Just share your raw footage, creative references, and an idea of what you're looking for. If you have a script, brand assets, or music preferences, those can help shape the final edit."
    },
    {
      question: "Can I request revisions?",
      answer: "Absolutely. Feedback is an important part of the creative process. We can refine the edit based on your feedback and discuss revision requirements before starting the project."
    },
    {
      question: "Which platforms do you create content for?",
      answer: "I create platform-ready videos for Instagram, YouTube, TikTok, and other digital platforms, with formats and aspect ratios tailored to your publishing needs."
    },
    {
      question: "How does pricing and payment work?",
      answer: "Pricing depends on the scope, duration, and complexity of each project. Once the requirements are discussed, I'll share a clear quote and payment terms before getting started."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full bg-[#FAFAFA] py-[150px] md:py-[200px] flex justify-center">

      {/* Container */}
      <div className="w-full max-w-[1120px] px-6 md:px-0 flex flex-col md:flex-row gap-16 md:gap-24 items-start">

        {/* --- Left Column (Sticky Header) --- */}
        <div className="w-full md:w-1/2 h-fit md:sticky md:top-32 flex flex-col items-start">
          <ScrollAnimateWrapper animation="scroll-fade-up">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-[#E34400]/20 bg-[#E34400]/5 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#E34400]"></span>
              <span className="font-geist text-[14px] font-medium text-[#E34400] uppercase tracking-wide">
                FAQs
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-geist text-[42px] md:text-[56px] font-semibold text-[#0A0A0A] leading-[1.05] tracking-tight">
              Things you <br />
              might want <br />
              <span className="text-gray-300">& to know.</span>
            </h2>

          </ScrollAnimateWrapper>
        </div>

        {/* --- Right Column (Accordion List) --- */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollAnimateWrapper key={index} animation="scroll-fade-left" delay={index * 0.1}>
                <div
                  onClick={() => toggleFaq(index)}
                  className={`
                    group w-full bg-white rounded-[24px] p-8 cursor-pointer transition-all duration-300 border
                    ${isOpen
                      ? 'border-[#E34400]/20 shadow-lg'
                      : 'border-transparent hover:border-gray-200 shadow-sm'}
                  `}
                >

                  {/* Header Row */}
                  <div className="flex justify-between items-start gap-6">
                    <h3 className={`font-geist text-[20px] font-medium leading-[1.3] transition-colors duration-300 ${
                      isOpen
                        ? 'text-[#E34400]'
                        : 'text-[#0A0A0A] group-hover:text-[#333]'
                    }`}>
                      {faq.question}
                    </h3>

                    {/* Animated Icon */}
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${isOpen
                        ? 'bg-[#E34400] text-white rotate-45'
                        : 'bg-gray-50 text-black group-hover:bg-gray-100'}
                    `}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </div>

                  {/* Answer Body */}
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-geist text-[17px] font-normal text-[#666] leading-[1.7]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>
              </ScrollAnimateWrapper>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Faq;
