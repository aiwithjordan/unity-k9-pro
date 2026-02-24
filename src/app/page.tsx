'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const config = {
  name: "Unity K9 Express Rescue & Outreach",
  location: "Bakersfield, California",
  tagline: "Saving dogs from euthanasia in Kern County",
  description: "We are an all-volunteer rescue dedicated to pulling dogs from high-kill shelters and placing them in loving foster homes until they find their forever families.",
  email: "unityrescue@gmail.com",
  
  links: {
    foster: "https://docs.google.com/forms/d/e/1FAIpQLSe2oDaj7shXfqAQOChu3BoSBAu6hnDIyx3avyIe9GtDv9Pzfw/viewform",
    transport: "https://docs.google.com/forms/d/e/1FAIpQLSfYfTVynvp7aQwTPvZZcGNOxuR6NMeJHU32V1PDKNu8a7X-oQ/viewform",
    amazon: "https://www.amazon.com/hz/wishlist/ls/1EIRWQ0LSIF27?ref_=wl_share",
    paypal: "https://www.paypal.com/US/fundraiser/charity/4559439",
    venmo: "@Unity-ExpressRescue",
    facebook: "https://www.facebook.com/unityrescue/",
    instagram: "https://www.instagram.com/unityk9expressrescue/",
  },

  heroImages: [
    '/images/hero1.jpg',
    '/images/hero2.jpg', 
    '/images/hero3.jpg',
  ],
};

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = config.heroImages;

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main>
      {/* Hero Section - Mobile First */}
      <section className="relative min-h-[100svh] flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0f2d4d]">
          {images.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === currentImage ? 'opacity-30' : 'opacity-0'
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
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${
                  i === currentImage ? 'bg-white w-6' : 'bg-white/40 w-1.5'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Donate Section */}
      <section className="bg-gray-50 px-5 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Support Our Mission
        </h2>
        <p className="text-gray-600 text-sm max-w-md mx-auto mb-8">
          100% of donations go directly to saving dogs. We are entirely volunteer-run.
        </p>

        <div className="flex flex-col items-center gap-8">
          <Link
            href={config.links.paypal}
            target="_blank"
            className="bg-[#1a4f8b] text-white font-bold py-3 px-10 text-sm uppercase tracking-wide"
          >
            Donate via PayPal
          </Link>

          <div>
            <Image
              src="/images/venmo-qr.png"
              alt="Venmo"
              width={120}
              height={120}
              className="mx-auto rounded-lg"
            />
            <p className="text-gray-600 text-sm mt-2">
              Venmo: <strong>{config.links.venmo}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0f2d4d] text-white px-5 py-12">
        <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto text-center">
          <div>
            <div className="text-3xl font-bold">2,000+</div>
            <div className="text-xs text-white/60 uppercase">Dogs Saved Yearly</div>
          </div>
          <div>
            <div className="text-3xl font-bold">100%</div>
            <div className="text-xs text-white/60 uppercase">Volunteer Run</div>
          </div>
          <div>
            <div className="text-3xl font-bold">2021</div>
            <div className="text-xs text-white/60 uppercase">Established</div>
          </div>
          <div>
            <div className="text-3xl font-bold">Kern</div>
            <div className="text-xs text-white/60 uppercase">County Based</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-5 py-12 text-center">
        <Image
          src="/images/logo.png"
          alt={config.name}
          width={60}
          height={60}
          className="mx-auto bg-white rounded-full p-1 mb-4"
        />
        <p className="font-bold mb-1">{config.name}</p>
        <a href={`mailto:${config.email}`} className="text-gray-400 text-sm">
          {config.email}
        </a>

        <div className="flex justify-center gap-6 mt-6">
          <Link href={config.links.facebook} target="_blank" className="text-gray-400 text-xs uppercase tracking-wider">
            Facebook
          </Link>
          <Link href={config.links.instagram} target="_blank" className="text-gray-400 text-xs uppercase tracking-wider">
            Instagram
          </Link>
        </div>

        <p className="text-gray-600 text-xs mt-8">
          © {new Date().getFullYear()} {config.name}
        </p>
      </footer>
    </main>
  );
}
