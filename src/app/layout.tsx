import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unity K9 Express Rescue & Outreach | Bakersfield Dog Rescue',
  description: 'All-volunteer dog rescue in Bakersfield, CA saving 2,000+ animals annually from Kern County shelters. Become a foster or transport driver today.',
  icons: { icon: '/images/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
