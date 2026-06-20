import Link from 'next/link';
import Image from 'next/image';
import { LuInstagram, LuFacebook, LuTwitter, LuYoutube } from 'react-icons/lu';
import { brandInfo, formatPhoneNumber } from '@/lib/data';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--primary)',
      borderTop: '1px solid var(--border)',
      padding: '3rem 0',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '2rem',
          alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/">
              <Image src="/icon.svg" alt="AbaFans" width={44} height={44} />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="fancy-spinner" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Say hello</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <Link href={`tel:+${brandInfo.phoneMain}`} style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>
                +{formatPhoneNumber(brandInfo.phoneMain)}
              </Link>
              <Link href={`mailto:${brandInfo.emailMain}`} style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>
                {brandInfo.emailMain}
              </Link>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              &copy; {new Date().getFullYear()} {brandInfo.name}. All rights reserved.
            </p>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              /@abafans
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { href: `https://instagram.com/${brandInfo.socials.instagram}`, icon: <LuInstagram /> },
                { href: `https://facebook.com/${brandInfo.socials.facebook}`, icon: <LuFacebook /> },
                { href: `https://x.com/${brandInfo.socials.x}`, icon: <LuTwitter /> },
                { href: `https://youtube.com/@${brandInfo.socials.youtube}`, icon: <LuYoutube /> },
              ].map(({ href, icon }) => (
                <Link key={href} href={href} target="_blank" style={{
                  padding: '0.55rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--black)',
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  transition: 'var(--transition)',
                }}>
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
