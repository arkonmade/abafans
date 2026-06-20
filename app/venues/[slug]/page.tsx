import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowLeft, LuMapPinned, LuNavigation, LuPhone, LuShare2, LuTv, LuUsers, LuUtensils, LuStar } from 'react-icons/lu';
import MatchCard from '@/components/match/MatchCard';
import { getVenueBySlug, getMatchById, getPersonById, teamsMap, formatPhoneNumber, buildWhatsAppVenueShare, matchesList } from '@/lib/data';

interface Props { params: Promise<{ slug: string }>; }

export default async function VenueSpotPage({ params }: Props) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) notFound();

  const venueMatches = matchesList.filter(m => venue.matches.includes(m.id));
  const friends = venue.friends.map(id => getPersonById(id)).filter(Boolean);
  const waLink = buildWhatsAppVenueShare(venue.id);

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="page-hero">
        <Image src={venue.thumbnail} alt={venue.name} fill className="page-hero-img" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content container">
          <Link href="/venues" className="back-btn">
            <LuArrowLeft size={16} /> Back
          </Link>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>{venue.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
              <LuMapPinned size={14} /> {venue.place}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container">
        <div style={{ padding: '1.75rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Action pills */}
          <div className="action-pills">
            <a href={`https://maps.google.com/?q=${encodeURIComponent(venue.name + ' ' + venue.place)}`} target="_blank" rel="noopener noreferrer" className="action-pill">
              <LuNavigation size={15} /> Directions
            </a>
            <a href={`tel:+${venue.contact.phone}`} className="action-pill">
              <LuPhone size={15} /> Call
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Share Venue
            </a>
            <button className="action-pill">
              <LuShare2 size={15} /> Share
            </button>
          </div>

          {/* About */}
          <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: '0 0 0 1px var(--border)' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>About</p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{venue.about}</p>
          </div>

          {/* Amenities */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { icon: <LuTv size={20} />, val: venue.screens, label: 'screens' },
              { icon: <LuUsers size={20} />, val: venue.capacity, label: 'capacity' },
              { icon: <LuUtensils size={20} />, val: venue.food ? 'Yes' : 'No', label: 'food' },
              { icon: <LuTv size={20} />, val: venue.drinks ? 'Yes' : 'No', label: 'drinks' },
            ].map(({ icon, val, label }) => (
              <div key={label} style={{
                flex: '1 1 100px', minWidth: 90,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                padding: '1.25rem 1rem',
                background: 'var(--secondary)', borderRadius: 'var(--radius-lg)',
              }}>
                <div style={{ color: 'var(--hover-red)', background: 'var(--card)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
                  {icon}
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase' }}>{val}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Friends + Contact */}
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {/* Friends */}
            <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: '0 0 0 1px var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Friends Watching Here</p>
                <span style={{ fontSize: '11px', fontWeight: 600, background: 'var(--brand-red)', color: '#fff', padding: '1px 8px', borderRadius: '999px' }}>
                  {friends.length} live
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {friends.slice(0, 5).map((p, i) => p && (
                    <div key={p.id} title={p.name} style={{
                      width: 36, height: 36, borderRadius: 10,
                      overflow: 'hidden', border: '2px solid var(--primary)',
                      marginLeft: i === 0 ? 0 : '-8px', position: 'relative',
                      background: 'var(--brand-red)', flexShrink: 0,
                    }}>
                      <Image src={p.avatar} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <LuUsers size={12} style={{ display: 'inline', marginRight: 3 }} />
                  {friends.length} {friends.length === 1 ? 'friend' : 'friends'} here
                </span>
              </div>
            </div>

            {/* Contact */}
            <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: '0 0 0 1px var(--border)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Contact & Entry
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {[
                  { label: 'Address', val: venue.contact.address },
                  { label: 'Phone', val: `+${formatPhoneNumber(venue.contact.phone)}` },
                  { label: 'Entry fee', val: `${venue.contact.entry} RWF` },
                  { label: 'City', val: venue.contact.city },
                ].map(({ label, val }) => (
                  <div key={label} style={{ minWidth: 100 }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '13px', fontWeight: 500 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          {venue.rating.length > 0 && (
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Reviews
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {venue.rating.map(r => (
                  <div key={r.id} style={{ background: 'var(--secondary)', borderRadius: 'var(--radius)', padding: '0.9rem 1rem', boxShadow: '0 0 0 1px var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <LuStar size={12} color="var(--warning)" fill="var(--warning)" />
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>{r.name}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>&ldquo;{r.msg}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matches showing today */}
          {venueMatches.length > 0 && (
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Showing Today
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: 480 }}>
                {venueMatches.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    homeTeam={teamsMap[match.home]}
                    awayTeam={teamsMap[match.away]}
                    href={`/matches/${match.id}`}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
