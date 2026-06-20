import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: 'AbaFans – Rwanda Football Match Day',
  description: 'Browse matches, predict results, discover venues and share with fellow fans.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="page-body">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
