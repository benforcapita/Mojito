import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '../lib/gsap';
import { openingHours, socials, contactInfo } from '../constants';
import { Leaf, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Music } from 'lucide-react';

const Contact = () => {
  const titleRef = useRef(null);
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);

  useGSAP(() => {
    const titleSplit = new SplitText(titleRef.current, { type: 'words' });
    
    gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top center',
        ease: 'power1.inOut',
      }
    })
    .from(titleSplit.words, {
      opacity: 0,
      yPercent: 100,
      stagger: 0.02,
      duration: 0.8,
    })
    .from(['.contact h3', '.contact p'], {
      opacity: 0,
      yPercent: 100,
      stagger: 0.05,
      duration: 0.6,
    })
    .to(rightLeafRef.current, {
      y: -50,
      duration: 1,
      ease: 'power1.inOut',
    }, '<')
    .to(leftLeafRef.current, {
      y: 50,
      duration: 1,
      ease: 'power1.inOut',
    }, '<');
  }, []);

  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'instagram': return <Instagram className="w-6 h-6" />;
      case 'facebook': return <Facebook className="w-6 h-6" />;
      case 'twitter': return <Twitter className="w-6 h-6" />;
      case 'music': return <Music className="w-6 h-6" />;
      default: return <Instagram className="w-6 h-6" />;
    }
  };

  return (
    <footer id="contact" className="py-32 bg-gradient-to-t from-black to-gray-900 relative overflow-hidden">
      {/* Background leaves */}
      <div 
        ref={leftLeafRef}
        id="F-left-leaf"
        className="absolute bottom-20 left-10 w-32 h-32 opacity-10"
      >
        <Leaf className="w-full h-full text-primary-400 transform rotate-12" />
      </div>
      
      <div 
        ref={rightLeafRef}
        id="F-right-leaf"
        className="absolute bottom-32 right-10 w-40 h-40 opacity-10"
      >
        <Leaf className="w-full h-full text-secondary-400 transform -rotate-45" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl font-black text-center mb-20 text-gradient"
          >
            where to find us
          </h2>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {/* Address */}
            <div className="contact space-y-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-8 h-8 text-primary-400" />
                <h3 className="text-2xl font-bold text-white">Visit Us</h3>
              </div>
              <div className="space-y-2 text-white/80">
                <p>{contactInfo.address.street}</p>
                <p>{contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="contact space-y-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-8 h-8 text-secondary-400" />
                <h3 className="text-2xl font-bold text-white">Contact</h3>
              </div>
              <div className="space-y-2 text-white/80">
                <p>{contactInfo.phone}</p>
                <p>{contactInfo.email}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="contact space-y-6 md:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-accent-400" />
                <h3 className="text-2xl font-bold text-white">Hours</h3>
              </div>
              <div className="space-y-2 text-white/80">
                {openingHours.map((day, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{day.day}</span>
                    <span>{day.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                >
                  <div className="text-white group-hover:text-primary-400 transition-colors">
                    {getSocialIcon(social.icon)}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-20 pt-8 border-t border-white/10 text-center">
            <p className="text-white/60">
              © 2024 Mojito Cocktails. All rights reserved. Crafted with passion.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;