'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuHouse, LuCalendar, LuMapPin, LuTrophy, LuUser } from 'react-icons/lu';

const NAV_ITEMS = [
  { href: '/',            icon: LuHouse,     label: 'Home' },
  { href: '/matches',     icon: LuCalendar, label: 'Matches' },
  { href: '/venues',      icon: LuMapPin,   label: 'Venues' },
  { href: '/leaderboard', icon: LuTrophy,   label: 'Ranks' },
  { href: '/profile',     icon: LuUser,     label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || (href !== '/' && pathname.startsWith(href));
        return (
          <Link key={href} href={href} className={`bottom-nav-item${active ? ' active' : ''}`}>
            <Icon size={20} />
            <span className="bottom-nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
