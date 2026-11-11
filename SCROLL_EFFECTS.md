# Scroll Effects Documentation

This project now includes Lenis smooth scrolling and custom scroll animations.

## Features Implemented

### 1. Lenis Smooth Scroll
- Buttery smooth scrolling throughout the entire site
- Configured with optimized easing and duration
- Automatically initialized in App.jsx

### 2. Scroll Animations
Six different animation types available:
- `scroll-fade-up` - Fades in while moving up
- `scroll-fade-left` - Fades in from the left
- `scroll-fade-right` - Fades in from the right
- `scroll-scale` - Scales up from 80% to 100%
- `scroll-blur` - Fades in with blur effect
- `scroll-animate` - Basic fade-up animation

### 3. Components Created
- `ScrollAnimateWrapper` - Easy-to-use wrapper for scroll animations
- `ParallaxSection` - Parallax scrolling effect
- `useLenis` - Custom hook for Lenis integration
- `useScrollAnimation` - Custom hook for scroll-triggered animations

## Usage Examples

### Basic Scroll Animation
```jsx
import ScrollAnimateWrapper from './ScrollAnimateWrapper';

<ScrollAnimateWrapper animation="scroll-fade-up" threshold={0.2}>
  <div className="your-content">
    This will fade up when scrolled into view
  </div>
</ScrollAnimateWrapper>
```

### Different Animation Types
```jsx
// Fade from left
<ScrollAnimateWrapper animation="scroll-fade-left">
  <YourComponent />
</ScrollAnimateWrapper>

// Scale effect
<ScrollAnimateWrapper animation="scroll-scale" threshold={0.1}>
  <YourComponent />
</ScrollAnimateWrapper>

// Blur effect
<ScrollAnimateWrapper animation="scroll-blur">
  <YourComponent />
</ScrollAnimateWrapper>
```

### Parallax Effect
```jsx
import ParallaxSection from './ParallaxSection';

<ParallaxSection speed={0.5}>
  <img src="your-image.png" alt="Parallax" />
</ParallaxSection>
```

### Custom Stagger Animations
Add the `scroll-animate` class to child elements for automatic stagger delays:
```jsx
<div>
  <div className="scroll-animate">Item 1 (0s delay)</div>
  <div className="scroll-animate">Item 2 (0.1s delay)</div>
  <div className="scroll-animate">Item 3 (0.2s delay)</div>
</div>
```

## Configuration

### Threshold
The `threshold` prop controls when the animation triggers:
- `0.1` = Triggers when 10% of element is visible (earlier)
- `0.5` = Triggers when 50% of element is visible (default)
- `1.0` = Triggers when 100% of element is visible (later)

### Lenis Settings
Edit `src/hooks/useLenis.js` to customize:
- `duration` - Scroll duration (default: 1.2)
- `easing` - Easing function
- `smoothWheel` - Enable/disable smooth scrolling

## Components Updated
- ✅ Hero.jsx - All sections animated
- ✅ About.jsx - Card animations
- ✅ Projects.jsx - Alternating left/right animations

## Performance
- Uses Intersection Observer API for efficient scroll detection
- CSS transforms for GPU-accelerated animations
- Will-change properties for optimal rendering
- No layout thrashing

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
