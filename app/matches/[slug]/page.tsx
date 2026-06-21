import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { LuArrowLeft, LuMapPin, LuShare2, LuCalendar, LuBell, LuUsers } from 'react-icons/lu';
import PredictionWidget from '@/components/prediction/PredictionWidget';
import MatchCheckIn from '@/components/match/MatchCheckIn';
import MatchPresenceFeed from '@/components/match/MatchPresenceFeed';
import FollowButton from '@/components/ui/FollowButton';
import { getMatchById, getTeamById, venuesList, getVenueById, matchesList, teamsMap, buildWhatsAppMatchShare, brandInfo, competitionsMap } from '@/lib/data';
import { matchMetadata } from '@/lib/metadata';
import { matchJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const match = getMatchById(slug);
  if (!match) return { title: 'Match Not Found' };
  return matchMetadata(match);
}

export async function generateStaticParams() {
  return matchesList.map(m => ({ slug: m.id }));
}

export default async function MatchDetailPage({ params }: Props) {
  const { slug } = await params;
  const match = getMatchById(slug);
  if (!match) notFound();

  const homeTeam = getTeamById(match.home)!;
  const awayTeam = getTeamById(match.away)!;
  const matchVenues = match.venues.map(vid => getVenueById(vid)).filter(Boolean);
  const waLink = buildWhatsAppMatchShare(match.id);
  const comp = competitionsMap[match.competitionId];

  const isLive     = ['live','halftime','extratime','penalties'].includes(match.status);
  const isFinished = match.status === 'fulltime';

  const homeWinPct = match.predictionStats ? Math.round(match.predictionStats.homeWin) : 0;
  const drawPct    = match.predictionStats ? Math.round(match.predictionStats.draw)    : 0;
  const awayWinPct = match.predictionStats ? Math.round(match.predictionStats.awayWin) : 0;

  const jsonld   = matchJsonLd(match, homeTeam, awayTeam);
  const crumbs   = breadcrumbJsonLd([
    { name: 'Home',    url: brandInfo.siteUrl },
    { name: 'Matches', url: `${brandInfo.siteUrl}/matches` },
    { name: `${homeTeam.name} vs ${awayTeam.name}`, url: `${brandInfo.siteUrl}/matches/${match.id}` },
  ]);

  return (
    <>
      <Script id="jsonld-match"      type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <article style={{ background: 'var(--black)', minHeight: '100vh' }}>
        {/* Hero / Score */}
        <header style={{ background: 'linear-gradient(180deg,var(--secondary) 0%,var(--black) 100%)', borderBottom: '1px solid var(--border)', padding: '1.5rem 0' }}>
          <div className="container">
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem' }}>
              <Link href="/matches" className="back-btn"><LuArrowLeft size={16} /> Matches</Link>
            </nav>

            {/* Competition badge */}
            {comp && (
              <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                <Link href={`/competition/${comp.slug}`} className="comp-badge" style={{ fontSize: '11px' }}>
                  {comp.logo} {match.competition} · {match.stage}
                </Link>
              </div>
            )}

            {/* Score panel */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1rem 0', flexWrap: 'wrap' }}>
              {/* Home */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', minWidth: 100, maxWidth: 160 }}>
                <Link href={`/team/${homeTeam.slug}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 64, height: 64, position: 'relative' }}>
                    <Image src={homeTeam.avatar} alt={homeTeam.name} fill style={{ objectFit: 'contain' }} unoptimized />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, textAlign: 'center' }}>{homeTeam.name}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{homeTeam.flag}</span>
                </Link>
              </div>

              {/* Score / VS */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', minWidth: 90 }}>
                {(isLive || isFinished) ? (
                  <>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>{match.homeScore}</span>
                      <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>–</span>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>{match.awayScore}</span>
                    </div>
                    {isLive ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--brand-red)', padding: '3px 10px', borderRadius: '999px' }}>
                        <span className="live-dot" />
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{match.minute}&apos;</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Time</span>
                    )}
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>vs</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '11px', color: 'var(--text-muted)' }}>
                      <LuCalendar size={11} />
                      <span>{match.kickoff ? new Date(match.kickoff).toLocaleTimeString('en-RW', { hour: '2-digit', minute: '2-digit' }) : 'TBD'}</span>
                    </div>
                    {match.status === 'postponed' && (
                      <span style={{ fontSize: '10px', background: 'var(--warning)', color: '#000', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>POSTPONED</span>
                    )}
                  </>
                )}
              </div>

              {/* Away */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', minWidth: 100, maxWidth: 160 }}>
                <Link href={`/team/${awayTeam.slug}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 64, height: 64, position: 'relative' }}>
                    <Image src={awayTeam.avatar} alt={awayTeam.name} fill style={{ objectFit: 'contain' }} unoptimized />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, textAlign: 'center' }}>{awayTeam.name}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{awayTeam.flag}</span>
                </Link>
              </div>
            </div>

            {/* Venue + follow row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '12px', color: 'var(--text-muted)' }}>
                <LuMapPin size={12} /> {match.stadium}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '12px', color: 'var(--text-muted)' }}>
                <LuUsers size={12} /> {match.followersCount.toLocaleString()} following
              </span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="container">
          <div style={{ padding: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Action row */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share
              </a>
              <FollowButton type="match" id={match.id} label="Follow Match" count={match.followersCount} />
            </div>

            {/* Check-in + Presence */}
            <MatchCheckIn matchId={match.id} />
            {(match.checkIns && match.checkIns.length > 0) && (
              <MatchPresenceFeed checkIns={match.checkIns} />
            )}

            {/* Prediction + Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {!isFinished && <PredictionWidget match={match} homeTeam={homeTeam} awayTeam={awayTeam} />}

              {/* Fan vote */}
              <section aria-label="Fan predictions" style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: '0 0 0 1px var(--border)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Fan Vote · {match.totalPredictions.toLocaleString()} predictions
                </p>
                {[
                  { label: homeTeam.shortName, pct: homeWinPct, color: 'var(--brand-red)' },
                  { label: 'Draw',             pct: drawPct,    color: 'var(--text-muted)' },
                  { label: awayTeam.shortName, pct: awayWinPct, color: 'var(--info)' },
                ].map(row => (
                  <div key={row.label} style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{row.label}</span>
                      <span style={{ fontSize: '12px', fontWeight: 700 }}>{row.pct}%</span>
                    </div>
                    <div className="pred-bar"><div className="pred-bar-fill" style={{ width: `${row.pct}%`, background: row.color }} /></div>
                  </div>
                ))}
              </section>
            </div>

            {/* Form guide */}
            {match.overview && (
              <section aria-label="Form guide" style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: '0 0 0 1px var(--border)' }}>
                <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Form Guide (last 5)
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { team: homeTeam, form: match.overview.homeForm, rank: match.overview.homeRank },
                    { team: awayTeam, form: match.overview.awayForm, rank: match.overview.awayRank },
                  ].map(({ team, form, rank }) => (
                    <div key={team.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <Link href={`/team/${team.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 130 }}>
                        <Image src={team.avatar} alt={team.name} width={22} height={22} unoptimized style={{ objectFit: 'contain' }} />
                        <span style={{ fontSize: '12px', fontWeight: 500 }}>{team.shortName}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>#{rank}</span>
                      </Link>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {form.map((r, i) => <div key={i} className={`form-badge form-badge-${r}`}>{r}</div>)}
                      </div>
                    </div>
                  ))}
                </div>
                {match.overview.lastMeetings.length > 0 && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>Head to Head</p>
                    {match.overview.lastMeetings.map((m, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.35rem 0', borderBottom: i < match.overview!.lastMeetings.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: 80 }}>{m.date}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700 }}>{m.homeScore} – {m.awayScore}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Venues */}
            {matchVenues.length > 0 && (
              <section aria-label="Watch venues">
                <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Watch This Match At
                </h2>
                <div style={{ display: 'grid', gap: '0.6rem', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))' }}>
                  {matchVenues.map(venue => venue && (
                    <Link key={venue.id} href={`/venues/${venue.slug}`} style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      background: 'var(--secondary)', borderRadius: 'var(--radius)', padding: '0.75rem',
                      boxShadow: '0 0 0 1px var(--border)', transition: 'var(--transition)',
                    }}>
                      <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                        <Image src={venue.thumbnail} alt={venue.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>{venue.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', gap: 6, marginTop: 2 }}>
                          <span>{venue.place.split(',')[0]}</span>
                          {venue.activeCheckIns > 0 && <span style={{ color: 'var(--success)' }}>● {venue.activeCheckIns} here</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
