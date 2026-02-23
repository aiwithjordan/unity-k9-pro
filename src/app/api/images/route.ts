import { NextResponse } from 'next/server';

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getTimeSeed() {
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  return Math.floor(Date.now() / threeDaysMs);
}

function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET() {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  if (!folderId || !apiKey) {
    return NextResponse.json({ images: [], configured: false });
  }

  try {
    const driveApiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image'&key=${apiKey}&fields=files(id,name)&pageSize=50`;

    const response = await fetch(driveApiUrl, {
      next: { revalidate: 259200 }
    });

    if (!response.ok) throw new Error('API error');

    const data = await response.json();
    const allFiles = data.files || [];
    
    if (allFiles.length === 0) {
      return NextResponse.json({ images: [], configured: true });
    }

    const seed = getTimeSeed();
    const shuffled = shuffleWithSeed(allFiles, seed);
    const selected = shuffled.slice(0, 3);
    
    const images = selected.map((file: { id: string; name: string }) => ({
      id: file.id,
      url: `https://drive.google.com/uc?export=view&id=${file.id}`,
    }));

    return NextResponse.json({ images, configured: true });
  } catch (error) {
    return NextResponse.json({ images: [], error: true });
  }
}
