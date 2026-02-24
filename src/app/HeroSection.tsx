'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Pick 3 random images based on date (changes daily, stays the same all day)
function getDailyImages(allImages: string[], count: number = 3) {
  if (allImages.length <= count) return allImages;

  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  const shuffled = [...allImages];

  // Seeded shuffle (stable for the same date)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const raw = Math.floor((Math.sin(seed + i) * 10000) % (i + 1));
    const j = Math.abs(raw) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
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

  // Pick 3 images for the current day
  useEffect(() => {
    const selected = getDailyImages(images, 3);
    setDailyImages(selected);
    setCurrentIndex(0);
  }, [images]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (dailyImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dailyImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [dailyImages]);

  return (
    <section className="relative min-h-[100svh] flex flex-col bg-[#0f2d4d] overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0">
        {dailyImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Mobile: show full image (less cropping) */}
            <div className="h-full w-full sm:hidden">
              <img
                src={src}
                alt=""
                className="w-full h-full object-contain object-center opacity-35"
              />
            </div>

            {/* Tablet/Desktop: fill hero (cropping allowed) */}
            <div className="hidden sm:block h-full w-full">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover object-center opacity-30"
              />
            </div>
          </div>
        ))}

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-[#0f2d4d]/70 sm:bg-[#0f2d4d]/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 py-10 text-center text-white">
        {/* Logo wrapper helps hide edge artifacts */}
        <div className="mx-auto mb-6 h-[140px] w-[140px] rounded-full bg-white p-2 overflow-hidden flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt={config.name}
            width={124}
            height={124}
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        <p className="text-xs uppercase tracking-widest text-white/70 mb-2">
          {config.location}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          Unity K9 Express Rescue
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-4">& Outreach</p>

        <p className="text-base sm:text-lg font-medium mb-3">{config.tagline}</p>

        <p className="text-sm text-white/80 max-w-md mx-auto mb-8">
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
          className="text-white/80 text-sm underline"
        >
          View Amazon Wishlist
        </Link>
      </div>

      {/* Carousel dots */}
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
