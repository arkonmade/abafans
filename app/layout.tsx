import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import { defaultMetadata } from '@/lib/metadata';
import { orgJsonLd, websiteJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  ...defaultMetadata,
  themeColor: undefined,  // moved to viewport
};

export const viewport: Viewport = {
  themeColor: '#ff4d4f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AbaFans" />
        <meta name="msapplication-TileColor" content="#ff4d4f" />
        <meta name="format-detection" content="telephone=no" />
        <Script id="jsonld-org"     type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
        <Script id="jsonld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      </head>
      <body>
        <Header />
        <main className="page-body" id="main-content">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
