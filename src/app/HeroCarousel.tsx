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
    <>
      {/* MOBILE: Image above content */}
      <div className="md:hidden">
        {/* Image carousel */}
        <div className="relative h-64 bg-[#0f2d4d]">
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        {/* Content */}
        <div className="bg-[#0f2d4d] px-6 py-12">
          {children}
        </div>
      </div>

      {/* DESKTOP: Image behind content (original design) */}
      <section className="hidden md:block relative min-h-screen bg-[#0f2d4d]">
        <div className="absolute inset-0">
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full px-6 py-24">{children}</div>
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
