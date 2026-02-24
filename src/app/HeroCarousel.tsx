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
    <section className="relative bg-[#0f2d4d]">
      
      {/* Image Container */}
      <div className="absolute inset-0">
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
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content - controls the height */}
      <div className="relative z-10 px-6 py-16 md:py-24 md:min-h-screen md:flex md:items-center">
        <div className="w-full">{children}</div>
      </div>

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
