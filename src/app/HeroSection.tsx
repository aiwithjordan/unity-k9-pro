'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Pick 3 random images based on date (changes daily)
function getDailyImages(allImages: string[], count: number = 3) {
  if (allImages.length <= count) return allImages;
  
  // Use today's date as seed
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Simple seeded shuffle
  const shuffled = [...allImages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((Math.sin(seed + i) * 10000) % (i + 1));
    const k = j < 0 ? -j : j;
    [shuffled[i], shuffled[k % (i + 1)]] = [shuffled[k % (i + 1)], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
}

interface Props {
  images: string[];
  config: {
    name: string;
    location: string;
    tagline: string;
    description: string;
    links: {
      foster: string;
      transport: string;
      amazon: string;
    };
  };
}

export default function HeroSection({ images, config }: Props) {
  const [dailyImages, setDailyImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDailyImages(getDailyImages(images, 3));
  }, [images]);

  useEffect(() => {
    if (dailyImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dailyImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [dailyImages.length]);

  return (
    <section className="relative min-h-[100svh] flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0f2d4d]">
        {dailyImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentIndex ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 py-10 text-center text-white">
        <Image
          src="/images/logo.png"
          alt={config.name}
          width={140}
          height={140}
          className="mx-auto bg-white rounded-full p-3 mb-6"
          priority
        />

        <p className="text-xs uppercase tracking-widest text-white/70 mb-2">
          {config.location}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          Unity K9 Express Rescue
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-4">& Outreach</p>

        <p className="text-base sm:text-lg font-medium mb-3">{config.tagline}</p>

        <p className="text-sm text-white/70 max-w-md mx-auto mb-8">
          {config.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Link
            href={config.links.foster}
            target="_blank"
            className="bg-white text-[#0f2d4d] font-bold py-3 px-8 text-sm uppercase tracking-wide"
          >
            Become a Foster
          </Link>
          <Link
            href={config.links.transport}
            target="_blank"
            className="border-2 border-white text-white font-bold py-3 px-8 text-sm uppercase tracking-wide"
          >
            Become a Driver
          </Link>
        </div>

        <Link
          href={config.links.amazon}
          target="_blank"
          className="text-white/70 text-sm underline"
        >
          View Amazon Wishlist
        </Link>
      </div>

      {/* Image dots */}
      {dailyImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {dailyImages.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex ? 'bg-white w-6' : 'bg-white/40 w-1.5'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
