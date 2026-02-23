import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public/images');
    const files = fs.readdirSync(imagesDir);
    
    // Filter for image files only (not logo or venmo-qr)
    const heroImages = files.filter(file => {
      const isImage = /\.(jpg|jpeg|png|webp)$/i.test(file);
      const isNotLogo = !file.includes('logo');
      const isNotVenmo = !file.includes('venmo');
      return isImage && isNotLogo && isNotVenmo;
    });

    // Shuffle randomly
    const shuffled = heroImages.sort(() => Math.random() - 0.5);
    
    // Pick 3 random images
    const selected = shuffled.slice(0, 3).map(file => `/images/${file}`);

    return NextResponse.json({ images: selected });
  } catch (error) {
    return NextResponse.json({ images: [] });
  }
}
