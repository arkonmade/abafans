import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { LuMapPinned, LuTv, LuUsers, LuUtensils, LuWifi, LuCar } from 'react-icons/lu';
import { venuesList, brandInfo } from '@/lib/data';
import { venueJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Where to Watch Football in Kigali | Venues',
  description: 'Discover the best football viewing venues and sports bars in Kigali, Rwanda. Find screens, capacity, entry fees, and who\'s watching near you.',
  alternates: { canonical: `${brandInfo.siteUrl}/venues` },
  openGraph: {
    title: 'Football Venues in Kigali – AbaFans',
    description: 'Find the best sports bars and viewing venues in Kigali, Rwanda.',
    url: `${brandInfo.siteUrl}/venues`,
  },
};

export default function VenuesPage() {
  const allVenueJsonLd = { '@context': 'https://schema.org', '@graph': venuesList.map(v => venueJsonLd(v)) };

  return (
    <>
      <Script id="jsonld-venues" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(allVenueJsonLd) }} />

      <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ padding: '1.25rem 0' }}>
            <header style={{ marginBottom: '1.25rem' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Where to Watch</h1>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Football viewing venues in Kigali, Rwanda</p>
            </header>

            {/* Active check-ins banner */}
            {venuesList.some(v => v.activeCheckIns > 0) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 1rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1rem' }}>👥</span>
                <span style={{ fontSize: '13px', color: 'var(--success)', fontWeight: 600 }}>
                  {venuesList.reduce((s, v) => s + v.activeCheckIns, 0)} fans checked in across venues right now
                </span>
              </div>
            )}

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }}>
              {venuesList.map(venue => {
                const avgRating = venue.rating.length > 0
                  ? (venue.rating.reduce((s, r) => s + r.rating, 0) / venue.rating.length).toFixed(1)
                  : null;
                return (
                  <Link key={venue.id} href={`/venues/${venue.slug}`} style={{ display: 'block' }}>
                    <article style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 0 0 1px var(--border)', transition: 'var(--transition)', height: '100%' }}>
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                        <Image src={venue.thumbnail} alt={venue.name} fill style={{ objectFit: 'cover' }} />
                        {/* Entry badge */}
                        <div style={{ position: 'absolute', bottom: '0.6rem', left: '0.6rem', background: 'var(--brand-red)', color: '#fff', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>
                          {venue.contact.entry.toLocaleString()} RWF
                        </div>
                        {/* Live badge */}
                        {venue.activeCheckIns > 0 && (
                          <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', background: 'rgba(0,0,0,0.75)', color: 'var(--success)', padding: '2px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span className="live-dot" /> {venue.activeCheckIns} watching
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '0.9rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.3rem' }}>
                          <h2 style={{ fontSize: '15px', fontWeight: 700 }}>{venue.name}</h2>
                          {avgRating && <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warning)', flexShrink: 0 }}>★ {avgRating}</span>}
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <LuMapPinned size={11} /> {venue.place}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {venue.about}
                        </p>
                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '11px', color: 'var(--text-muted)' }}><LuTv size={11} /> {venue.screens} screens</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '11px', color: 'var(--text-muted)' }}><LuUsers size={11} /> {venue.capacity}</span>
                          {venue.food    && <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '11px', color: 'var(--text-muted)' }}><LuUtensils size={11} /> Food</span>}
                          {venue.wifi    && <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '11px', color: 'var(--text-muted)' }}><LuWifi size={11} /> Wi-Fi</span>}
                          {venue.parking && <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '11px', color: 'var(--text-muted)' }}><LuCar size={11} /> Parking</span>}
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
