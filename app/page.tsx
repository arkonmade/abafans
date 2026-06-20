import Link from 'next/link';
import Image from 'next/image';
import { LuTrophy, LuMapPinned, LuTv, LuUsers, LuLandPlot, LuArrowRight, LuCalendar } from 'react-icons/lu';
import MatchCard from '@/components/match/MatchCard';
import HomePredictions from '@/components/prediction/HomePredictions';
import { matchesList, venuesList, peopleList, predictionsList, teamsList, slugify, teamsMap } from '@/lib/data';

export default function HomePage() {
  const rankedPeople = [...peopleList].sort((a, b) => b.points - a.points);
  const [first, second, third, ...rest] = rankedPeople;

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{
          padding: '1.5rem 0',
          display: 'flex', gap: '2rem', alignItems: 'flex-start',
        }}>

          {/* ── MAIN COLUMN ───────────────────────────────────── */}
          <div style={{ flex: '4 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Match list box */}
            <div style={{
              background: 'var(--primary)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 0 0 1px var(--border)',
              padding: '1rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.2rem' }}>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem',
                  background: 'var(--secondary)', borderRadius: 'var(--radius)',
                  padding: '0 1rem', height: '3rem',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input placeholder="Search matches..." style={{ flex: 1, fontSize: '14px', color: 'var(--text-primary)' }} />
                </div>
                <Link href="/matches?filter=live" style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  height: '2.8rem', padding: '0 0.75rem',
                  background: 'var(--card)', borderRadius: 'var(--radius)',
                  fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
                  color: 'var(--brand-red)', letterSpacing: '0.5px',
                  transition: 'var(--transition)',
                }}>
                  <span className="live-dot" />
                  Live
                </Link>
                <Link href="/matches" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '2.8rem', height: '2.8rem',
                  background: 'var(--card)', borderRadius: 'var(--radius)',
                  color: 'var(--text-secondary)', fontSize: '1.1rem',
                }}>
                  <LuCalendar size={18} />
                </Link>
              </div>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {matchesList.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    homeTeam={teamsMap[match.home]}
                    awayTeam={teamsMap[match.away]}
                    href={`/matches/${match.id}`}
                  />
                ))}
              </ul>

              <Link href="/matches" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.4rem', padding: '0.7rem',
                background: 'var(--secondary)', borderRadius: 'var(--radius)',
                fontSize: '13px', color: 'var(--text-muted)',
                transition: 'var(--transition)',
              }}>
                View all matches <LuArrowRight size={14} />
              </Link>
            </div>

            {/* Leaderboard preview */}
            <div style={{
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 0 0 1px var(--secondary)',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '1rem 1rem 0' }}>
                <div className="section-title">
                  <div className="section-title-icon"><LuTrophy size={18} /></div>
                  <div>
                    <h3>Top Leaderboard</h3>
                    <p>The hall of fame</p>
                  </div>
                </div>

                {/* Tab filters */}
                <div className="tab-pills" style={{ marginBottom: '1rem' }}>
                  {['Daily', 'Weekly', 'All-Time'].map((t, i) => (
                    <div key={t} className={`tab-pill${i === 1 ? ' active' : ''}`}>{t}</div>
                  ))}
                </div>

                {/* Podium */}
                <div className="podium" style={{ marginBottom: 0 }}>
                  {/* 2nd */}
                  <div className="podium-col">
                    <div style={{ padding: '0 0.25rem 0.3rem', textAlign: 'center' }}>
                      <div className="podium-name">{second.name}</div>
                      <div className="podium-pts">{second.points} pts</div>
                    </div>
                    <div className="podium-avatar-wrap" style={{ height: 100 }}>
                      <Image src={second.avatar} alt={second.name} fill style={{ objectFit: 'cover' }} unoptimized />
                      <div className="podium-rank-bg">2</div>
                    </div>
                  </div>
                  {/* 1st */}
                  <div className="podium-col first">
                    <div style={{ padding: '0 0.25rem 0.3rem', textAlign: 'center' }}>
                      <div className="podium-name" style={{ color: 'var(--warning)' }}>{first.name}</div>
                      <div className="podium-pts" style={{ color: 'var(--warning)' }}>{first.points} pts</div>
                    </div>
                    <div className="podium-avatar-wrap" style={{ height: 130 }}>
                      <Image src={first.avatar} alt={first.name} fill style={{ objectFit: 'cover' }} unoptimized />
                      <div className="podium-rank-bg">1</div>
                    </div>
                  </div>
                  {/* 3rd */}
                  <div className="podium-col">
                    <div style={{ padding: '0 0.25rem 0.3rem', textAlign: 'center' }}>
                      <div className="podium-name">{third.name}</div>
                      <div className="podium-pts">{third.points} pts</div>
                    </div>
                    <div className="podium-avatar-wrap" style={{ height: 85 }}>
                      <Image src={third.avatar} alt={third.name} fill style={{ objectFit: 'cover' }} unoptimized />
                      <div className="podium-rank-bg">3</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rest of leaderboard */}
              <div>
                {rest.slice(0, 6).map((person, i) => (
                  <div key={person.id} style={{
                    display: 'grid', gridTemplateColumns: '40px 40px 1fr auto',
                    alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 1rem',
                    borderTop: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center' }}>
                      {i + 4}
                    </span>
                    <div style={{ width: 36, height: 36, borderRadius: 10, overflow: 'hidden', background: 'var(--brand-red)', position: 'relative' }}>
                      <Image src={person.avatar} alt={person.name} fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{person.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{person.correctPredictions}/{person.totalPredictions} correct</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{person.points}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>pts</div>
                    </div>
                  </div>
                ))}

                {/* My rank */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '40px 40px 1fr auto',
                  alignItems: 'center', gap: '0.75rem',
                  padding: '0.65rem 1rem',
                  background: 'var(--brand-red)',
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>23</span>
                  <div style={{ width: 36, height: 36, borderRadius: 10, overflow: 'hidden', background: 'rgba(0,0,0,0.3)', position: 'relative' }}>
                    <Image src="https://i.pravatar.cc/150?img=23" alt="You" fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>You</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>40/56 correct — keep climbing!</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>312</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>pts</div>
                  </div>
                </div>

                <Link href="/leaderboard" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.4rem', padding: '0.9rem',
                  fontSize: '13px', color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border)',
                  transition: 'var(--transition)',
                }}>
                  Full leaderboard <LuArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── SIDE COLUMN ───────────────────────────────────── */}
          <div style={{ flex: '3 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }} className="side-col">

            {/* Community badge */}
            <Link href="/leaderboard" style={{
              display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
              background: 'var(--secondary)', borderRadius: 'var(--radius-lg)',
              padding: '1rem', boxShadow: '0 0 0 1px var(--border)',
              transition: 'var(--transition)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {peopleList.slice(0, 4).map((p, i) => (
                  <div key={p.id} style={{
                    width: '2.8rem', height: '2.8rem', borderRadius: '1rem',
                    overflow: 'hidden', border: '2px solid var(--secondary)',
                    marginLeft: i === 0 ? 0 : '-0.8rem', position: 'relative',
                    background: 'var(--brand-red)', flexShrink: 0,
                  }}>
                    <Image src={p.avatar} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>2.4k+</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Already joined</div>
              </div>
            </Link>

            {/* Predictions sidebar */}
            <HomePredictions />

            {/* Venues sidebar */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase' }}>Venues</h2>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Where to watch?</p>
                </div>
                <Link href="/venues" style={{ fontSize: '12px', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  See all <LuArrowRight size={12} />
                </Link>
              </div>
              <div style={{
                display: 'grid', gap: '0.75rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              }}>
                {venuesList.slice(0, 4).map(venue => (
                  <Link key={venue.id} href={`/venues/${slugify(venue.name)}`} className="venue-card">
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: 'var(--radius-sm)', background: 'var(--card)' }}>
                      <Image src={venue.thumbnail} alt={venue.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="venue-card-body">
                      <div className="venue-card-name">{venue.name}</div>
                      <div className="venue-card-meta">
                        <span><LuMapPinned size={10} /> {venue.place.split(',')[0]}</span>
                        <span><LuTv size={10} /> {venue.screens} screens</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .side-col { display: none !important; }
        }
      `}</style>
    </div>
  );
}
