'use client';

import { useState, useEffect } from 'react';

export default function HeroCarousel({ 
  images, 
  children 
}: { 
  images: string[]; 
  children: React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen md:min-h-screen flex flex-col bg-[#0f2d4d]">
      
      {/* Image Container - fixed aspect ratio on mobile */}
      <div className="absolute inset-0 md:block">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={src} 
              alt="" 
              className="w-full h-full object-cover object-top"
            />
          </div>
        ))}
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center py-20">
        <div className="w-full">{children}</div>
      </div>

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
