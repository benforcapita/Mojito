import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { useMediaQuery } from 'react-responsive';
import { featureLists } from '../constants';
import { Palette, Droplets, Sparkles } from 'lucide-react';

const Art = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#art',
        start: isMobile ? 'top 20%' : 'top top',
        end: 'bottom center',
        scrub: 1.5,
        pin: true,
      }
    })
    .to('.will-fade', {
      opacity: 0,
      stagger: 0.2,
      ease: 'power1.inOut',
    })
    .to('.masked-img', {
      scale: 1.3,
      duration: 1,
      ease: 'power1.inOut',
    })
    .to('#masked-content', {
      opacity: 1,
      duration: 1,
      ease: 'power1.inOut',
    });
  }, [isMobile]);

  return (
    <section id="art" className="min-h-screen bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Header Content - Will fade */}
          <div className="will-fade text-center mb-20">
            <div className="flex justify-center mb-6">
              <Palette className="w-12 h-12 text-primary-400" />
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-gradient mb-8">
              the art
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
              of crafting the perfect mojito
            </p>
          </div>

          {/* Features List - Will fade */}
          <div className="will-fade grid md:grid-cols-2 gap-8 mb-20">
            {featureLists.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
              >
                <div className="flex-shrink-0">
                  {index % 3 === 0 && <Droplets className="w-6 h-6 text-primary-400" />}
                  {index % 3 === 1 && <Sparkles className="w-6 h-6 text-secondary-400" />}
                  {index % 3 === 2 && <Palette className="w-6 h-6 text-accent-400" />}
                </div>
                <span className="text-lg text-white/90">{feature}</span>
              </div>
            ))}
          </div>

          {/* Main Image - Will scale and reveal content */}
          <div className="relative">
            <div className="masked-img relative aspect-video rounded-2xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="The art of mojito crafting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>

            {/* Hidden Content - Will appear */}
            <div 
              id="masked-content"
              className="absolute inset-0 flex-center text-center opacity-0"
            >
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl font-bold text-gradient">
                  Perfection in Every Drop
                </h3>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
                  Where tradition meets innovation, creating moments that linger in memory long after the last sip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Art;