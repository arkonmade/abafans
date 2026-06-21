import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { LuArrowLeft, LuMapPinned, LuNavigation, LuPhone, LuShare2, LuTv, LuUsers, LuUtensils, LuStar, LuWifi, LuCar, LuClock } from 'react-icons/lu';
import MatchCard from '@/components/match/MatchCard';
import FollowButton from '@/components/ui/FollowButton';
import { getVenueBySlug, getMatchById, getPersonById, teamsMap, formatPhoneNumber, buildWhatsAppVenueShare, matchesList, venuesList, brandInfo } from '@/lib/data';
import { venueMetadata } from '@/lib/metadata';
import { venueJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) return { title: 'Venue Not Found' };
  return venueMetadata(venue);
}

export async function generateStaticParams() {
  return venuesList.map(v => ({ slug: v.slug }));
}

export default async function VenueSpotPage({ params }: Props) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) notFound();

  const venueMatches = matchesList.filter(m => venue.matches.includes(m.id));
  const friends      = venue.friends.map(id => getPersonById(id)).filter(Boolean);
  const waLink       = buildWhatsAppVenueShare(venue.id);
  const avgRating    = venue.rating.length > 0 ? (venue.rating.reduce((s, r) => s + r.rating, 0) / venue.rating.length).toFixed(1) : null;

  const jsonld  = venueJsonLd(venue);
  const crumbs  = breadcrumbJsonLd([
    { name: 'Home',   url: brandInfo.siteUrl },
    { name: 'Venues', url: `${brandInfo.siteUrl}/venues` },
    { name: venue.name, url: `${brandInfo.siteUrl}/venues/${venue.slug}` },
  ]);

  return (
    <>
      <Script id="jsonld-venue"      type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <article style={{ background: 'var(--black)', minHeight: '100vh' }}>
        {/* Hero */}
        <header className="page-hero">
          <Image src={venue.thumbnail} alt={venue.name} fill className="page-hero-img" />
          <div className="page-hero-overlay" />
          <div className="page-hero-content container">
            <nav aria-label="Breadcrumb">
              <Link href="/venues" className="back-btn"><LuArrowLeft size={16} /> Venues</Link>
            </nav>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{venue.name}</h1>
                {venue.activeCheckIns > 0 && (
                  <span style={{ fontSize: '10px', fontWeight: 700, background: 'var(--brand-red)', color: '#fff', padding: '2px 8px', borderRadius: '999px' }}>
                    🔴 {venue.activeCheckIns} watching
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                <LuMapPinned size={13} /> {venue.place}
                {avgRating && <span style={{ marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: 3 }}>· <LuStar size={11} color="#f59e0b" /> {avgRating}</span>}
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="container">
          <section style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Actions */}
            <div className="action-pills">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(venue.name + ' ' + venue.place)}`} target="_blank" rel="noopener noreferrer" className="action-pill">
                <LuNavigation size={14} /> Directions
              </a>
              <a href={`tel:+${venue.contact.phone}`} className="action-pill">
                <LuPhone size={14} /> Call
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share
              </a>
              <FollowButton type="venue" id={venue.id} label="Follow Venue" count={venue.followersCount} />
            </div>

            {/* About */}
            <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.1rem 1.25rem', boxShadow: '0 0 0 1px var(--border)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>About</p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{venue.about}</p>
              {venue.openingHours && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: '0.75rem', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <LuClock size={12} /> {venue.openingHours}
                </div>
              )}
              {venue.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  {venue.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '10px', padding: '2px 7px', background: 'var(--card)', borderRadius: '999px', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Amenities grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(90px,1fr))', gap: '0.6rem' }}>
              {[
                { icon: <LuTv size={20} />,       val: venue.screens,   label: 'Screens' },
                { icon: <LuUsers size={20} />,     val: venue.capacity,  label: 'Capacity' },
                { icon: <LuUtensils size={20} />,  val: venue.food ? '✓' : '✗',   label: 'Food',     ok: venue.food },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>, val: venue.drinks ? '✓' : '✗', label: 'Drinks', ok: venue.drinks },
                { icon: <LuWifi size={20} />,      val: venue.wifi ? '✓' : '✗',   label: 'Wi-Fi',   ok: venue.wifi },
                { icon: <LuCar size={20} />,       val: venue.parking ? '✓' : '✗',label: 'Parking', ok: venue.parking },
              ].map(({ icon, val, label, ok }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', padding: '0.9rem 0.5rem', background: 'var(--secondary)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                  <div style={{ color: ok === false ? 'var(--text-muted)' : 'var(--hover-red)' }}>{icon}</div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: ok === false ? 'var(--text-muted)' : 'var(--text-primary)' }}>{val}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Friends + Contact row */}
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
              {friends.length > 0 && (
                <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.1rem', boxShadow: '0 0 0 1px var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Friends Here</p>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: 'var(--brand-red)', color: '#fff', padding: '1px 8px', borderRadius: '999px' }}>{friends.length}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {friends.slice(0, 5).map((p, i) => p && (
                        <div key={p.id} title={p.name} style={{ width: 34, height: 34, borderRadius: 9, overflow: 'hidden', border: '2px solid var(--primary)', marginLeft: i === 0 ? 0 : '-8px', position: 'relative', background: 'var(--brand-red)', flexShrink: 0 }}>
                          <Image src={p.avatar} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {friends.length} {friends.length === 1 ? 'friend' : 'friends'} watching
                    </span>
                  </div>
                </div>
              )}

              <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.1rem', boxShadow: '0 0 0 1px var(--border)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Contact & Entry</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.25rem' }}>
                  {[
                    { label: 'Address', val: venue.contact.address },
                    { label: 'Phone',   val: `+${formatPhoneNumber(venue.contact.phone)}` },
                    { label: 'Entry',   val: `${venue.contact.entry.toLocaleString()} RWF` },
                    { label: 'City',    val: venue.contact.city },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{label}</div>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            {venue.rating.length > 0 && (
              <section aria-label="Reviews">
                <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>Fan Reviews</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {venue.rating.map(r => (
                    <div key={r.id} style={{ background: 'var(--secondary)', borderRadius: 'var(--radius)', padding: '0.85rem 1rem', boxShadow: '0 0 0 1px var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        {Array.from({ length: r.rating }).map((_, i) => <LuStar key={i} size={11} color="var(--warning)" fill="var(--warning)" />)}
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{r.name}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: 'auto' }}>{r.date}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>&ldquo;{r.msg}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Today's matches */}
            {venueMatches.length > 0 && (
              <section aria-label="Today's screenings">
                <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>Showing Today</h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: 480 }}>
                  {venueMatches.map(match => (
                    <MatchCard key={match.id} match={match} homeTeam={teamsMap[match.home]} awayTeam={teamsMap[match.away]} href={`/matches/${match.id}`} />
                  ))}
                </ul>
              </section>
            )}
          </section>
        </div>
      </article>
    </>
  );
}
