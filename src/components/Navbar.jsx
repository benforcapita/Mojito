import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { navLinks } from '../constants';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    const nav = navRef.current;
    
    gsap.timeline({
      scrollTrigger: {
        trigger: nav,
        start: 'bottom top',
        end: '+=100',
        scrub: true,
      }
    })
    .to(nav, {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      duration: 1,
      ease: 'power1.inOut',
    });
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav ref={navRef} className="nav">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">Mojito</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;