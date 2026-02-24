import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import HeroSection from './HeroSection';

// Get all images at build time
function getAllImages() {
  const imagesDir = path.join(process.cwd(), 'public/images');

  // Fail safely if folder doesn't exist
  if (!fs.existsSync(imagesDir)) return [];

  const files = fs.readdirSync(imagesDir);

  return files
    .filter(file => {
      const isImage = /\.(jpg|jpeg|png|webp)$/i.test(file);
      const lower = file.toLowerCase();

      const isNotLogo = !lower.includes('logo');
      const isNotVenmo = !lower.includes('venmo');
      const isNotQr = !lower.includes('qr');

      return isImage && isNotLogo && isNotVenmo && isNotQr;
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
  const allImages = getAllImages();

  return (
    <main>
      <HeroSection images={allImages} config={config} />

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
        <div className="mx-auto mb-4 h-[72px] w-[72px] rounded-full bg-white p-1 overflow-hidden flex items-center justify-center">
          <img
            src="/images/logo.png"
            alt={config.name}
            className="w-[64px] h-[64px] object-contain block"
            draggable={false}
          />
        </div>

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
