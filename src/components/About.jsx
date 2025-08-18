import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '../lib/gsap';

const About = () => {
  const titleRef = useRef(null);

  useGSAP(() => {
    const titleSplit = new SplitText(titleRef.current, { type: 'words' });
    
    gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
      }
    })
    .from(titleSplit.words, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.02,
    })
    .from(['.top-grid', '.bottom-grid'], {
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
      stagger: 0.04,
    }, '-=0.5');
  }, []);

  const images = [
    'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1264986/pexels-photo-1264986.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1796324/pexels-photo-1796324.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 
            ref={titleRef}
            className="text-6xl md:text-7xl font-black text-center mb-12 text-gradient leading-tight"
          >
            where every detail matters
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/80 text-center max-w-4xl mx-auto mb-20 leading-relaxed">
            Our passion for perfection extends beyond the glass. From the moment you step into our space, 
            every element has been carefully curated to create an unforgettable experience that engages all your senses.
          </p>

          {/* Image Grids */}
          <div className="space-y-8">
            {/* Top Grid */}
            <div className="top-grid grid grid-cols-2 md:grid-cols-3 gap-6">
              {images.slice(0, 3).map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden group relative"
                >
                  <img 
                    src={image}
                    alt={`About image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Bottom Grid */}
            <div className="bottom-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.slice(3, 5).map((image, index) => (
                <div 
                  key={index}
                  className="aspect-video rounded-2xl overflow-hidden group relative"
                >
                  <img 
                    src={image}
                    alt={`About image ${index + 4}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;