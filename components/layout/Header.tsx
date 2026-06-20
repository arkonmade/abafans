'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuSearch, LuX, LuUser, LuSettings, LuLogOut, LuUsers, LuMessageSquareMore, LuFerrisWheel } from 'react-icons/lu';
import SearchModal from '@/components/ui/SearchModal';

export default function Header() {
  const [signedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 99999,
        background: 'var(--black)',
        borderBottom: '1px solid var(--secondary)',
        height: '4.5rem',
        display: 'flex', alignItems: 'center',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/icon.svg" alt="AbaFans" width={44} height={44} />
            </Link>

            {/* Desktop nav */}
            <nav style={{ display: 'none', alignItems: 'center', gap: '0.25rem' }} className="md-nav">
              {[
                { href: '/', label: 'Matches' },
                { href: '/venues', label: 'Venues' },
                { href: '/leaderboard', label: 'Leaderboard' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '13px', fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'var(--transition)',
                }}>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  width: '2.4rem', height: '2.4rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--radius)',
                  background: 'var(--primary)',
                  border: '1px solid var(--border)',
                  fontSize: '1.2rem', color: 'var(--text-secondary)',
                  transition: 'var(--transition)',
                }}
              >
                {searchOpen ? <LuX /> : <LuSearch />}
              </button>

              {signedIn ? (
                <Link href="/auth" style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0 1rem', height: '2.4rem',
                  background: 'var(--brand-red)', color: '#fff',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '13px', fontWeight: 600,
                }}>
                  <LuUser />
                  <span>Sign in</span>
                </Link>
              ) : (
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    width: '2.4rem', height: '2.4rem',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden', padding: '2px',
                    background: 'var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'var(--transition)',
                  }}
                >
                  <Image
                    src="https://i.pravatar.cc/150?img=23"
                    alt="Profile"
                    width={36} height={36}
                    style={{ borderRadius: '0.7rem', objectFit: 'cover' }}
                    unoptimized
                  />
                </button>
              )}

              {/* Profile dropdown */}
              {profileOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 0.7rem)', right: 0,
                  width: 220, background: 'var(--primary)',
                  borderRadius: 'var(--radius-lg) 0 var(--radius-lg) var(--radius-lg)',
                  boxShadow: '0 0 0 1px var(--border)',
                  padding: '0.75rem',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem',
                  zIndex: 999999,
                }}>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {[
                      { href: '/profile', icon: <LuUser />, label: 'View profile' },
                      { href: '/profile', icon: <LuSettings />, label: 'Settings' },
                      { href: '/', icon: <LuMessageSquareMore />, label: 'Contact us' },
                      { href: '/leaderboard', icon: <LuUsers />, label: 'Community' },
                    ].map(({ href, icon, label }) => (
                      <li key={label}>
                        <Link href={href} onClick={() => setProfileOpen(false)} style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.55rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '13px', color: 'var(--text-secondary)',
                          transition: 'var(--transition)',
                        }}>
                          {icon} {label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.55rem 0.75rem', width: '100%',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px', color: 'var(--brand-red)',
                        transition: 'var(--transition)',
                      }}>
                        <LuLogOut /> Logout
                      </button>
                    </li>
                  </ul>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
                    <Link href="/" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.75rem', fontSize: '12px', color: 'var(--text-muted)',
                      transition: 'var(--transition)',
                    }}>
                      <span>Find more</span> <LuFerrisWheel />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      <style>{`
        @media (min-width: 768px) {
          .md-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
