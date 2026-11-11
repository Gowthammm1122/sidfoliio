import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import About from '../components/About'
import CurrentProject from '../components/CurrentProject'
import Projects from '../components/Projects'
import WhatDo from '../components/WhatDo'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'

const Home = () => {
  const location = useLocation();

  // Handle hash scrolling when component mounts or hash changes
  // Handle hash scrolling when component mounts or hash/state changes
  useEffect(() => {
    // Check for hash or state.targetId
    let targetId = location.hash ? location.hash.replace('#', '') : location.state?.targetId;
    if (targetId === 'projects') targetId = 'works';

    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId) || document.getElementById('works');
        if (element) {
          const offsetTop = element.offsetTop - 80; // Account for navbar height
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        } else if (targetId === 'home') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.hash, location.state]);

  return (
    <div>
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <CurrentProject />
      <div id="works">
        <Projects />
      </div>
      <WhatDo />
      <HowItWorks />
      <Testimonials />
      <div id="faq">
        <Faq />
      </div>
      <Footer />
    </div>
  )
}

export default Home