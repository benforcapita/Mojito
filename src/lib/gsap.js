import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Export for use in components
export { gsap, ScrollTrigger, SplitText };

// Common animation configurations
export const animations = {
  fadeInUp: {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power2.out',
  },
  slideInLeft: {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
  },
  slideInRight: {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
  },
  scaleIn: {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
  },
};

// Scroll trigger defaults
export const scrollTriggerDefaults = {
  start: 'top center',
  toggleActions: 'play none none reverse',
};