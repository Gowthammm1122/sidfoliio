import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const ScrollAnimateWrapper = ({ 
  children, 
  animation = 'scroll-fade-up', 
  threshold = 0.1,
  className = '' 
}) => {
  const elementRef = useScrollAnimation(threshold)

  return (
    <div ref={elementRef} className={`${animation} ${className}`}>
      {children}
    </div>
  )
}

export default ScrollAnimateWrapper
