import { NextResponse } from 'next/server';

/**
 * API Route: Fetch images from a public Google Drive folder
 * Images are cached for 6 hours (21600 seconds)
 */

export async function GET() {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  // If not configured, return empty array
  if (!folderId || !apiKey) {
    return NextResponse.json({ 
      images: [],
      configured: false,
    });
  }

  try {
    const driveApiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image'&key=${apiKey}&fields=files(id,name)&orderBy=createdTime+desc&pageSize=20`;

    const response = await fetch(driveApiUrl, {
      next: { revalidate: 21600 } // Cache for 6 hours
    });

    if (!response.ok) {
      throw new Error('Google Drive API error');
    }

    const data = await response.json();
    
    const images = (data.files || []).map((file: { id: string; name: string }) => ({
      id: file.id,
      url: `https://drive.google.com/uc?export=view&id=${file.id}`,
    }));

    return NextResponse.json({ 
      images,
      configured: true,
    });

  } catch (error) {
    console.error('Google Drive fetch error:', error);
    return NextResponse.json({ 
      images: [],
      configured: true,
      error: true,
    });
  }
}
