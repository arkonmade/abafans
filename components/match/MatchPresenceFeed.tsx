import { LuMapPin, LuUsers } from 'react-icons/lu';
import type { CheckInSummary } from '@/types';

interface Props { checkIns: CheckInSummary[] }

export default function MatchPresenceFeed({ checkIns }: Props) {
  const total = checkIns.reduce((s, c) => s + c.count, 0);
  if (total === 0) return null;

  return (
    <section aria-label="Who's watching" style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1rem', boxShadow: '0 0 0 1px var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
          Who&apos;s Watching
        </p>
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <LuUsers size={11} /> {total} fans live
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {checkIns.map(ci => (
          <div key={ci.venueId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.6rem', background: 'var(--secondary)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', color: 'var(--text-secondary)' }}>
              <LuMapPin size={12} color="var(--brand-red)" /> {ci.venueName}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{ci.count} fans</span>
          </div>
        ))}
      </div>
    </section>
  );
}
