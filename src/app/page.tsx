'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* =====================================================
   EDIT YOUR LINKS AND INFO HERE
   ===================================================== */
const config = {
  name: "Unity K9 Express Rescue & Outreach",
  location: "Bakersfield, California",
  tagline: "Saving dogs from euthanasia in Kern County",
  description: "We are an all-volunteer rescue dedicated to pulling dogs from high-kill shelters and placing them in loving foster homes until they find their forever families.",
  email: "unityrescue@gmail.com",
  
  // Update these links as needed
  links: {
    foster: "https://docs.google.com/forms/d/e/1FAIpQLSe2oDaj7shXfqAQOChu3BoSBAu6hnDIyx3avyIe9GtDv9Pzfw/viewform",
    transport: "https://docs.google.com/forms/d/e/1FAIpQLSfYfTVynvp7aQwTPvZZcGNOxuR6NMeJHU32V1PDKNu8a7X-oQ/viewform",
    amazon: "https://www.amazon.com/hz/wishlist/ls/1EIRWQ0LSIF27?ref_=wl_share",
    paypal: "https://www.paypal.com/US/fundraiser/charity/4559439",
    venmo: "@Unity-ExpressRescue",
    facebook: "https://www.facebook.com/unityrescue/",
    instagram: "https://www.instagram.com/unityk9expressrescue/",
  },

  // Fallback images if Google Drive isn't configured
  // Add your own images to public/images/ and list them here
  fallbackImages: [
    '/images/hero-1.jpg',
    '/images/hero-2.jpg',
    '/images/hero-3.jpg',
  ],
};

// Background Image Carousel Component
function HeroCarousel({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch images from Google Drive API
  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('/api/images');
        const data = await res.json();
        
        if (data.images && data.images.length > 0) {
          setImages(data.images.map((img: { url: string }) => img.url));
        } else {
          // Use fallback images
          setImages(config.fallbackImages);
        }
      } catch {
        setImages(config.fallbackImages);
      }
      setIsLoaded(true);
    }
    fetchImages();
  }, []);

  // Rotate images every 8 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {isLoaded && images.length > 0 && images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Background Carousel */}
      <HeroCarousel>
        <div className="max-w-5xl mx-auto px-6 py-20 text-center text-white">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/logo.png"
              alt={config.name}
              width={160}
              height={160}
              className="mx-auto bg-white rounded-full p-3 shadow-2xl"
              priority
            />
          </div>

          {/* Location */}
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            {config.location}
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Unity K9 Express Rescue
            <span className="block text-2xl md:text-3xl mt-2 text-white/90">
              & Outreach
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-light text-white/90 mb-4">
            {config.tagline}
          </p>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-white/70 leading-relaxed mb-12">
            {config.description}
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href={config.links.foster}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-white text-brand-dark font-semibold tracking-wide hover:bg-gray-100 transition-colors"
            >
              BECOME A FOSTER
            </Link>
            <Link
              href={config.links.transport}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 border-2 border-white text-white font-semibold tracking-wide hover:bg-white hover:text-brand-dark transition-colors"
            >
              BECOME A DRIVER
            </Link>
          </div>

          {/* Secondary Link */}
          <Link
            href={config.links.amazon}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white/80 hover:text-white border-b border-white/40 hover:border-white pb-1 transition-colors"
          >
            View Our Amazon Wishlist
          </Link>
        </div>
      </HeroCarousel>

      {/* Donate Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Support Our Mission
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            100% of your donation goes directly to saving dogs. We are entirely volunteer-run with no paid staff.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {/* PayPal */}
            <Link
              href={config.links.paypal}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-4 bg-brand-blue text-white font-semibold tracking-wide hover:bg-brand-dark transition-colors"
            >
              DONATE VIA PAYPAL
            </Link>

            {/* Venmo */}
            <div className="text-center">
              <Image
                src="/images/venmo-qr.png"
                alt="Venmo QR Code"
                width={140}
                height={140}
                className="mx-auto rounded-lg shadow-lg"
              />
              <p className="text-gray-600 text-sm mt-3">
                Venmo: <span className="font-medium text-gray-900">{config.links.venmo}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-light mb-2">2,000+</div>
              <div className="text-white/70 text-sm uppercase tracking-wider">Dogs Saved Yearly</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light mb-2">100%</div>
              <div className="text-white/70 text-sm uppercase tracking-wider">Volunteer Run</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light mb-2">2021</div>
              <div className="text-white/70 text-sm uppercase tracking-wider">Established</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light mb-2">Kern</div>
              <div className="text-white/70 text-sm uppercase tracking-wider">County Based</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Image
            src="/images/logo.png"
            alt={config.name}
            width={80}
            height={80}
            className="mx-auto mb-6 bg-white rounded-full p-2"
          />

          <h3 className="text-lg font-medium mb-2">{config.name}</h3>
          
          <a 
            href={`mailto:${config.email}`}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {config.email}
          </a>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <Link
              href={config.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors uppercase text-sm tracking-wider"
            >
              Facebook
            </Link>
            <Link
              href={config.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors uppercase text-sm tracking-wider"
            >
              Instagram
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {config.name}
            </p>
            <p className="text-gray-600 text-xs mt-2">
              501(c)(3) Nonprofit Organization · Bakersfield, CA
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
