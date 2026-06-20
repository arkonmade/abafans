import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowLeft, LuMapPin, LuUsers, LuShare2, LuCalendar, LuTrophy } from 'react-icons/lu';
import PredictionWidget from '@/components/prediction/PredictionWidget';
import MatchCard from '@/components/match/MatchCard';
import { getMatchById, getTeamById, venuesList, getVenueById, matchesList, teamsMap, buildWhatsAppMatchShare } from '@/lib/data';

interface Props { params: Promise<{ slug: string }>; }

export default async function MatchDetailPage({ params }: Props) {
  const { slug } = await params;
  const match = getMatchById(slug);
  if (!match) notFound();

  const homeTeam = getTeamById(match.home)!;
  const awayTeam = getTeamById(match.away)!;
  const matchVenues = match.venues.map(vid => getVenueById(vid)).filter(Boolean);
  const waLink = buildWhatsAppMatchShare(match.id);

  const isLive = match.status === 'live' || match.status === 'halftime';
  const isFinished = match.status === 'fulltime';
  const isUpcoming = match.status === 'scheduled';

  const homeWinPct = match.predictionStats ? Math.round(match.predictionStats.homeWin) : 0;
  const drawPct    = match.predictionStats ? Math.round(match.predictionStats.draw)    : 0;
  const awayWinPct = match.predictionStats ? Math.round(match.predictionStats.awayWin) : 0;

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(180deg, var(--secondary) 0%, var(--black) 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '1.5rem 0',
      }}>
        <div className="container">
          <Link href="/matches" className="back-btn" style={{ marginBottom: '1.25rem' }}>
            <LuArrowLeft size={16} /> Back
          </Link>

          <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            <span className="comp-badge">{match.competition} · {match.stage}</span>
          </div>

          {/* Score display */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '1.5rem', padding: '1.5rem 0',
          }}>
            {/* Home */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', maxWidth: 140 }}>
              <div style={{ width: 72, height: 72, position: 'relative' }}>
                <Image src={homeTeam.avatar} alt={homeTeam.name} fill style={{ objectFit: 'contain' }} unoptimized />
              </div>
              <span style={{ fontSize: '15px', fontWeight: 600, textAlign: 'center', color: 'var(--text-primary)' }}>{homeTeam.name}</span>
            </div>

            {/* Score / VS */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', minWidth: 100 }}>
              {(isLive || isFinished) ? (
                <>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>{match.homeScore}</span>
                    <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>—</span>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>{match.awayScore}</span>
                  </div>
                  {isLive && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--brand-red)', padding: '3px 10px', borderRadius: '999px' }}>
                      <span className="live-dot" />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{match.minute}&apos;</span>
                    </div>
                  )}
                  {isFinished && (
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Full Time</span>
                  )}
                </>
              ) : (
                <>
                  <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-muted)' }}>vs</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '11px', color: 'var(--text-muted)' }}>
                    <LuCalendar size={12} />
                    <span>{match.minute ?? 'TBD'}</span>
                  </div>
                </>
              )}
            </div>

            {/* Away */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', maxWidth: 140 }}>
              <div style={{ width: 72, height: 72, position: 'relative' }}>
                <Image src={awayTeam.avatar} alt={awayTeam.name} fill style={{ objectFit: 'contain' }} unoptimized />
              </div>
              <span style={{ fontSize: '15px', fontWeight: 600, textAlign: 'center', color: 'var(--text-primary)' }}>{awayTeam.name}</span>
            </div>
          </div>

          {/* Stadium */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: '12px', color: 'var(--text-muted)' }}>
            <LuMapPin size={12} /> {match.stadium}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container">
        <div style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Share on WhatsApp
            </a>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem', background: 'var(--secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <LuShare2 size={14} /> Share
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

            {/* Prediction widget */}
            {!isFinished && (
              <PredictionWidget match={match} homeTeam={homeTeam} awayTeam={awayTeam} />
            )}

            {/* Prediction stats */}
            <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: '0 0 0 1px var(--border)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Fan Predictions · {match.totalPredictions.toLocaleString()} votes
              </p>

              {[
                { label: homeTeam.shortName, pct: homeWinPct, color: 'var(--brand-red)' },
                { label: 'Draw', pct: drawPct, color: 'var(--text-muted)' },
                { label: awayTeam.shortName, pct: awayWinPct, color: 'var(--info)' },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{row.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{row.pct}%</span>
                  </div>
                  <div className="pred-bar">
                    <div className="pred-bar-fill" style={{ width: `${row.pct}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match overview */}
          {match.overview && (
            <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: '0 0 0 1px var(--border)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Form Guide (last 5)
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { team: homeTeam, form: match.overview.homeForm, rank: match.overview.homeRank },
                  { team: awayTeam, form: match.overview.awayForm, rank: match.overview.awayRank },
                ].map(({ team, form, rank }) => (
                  <div key={team.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 120 }}>
                      <Image src={team.avatar} alt={team.name} width={24} height={24} unoptimized style={{ objectFit: 'contain' }} />
                      <span style={{ fontSize: '12px', fontWeight: 500 }}>{team.shortName}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>#{rank}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {form.map((r, i) => (
                        <div key={i} className={`form-badge form-badge-${r}`}>{r}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {match.overview.lastMeetings.length > 0 && (
                <div style={{ marginTop: '1.25rem' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Head to Head
                  </p>
                  {match.overview.lastMeetings.map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0', borderBottom: i < match.overview!.lastMeetings.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: 80 }}>{m.date}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700 }}>{m.homeScore} – {m.awayScore}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Venues showing this match */}
          {matchVenues.length > 0 && (
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Watch This Match At
              </p>
              <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                {matchVenues.map(venue => venue && (
                  <Link key={venue.id} href={`/venues/${venue.name.toLowerCase().replace(/[^\w\s-]/g,'').replace(/\s+/g,'-')}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--secondary)', borderRadius: 'var(--radius)', padding: '0.75rem', boxShadow: '0 0 0 1px var(--border)', transition: 'var(--transition)' }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                      <Image src={venue.thumbnail} alt={venue.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{venue.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', gap: 8, marginTop: 2 }}>
                        <span>{venue.place}</span>
                        <span>{venue.contact.entry} RWF</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
