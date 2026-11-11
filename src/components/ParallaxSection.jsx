import React, { useRef, useEffect } from 'react'

const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const offsetTop = sectionRef.current.offsetTop
      const parallax = (scrolled - offsetTop) * speed
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        sectionRef.current.style.transform = `translateY(${parallax}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={sectionRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

export default ParallaxSection
