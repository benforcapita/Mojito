import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { menuItems } from '../constants';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentIndex((index + menuItems.length) % menuItems.length);
  };

  const getCocktailAt = (offset) => {
    const index = (currentIndex + offset + menuItems.length) % menuItems.length;
    return menuItems[index];
  };

  useGSAP(() => {
    gsap.fromTo('#title', 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.5 }
    );

    gsap.fromTo('.cocktail-image', 
      { opacity: 0, xPercent: -100 }, 
      { opacity: 1, xPercent: 0, duration: 1, ease: 'power1.inOut' }
    );

    gsap.fromTo('.details h2', 
      { yPercent: 100, opacity: 0 }, 
      { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power1.inOut' }
    );

    gsap.fromTo('.details p', 
      { yPercent: 100, opacity: 0 }, 
      { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power1.inOut', delay: 0.1 }
    );

    gsap.fromTo('.details .price', 
      { yPercent: 100, opacity: 0 }, 
      { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power1.inOut', delay: 0.2 }
    );
  }, [currentIndex]);

  const currentCocktail = getCocktailAt(0);

  return (
    <section id="menu" className="py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        {/* Hidden Title for Screen Readers */}
        <h2 className="sr-only">cocktail menu</h2>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div 
              id="title"
              className="inline-flex items-center space-x-3 mb-8"
            >
              <Star className="w-8 h-8 text-accent-400" />
              <span className="text-5xl md:text-6xl font-black text-gradient">Menu</span>
              <Star className="w-8 h-8 text-accent-400" />
            </div>
          </div>

          {/* Slider Content */}
          <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="cocktail-image relative">
              <div className="aspect-square rounded-3xl overflow-hidden relative group">
                <img 
                  src={currentCocktail.image}
                  alt={currentCocktail.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>

            {/* Details */}
            <div className="details space-y-8">
              <div className="overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-bold text-gradient">
                  {currentCocktail.name}
                </h2>
              </div>

              <div className="overflow-hidden">
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  {currentCocktail.description}
                </p>
              </div>

              <div className="overflow-hidden">
                <div className="price text-3xl md:text-4xl font-bold text-accent-400">
                  {currentCocktail.price}
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentCocktail.ingredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/90"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-8 mt-16">
            <button
              onClick={() => goToSlide(currentIndex - 1)}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex-center hover:bg-white/20 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-primary-400 transition-colors" />
            </button>

            {/* Dots */}
            <div className="flex space-x-3">
              {menuItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goToSlide(currentIndex + 1)}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex-center hover:bg-white/20 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-primary-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;