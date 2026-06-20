import Link from 'next/link';
import Image from 'next/image';
import { LuMapPinned, LuTv, LuUsers, LuUtensils } from 'react-icons/lu';
import { venuesList, slugify } from '@/lib/data';

export default function VenuesPage() {
  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ padding: '1.5rem 0' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Venues</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Where to watch in Kigali</p>
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {venuesList.map(venue => (
              <Link key={venue.id} href={`/venues/${slugify(venue.name)}`} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--primary)', borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden', boxShadow: '0 0 0 1px var(--border)',
                  transition: 'var(--transition)',
                }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                    <Image src={venue.thumbnail} alt={venue.name} fill style={{ objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute', bottom: '0.75rem', left: '0.75rem',
                      background: 'var(--brand-red)', color: '#fff',
                      padding: '2px 8px', borderRadius: '999px',
                      fontSize: '11px', fontWeight: 700,
                    }}>
                      {venue.contact.entry} RWF entry
                    </div>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '0.4rem' }}>{venue.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <LuMapPinned size={12} /> {venue.place}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {venue.about}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '11px', color: 'var(--text-muted)' }}>
                        <LuTv size={12} /> {venue.screens} screens
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '11px', color: 'var(--text-muted)' }}>
                        <LuUsers size={12} /> {venue.capacity} capacity
                      </span>
                      {venue.food && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '11px', color: 'var(--text-muted)' }}>
                          <LuUtensils size={12} /> Food & drinks
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
