import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import HeroCarousel from './HeroCarousel';

// Get images at build time
function getHeroImages() {
  const imagesDir = path.join(process.cwd(), 'public/images');
  const files = fs.readdirSync(imagesDir);
  
  return files
    .filter(file => {
      const isImage = /\.(jpg|jpeg|png|webp)$/i.test(file);
      const isNotLogo = !file.toLowerCase().includes('logo');
      const isNotVenmo = !file.toLowerCase().includes('venmo');
      return isImage && isNotLogo && isNotVenmo;
    })
    .map(file => `/images/${encodeURIComponent(file)}`);
}

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
};

export default function Home() {
  const heroImages = getHeroImages();

  return (
    <main className="min-h-screen">
      <HeroCarousel images={heroImages}>
        <div className="max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <div className="mb-10">
            <Image
              src="/images/logo.png"
              alt={config.name}
              width={180}
              height={180}
              className="mx-auto bg-white rounded-full p-4 shadow-2xl"
              priority
            />
          </div>

          <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-4 font-medium">
            {config.location}
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
            Unity K9 Express Rescue
            <span className="block text-2xl md:text-4xl mt-3 font-light text-white/90">
              & Outreach
            </span>
          </h1>

          <p className="text-2xl md:text-3xl font-medium text-white mb-6 drop-shadow-md">
            {config.tagline}
          </p>

          <p className="max-w-2xl mx-auto text-white/90 text-lg leading-relaxed mb-14 drop-shadow">
            {config.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href={config.links.foster}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 bg-white text-gray-900 text-lg font-bold tracking-wide hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              BECOME A FOSTER
            </Link>
            <Link
              href={config.links.transport}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 border-2 border-white text-white text-lg font-bold tracking-wide hover:bg-white hover:text-gray-900 transition-all"
            >
              BECOME A DRIVER
            </Link>
          </div>

          <Link
            href={config.links.amazon}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white/80 hover:text-white border-b border-white/40 hover:border-white pb-1 transition-all text-lg"
          >
            View Our Amazon Wishlist
          </Link>
        </div>
      </HeroCarousel>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Support Our Mission
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-12">
            100% of your donation goes directly to saving dogs. We are entirely volunteer-run with no paid staff.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <Link
              href={config.links.paypal}
              target="_blank"
              rel="noopener noreferrer"
              className="px-14 py-5 bg-[#1a4f8b] text-white text-lg font-bold tracking-wide hover:bg-[#0f2d4d] transition-all shadow-lg hover:shadow-xl"
            >
              DONATE VIA PAYPAL
            </Link>

            <div className="text-center">
              <Image
                src="/images/venmo-qr.png"
                alt="Venmo QR Code"
                width={160}
                height={160}
                className="mx-auto rounded-xl shadow-lg"
              />
              <p className="text-gray-600 mt-4">
                Venmo: <span className="font-bold text-gray-900">{config.links.venmo}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f2d4d] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-3">2,000+</div>
              <div className="text-white/60 uppercase tracking-wider text-sm">Dogs Saved Yearly</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-3">100%</div>
              <div className="text-white/60 uppercase tracking-wider text-sm">Volunteer Run</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-3">2021</div>
              <div className="text-white/60 uppercase tracking-wider text-sm">Established</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-3">Kern</div>
              <div className="text-white/60 uppercase tracking-wider text-sm">County Based</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Image
            src="/images/logo.png"
            alt={config.name}
            width={90}
            height={90}
            className="mx-auto mb-6 bg-white rounded-full p-2"
          />

          <h3 className="text-xl font-bold mb-3">{config.name}</h3>
          
          <a 
            href={`mailto:${config.email}`}
            className="text-gray-400 hover:text-white transition-colors text-lg"
          >
            {config.email}
          </a>

          <div className="flex items-center justify-center gap-10 mt-10">
            <Link
              href={config.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors uppercase text-sm tracking-widest font-medium"
            >
              Facebook
            </Link>
            <Link
              href={config.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors uppercase text-sm tracking-widest font-medium"
            >
              Instagram
            </Link>
          </div>

          <div className="mt-16 pt-10 border-t border-gray-800">
            <p className="text-gray-500">
              © {new Date().getFullYear()} {config.name}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              501(c)(3) Nonprofit Organization · Bakersfield, CA
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
