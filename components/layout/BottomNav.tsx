'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuHouse, LuCalendar, LuMapPin, LuTrophy, LuMessageSquare } from 'react-icons/lu';

const NAV_ITEMS = [
  { href: '/',            icon: LuHouse,         label: 'Home' },
  { href: '/matches',     icon: LuCalendar,      label: 'Matches' },
  { href: '/venues',      icon: LuMapPin,        label: 'Venues' },
  { href: '/leaderboard', icon: LuTrophy,        label: 'Ranks' },
  { href: '/community',   icon: LuMessageSquare, label: 'Chat' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || (href !== '/' && pathname.startsWith(href));
        return (
          <Link key={href} href={href} className={`bottom-nav-item${active ? ' active' : ''}`} aria-label={label} aria-current={active ? 'page' : undefined}>
            <Icon size={20} />
            <span className="bottom-nav-label">{label}</span>
            {label === 'Chat' && (
              <span style={{ position: 'absolute', top: 10, right: '50%', transform: 'translateX(8px)', width: 7, height: 7, background: 'var(--brand-red)', borderRadius: '50%', border: '1.5px solid var(--black)' }} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
