import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '../lib/gsap';
import { useMediaQuery } from 'react-responsive';
import { Leaf } from 'lucide-react';

const Hero = () => {
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(() => {
    // Title animation with SplitText
    const titleSplit = new SplitText(titleRef.current, { type: 'chars' });
    
    // Add text-gradient class to each character
    titleSplit.chars.forEach(char => {
      char.classList.add('text-gradient', 'char');
    });

    gsap.from(titleSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.006,
    });

    // Subtitle animation
    const subtitleSplit = new SplitText(subtitleRef.current, { type: 'lines' });
    
    gsap.from(subtitleSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1,
    });

    // Leaves parallax
    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
    .to(rightLeafRef.current, { y: 200, x: 0 })
    .to(leftLeafRef.current, { y: -200, x: 0 }, '<');

    // Video scroll control
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: video,
            start: isMobile ? 'top center' : 'top top',
            end: isMobile ? 'bottom center' : 'bottom top',
            scrub: true,
            pin: true,
            onUpdate: (self) => {
              video.currentTime = video.duration * self.progress;
            }
          }
        });
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [isMobile]);

  return (
    <section id="hero" className="min-h-screen noisy relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background leaves */}
      <div 
        ref={leftLeafRef}
        className="left-leaf absolute top-20 left-10 w-32 h-32 opacity-20"
      >
        <Leaf className="w-full h-full text-primary-400 transform rotate-45" />
      </div>
      
      <div 
        ref={rightLeafRef}
        className="right-leaf absolute top-32 right-10 w-40 h-40 opacity-20"
      >
        <Leaf className="w-full h-full text-secondary-400 transform -rotate-12" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 
            ref={titleRef}
            className="title text-8xl md:text-9xl font-black mb-8 leading-none"
          >
            Mojito
          </h1>

          {/* Subtitle */}
          <div ref={subtitleRef} className="subtitle space-y-4 text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            <p className="line">Experience the perfect blend of tradition and innovation</p>
            <p className="line">Where every sip tells a story of craftsmanship</p>
            <p className="line">Handcrafted cocktails that awaken your senses</p>
          </div>
        </div>

        {/* Video */}
        <div className="mt-20 relative">
          <video
            ref={videoRef}
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            muted
            playsInline
            preload="auto"
            poster="https://images.pexels.com/photos/1264986/pexels-photo-1264986.jpeg?auto=compress&cs=tinysrgb&w=1200"
          >
            <source src="/output.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;