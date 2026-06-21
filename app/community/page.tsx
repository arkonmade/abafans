import type { Metadata } from 'next';
import Link from 'next/link';
import { LuMessageSquare, LuUsers, LuFlame, LuPin, LuMegaphone } from 'react-icons/lu';
import { communityRooms, matchesList, venuesList, teamsMap } from '@/lib/data';
import { brandInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Community – Football Discussions',
  description: 'Join match discussions, coordinate watch parties, and talk football with fans across Rwanda on AbaFans.',
  alternates: { canonical: `${brandInfo.siteUrl}/community` },
};

const ROOM_TYPE_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  match:        { bg: 'rgba(255,77,79,0.1)',   color: 'var(--brand-red)', label: 'Match' },
  venue:        { bg: 'rgba(59,130,246,0.1)',  color: 'var(--info)',      label: 'Venue' },
  team:         { bg: 'rgba(139,92,246,0.1)',  color: 'var(--purple)',    label: 'Team' },
  competition:  { bg: 'rgba(245,158,11,0.1)', color: 'var(--warning)',   label: 'Cup' },
  general:      { bg: 'rgba(34,197,94,0.1)',  color: 'var(--success)',   label: 'General' },
  support:      { bg: 'rgba(139,92,246,0.1)', color: 'var(--purple)',    label: 'Support' },
  announcement: { bg: 'rgba(245,158,11,0.1)', color: 'var(--warning)',   label: 'News' },
};

export default function CommunityPage() {
  const matchRooms    = communityRooms.filter(r => r.type === 'match');
  const venueRooms    = communityRooms.filter(r => r.type === 'venue');
  const permanentRooms= communityRooms.filter(r => r.isPermanent);

  const Section = ({ title, icon, rooms }: { title: string; icon: React.ReactNode; rooms: typeof communityRooms }) => (
    rooms.length > 0 ? (
      <section style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          {icon} {title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {rooms.map(room => {
            const style = ROOM_TYPE_STYLE[room.type] ?? ROOM_TYPE_STYLE.general;
            return (
              <Link key={room.id} href={`/community/${room.slug}`} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.9rem 1rem',
                background: 'var(--primary)', borderRadius: 'var(--radius)',
                boxShadow: '0 0 0 1px var(--border)',
                transition: 'var(--transition)',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: style.bg, flexShrink: 0 }}>
                  <span style={{ fontSize: '1.1rem' }}>
                    {room.type === 'match' ? '⚽' : room.type === 'venue' ? '📍' : room.type === 'general' ? '💬' : room.type === 'support' ? '🛟' : '📢'}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {room.name}
                    </span>
                    {!room.isPermanent && (
                      <span style={{ fontSize: '9px', background: style.bg, color: style.color, padding: '1px 5px', borderRadius: '999px', fontWeight: 700, flexShrink: 0 }}>
                        24H
                      </span>
                    )}
                    {room.pinnedMessageId && <LuPin size={10} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <LuMessageSquare size={10} /> {room.messageCount}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <LuUsers size={10} /> {room.activeUsers} active
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: '1.2rem', flexShrink: 0 }}>›</div>
              </Link>
            );
          })}
        </div>
      </section>
    ) : null
  );

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ padding: '1.25rem 0' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Community</h1>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Football discussions, match rooms &amp; watch party coordination</p>
          </div>

          {/* Live activity banner */}
          <div style={{ background: 'linear-gradient(135deg,#1a0000,#2d0000)', border: '1px solid var(--brand-red)', borderRadius: 'var(--radius-lg)', padding: '0.9rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LuFlame size={20} color="var(--brand-red)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                {communityRooms.reduce((s, r) => s + r.activeUsers, 0)} fans discussing right now
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                {matchRooms.length} live match rooms · {venueRooms.length} venue rooms
              </div>
            </div>
          </div>

          <Section title="🔴 Live Match Rooms" icon={null} rooms={matchRooms} />
          <Section title="📍 Venue Rooms" icon={null} rooms={venueRooms} />
          <Section title="📌 Permanent Channels" icon={null} rooms={permanentRooms} />
        </div>
      </div>
    </div>
  );
}
