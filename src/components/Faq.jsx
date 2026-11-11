import React, { useState } from 'react';
import { Plus } from 'lucide-react'; // Standard library, or use the SVG below
import ScrollAnimateWrapper from './ScrollAnimateWrapper';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I get started?",
      answer: "Send a quick message or book a call so we can discuss your project and see if we're a good fit."
    },
    {
      question: "How long does a typical project take?",
      answer: "Simple landing pages usually take 1–2 weeks, while larger product or dashboard projects can take 3–6 weeks depending on the complexity."
    },
    {
      question: "What tools do you use for communication?",
      answer: "I typically use Figma for design reviews, Notion for project tracking, and Loom for async video updates. We can use Slack or Email for daily comms."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, most projects are split into milestones: typically a 50% deposit to book the slot, and the remaining 50% upon final handoff."
    },
    {
      question: "What if I need help after launch?",
      answer: "I offer 30 days of post‑launch support for bugs and small tweaks. For ongoing updates, we can discuss a monthly retainer."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full bg-[#FAFAFA] py-[150px] md:py-[200px] flex justify-center">
      
      {/* Container - Ensure items-start for sticky to work */}
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
              Common <br />
              questions <br />
              <span className="text-gray-300">& answers.</span>
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
                        ${isOpen ? 'border-[#E34400]/20 shadow-lg' : 'border-transparent hover:border-gray-200 shadow-sm'}
                    `}
                >
                    {/* Header Row */}
                    <div className="flex justify-between items-start gap-6">
                        <h3 className={`font-geist text-[20px] font-medium leading-[1.3] transition-colors duration-300 ${isOpen ? 'text-[#E34400]' : 'text-[#0A0A0A] group-hover:text-[#333]'}`}>
                            {faq.question}
                        </h3>
                        
                        {/* Animated Icon Wrapper */}
                        <div className={`
                            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            ${isOpen ? 'bg-[#E34400] text-white rotate-45' : 'bg-gray-50 text-black group-hover:bg-gray-100'}
                        `}>
                            {/* Simple Plus SVG */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </div>
                    </div>

                    {/* Answer Body (Animated) */}
                    <div 
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
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
  )
}

export default Faq;