import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { cocktailLists, mocktailLists } from '../constants';
import { Leaf, Sparkles } from 'lucide-react';

const Cocktails = () => {
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#cocktails',
        start: 'top 30%',
        end: 'bottom 80%',
        scrub: true,
      }
    })
    .from(leftLeafRef.current, { x: -100, y: 100 })
    .from(rightLeafRef.current, { x: 100, y: 100 }, '<');
  }, []);

  return (
    <section id="cocktails" className="py-32 noisy relative bg-gradient-to-b from-black to-gray-900">
      {/* Background leaves */}
      <div 
        ref={leftLeafRef}
        id="C-left-leaf"
        className="absolute top-20 left-10 w-24 h-24 opacity-10"
      >
        <Leaf className="w-full h-full text-primary-400 transform rotate-12" />
      </div>
      
      <div 
        ref={rightLeafRef}
        id="C-right-leaf"
        className="absolute top-40 right-10 w-32 h-32 opacity-10"
      >
        <Leaf className="w-full h-full text-secondary-400 transform -rotate-45" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Most Popular Cocktails */}
          <div className="space-y-8">
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Most Popular
              </h2>
              <h3 className="text-2xl font-light text-white/80">Cocktails</h3>
            </div>
            
            <ul className="space-y-4">
              {cocktailLists.map((cocktail, index) => (
                <li 
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-white group-hover:text-gradient transition-all duration-300">
                      {cocktail}
                    </span>
                    <div className="w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Most Loved Mocktails */}
          <div className="space-y-8">
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-secondary-400 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Most Loved
              </h2>
              <h3 className="text-2xl font-light text-white/80">Mocktails</h3>
            </div>
            
            <ul className="space-y-4">
              {mocktailLists.map((mocktail, index) => (
                <li 
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-white group-hover:text-gradient transition-all duration-300">
                      {mocktail}
                    </span>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;