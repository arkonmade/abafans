import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { LuTrophy, LuMapPinned, LuTv, LuArrowRight, LuFlame, LuUsers, LuTarget, LuCalendar } from 'react-icons/lu';
import MatchCard from '@/components/match/MatchCard';
import HomePredictions from '@/components/prediction/HomePredictions';
import { matchesList, venuesList, peopleList, predictionsList, competitionsList, enrichedTeams, teamsMap, slugify, brandInfo } from '@/lib/data';
import { orgJsonLd, faqJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'AbaFans | Football Predictions, Match Schedules & Where to Watch in Rwanda',
  description: brandInfo.description,
  alternates: { canonical: brandInfo.siteUrl },
};

const HOME_FAQS = [
  { q: 'What is AbaFans?',           a: 'AbaFans is Rwanda\'s football match-day platform where fans can predict match scores, discover venues to watch, follow fixtures, and compete on leaderboards.' },
  { q: 'How do I earn points?',       a: 'Earn 5 points for correct winner predictions, 10 points for exact score predictions, 3 points for correct draw predictions, and 2 points for daily login.' },
  { q: 'Where can I watch in Kigali?',a: 'Use AbaFans\' Venues section to discover sports bars and viewing lounges across Kigali — including Goal! Lounge, Fan Zone Kigali, Kick Off Arena, and more.' },
  { q: 'Is AbaFans free?',            a: 'Yes. AbaFans is free to use. Browse matches, make predictions, and discover venues at no cost.' },
];

export default function HomePage() {
  const ranked = [...peopleList].sort((a, b) => b.points - a.points);
  const [first, second, third, ...rest] = ranked;
  const liveMatches = matchesList.filter(m => m.status === 'live' || m.status === 'halftime');
  const todayMatches = matchesList.filter(m => m.status === 'scheduled' || m.status === 'live' || m.status === 'halftime');

  return (
    <>
      <Script id="jsonld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(HOME_FAQS)) }} />

      <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ padding: '1.25rem 0', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

            {/* ── MAIN COLUMN ─────────────────────────────── */}
            <main style={{ flex: '4 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }} id="matches">

              {/* Live banner */}
              {liveMatches.length > 0 && (
                <Link href="/matches?filter=live" style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'linear-gradient(135deg,#1a0000,#2d0000)',
                  border: '1px solid var(--brand-red)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'var(--transition)',
                }}>
                  <span className="live-dot" style={{ width: 8, height: 8 }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{liveMatches.length} match{liveMatches.length > 1 ? 'es' : ''} live right now</span>
                  <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Watch →</span>
                </Link>
              )}

              {/* Match list */}
              <section aria-label="Today's matches" style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', boxShadow: '0 0 0 1px var(--border)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--secondary)', borderRadius: 'var(--radius)', padding: '0 1rem', height: '2.8rem' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input placeholder="Search matches…" style={{ flex: 1, fontSize: '13px' }} aria-label="Search matches" />
                  </div>
                  <Link href="/matches?filter=live" aria-label="Live matches" style={{ display: 'flex', alignItems: 'center', gap: 4, height: '2.6rem', padding: '0 0.7rem', background: 'var(--card)', borderRadius: 'var(--radius)', fontSize: '11px', fontWeight: 600, color: 'var(--brand-red)', letterSpacing: '0.5px', textTransform: 'uppercase', flexShrink: 0 }}>
                    <span className="live-dot" /> Live
                  </Link>
                  <Link href="/matches" aria-label="Calendar view" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.6rem', height: '2.6rem', background: 'var(--card)', borderRadius: 'var(--radius)', color: 'var(--text-secondary)', flexShrink: 0 }}>
                    <LuCalendar size={16} />
                  </Link>
                </div>

                {/* Competition filter pills */}
                <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.1rem', scrollbarWidth: 'none' }}>
                  <button style={{ padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '11px', fontWeight: 600, background: 'var(--brand-red)', color: '#fff', flexShrink: 0 }}>All</button>
                  {competitionsList.slice(0, 5).map(c => (
                    <Link key={c.id} href={`/competition/${c.slug}`} style={{ padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '11px', fontWeight: 500, background: 'var(--secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)', flexShrink: 0, whiteSpace: 'nowrap' }}>
                      {c.logo} {c.shortName}
                    </Link>
                  ))}
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }} role="list" aria-label="Match list">
                  {matchesList.map(match => (
                    <MatchCard key={match.id} match={match} homeTeam={teamsMap[match.home]} awayTeam={teamsMap[match.away]} href={`/matches/${match.id}`} />
                  ))}
                </ul>

                <Link href="/matches" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.65rem', background: 'var(--secondary)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--text-muted)', transition: 'var(--transition)' }}>
                  Explore all matches <LuArrowRight size={13} />
                </Link>
              </section>

              {/* Leaderboard */}
              <section aria-label="Leaderboard" style={{ borderRadius: 'var(--radius-lg)', boxShadow: '0 0 0 1px var(--secondary)', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1rem 0' }}>
                  <div className="section-title">
                    <div className="section-title-icon"><LuTrophy size={18} /></div>
                    <div><h2 className="section-title" style={{ margin: 0 }}>Top Leaderboard</h2><p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>The hall of fame</p></div>
                  </div>
                  <div className="tab-pills" style={{ marginBottom: '1rem' }}>
                    {['Daily','Weekly','All-Time'].map((t,i) => <div key={t} className={`tab-pill${i===1?' active':''}`}>{t}</div>)}
                  </div>

                  {/* Podium */}
                  <div className="podium">
                    {/* 2nd */}
                    <div className="podium-col">
                      <div className="podium-name">{second.name}</div>
                      <div className="podium-pts">{second.points} pts</div>
                      <div className="podium-avatar-wrap" style={{ height: 100 }}>
                        <Image src={second.avatar} alt={second.name} fill style={{ objectFit: 'cover' }} unoptimized />
                        <div className="podium-rank-bg">2</div>
                      </div>
                    </div>
                    {/* 1st */}
                    <div className="podium-col first">
                      <div className="podium-name" style={{ color: 'var(--warning)' }}>{first.name}</div>
                      <div className="podium-pts" style={{ color: 'var(--warning)' }}>{first.points} pts</div>
                      <div className="podium-avatar-wrap" style={{ height: 130 }}>
                        <Image src={first.avatar} alt={first.name} fill style={{ objectFit: 'cover' }} unoptimized />
                        <div className="podium-rank-bg">1</div>
                      </div>
                    </div>
                    {/* 3rd */}
                    <div className="podium-col">
                      <div className="podium-name">{third.name}</div>
                      <div className="podium-pts">{third.points} pts</div>
                      <div className="podium-avatar-wrap" style={{ height: 85 }}>
                        <Image src={third.avatar} alt={third.name} fill style={{ objectFit: 'cover' }} unoptimized />
                        <div className="podium-rank-bg">3</div>
                      </div>
                    </div>
                  </div>
                </div>

                {rest.slice(0, 5).map((person, i) => (
                  <div key={person.id} style={{ display: 'grid', gridTemplateColumns: '36px 40px 1fr auto', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1rem', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center' }}>{i+4}</span>
                    <div style={{ width: 34, height: 34, borderRadius: 9, overflow: 'hidden', position: 'relative', background: 'var(--card)' }}>
                      <Image src={person.avatar} alt={person.name} fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{person.name}</span>
                        {person.streak >= 5 && <span style={{ fontSize: '9px', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: 1 }}><LuFlame size={9}/>{person.streak}</span>}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <LuTarget size={9}/>{person.correctPredictions}/{person.totalPredictions}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{person.points}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>pts</div>
                    </div>
                  </div>
                ))}

                {/* My position */}
                <div style={{ display: 'grid', gridTemplateColumns: '36px 40px 1fr auto', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1rem', background: 'var(--brand-red)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>23</span>
                  <div style={{ width: 34, height: 34, borderRadius: 9, overflow: 'hidden', position: 'relative' }}>
                    <Image src="https://i.pravatar.cc/150?img=23" alt="You" fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>You</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Keep climbing!</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>312</div>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>pts</div>
                  </div>
                </div>

                <Link href="/leaderboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.85rem', fontSize: '13px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', transition: 'var(--transition)' }}>
                  Full leaderboard <LuArrowRight size={13} />
                </Link>
              </section>
            </main>

            {/* ── SIDEBAR ────────────────────────────────── */}
            <aside style={{ flex: '3 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="side-col" aria-label="Sidebar">

              {/* Community badge */}
              <Link href="/leaderboard" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', background: 'var(--secondary)', borderRadius: 'var(--radius-lg)', padding: '1rem', boxShadow: '0 0 0 1px var(--border)', transition: 'var(--transition)' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {peopleList.slice(0, 4).map((p, i) => (
                    <div key={p.id} style={{ width: '2.6rem', height: '2.6rem', borderRadius: '0.9rem', overflow: 'hidden', border: '2px solid var(--secondary)', marginLeft: i === 0 ? 0 : '-0.7rem', position: 'relative', background: 'var(--brand-red)', flexShrink: 0 }}>
                      <Image src={p.avatar} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>2.4k+ <LuUsers size={13} style={{ display: 'inline' }} /></div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Active fans today</div>
                </div>
              </Link>

              {/* Competitions quick links */}
              <section aria-label="Competitions">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Competitions</h2>
                  <Link href="/matches" style={{ fontSize: '11px', color: 'var(--brand-red)' }}>All →</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {competitionsList.slice(0, 5).map(c => (
                    <Link key={c.id} href={`/competition/${c.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', background: 'var(--primary)', borderRadius: 'var(--radius)', boxShadow: '0 0 0 1px var(--border)', transition: 'var(--transition)' }}>
                      <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{c.logo}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{c.country} · {c.followersCount.toLocaleString()} fans</div>
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>›</span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Predictions sidebar */}
              <HomePredictions />

              {/* Venues sidebar */}
              <section aria-label="Venues">
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div>
                    <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Where to Watch</h2>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Kigali venues showing today</p>
                  </div>
                  <Link href="/venues" style={{ fontSize: '11px', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', gap: 2 }}>All <LuArrowRight size={11} /></Link>
                </div>
                <div style={{ display: 'grid', gap: '0.6rem', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))' }}>
                  {venuesList.slice(0, 4).map(venue => (
                    <Link key={venue.id} href={`/venues/${venue.slug}`} className="venue-card">
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: 'var(--radius-sm)', background: 'var(--card)' }}>
                        <Image src={venue.thumbnail} alt={venue.name} fill style={{ objectFit: 'cover' }} />
                        {venue.activeCheckIns > 0 && (
                          <div style={{ position: 'absolute', top: 4, right: 4, background: 'var(--brand-red)', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: 2 }}>
                            <span className="live-dot" style={{ width: 4, height: 4 }} />{venue.activeCheckIns}
                          </div>
                        )}
                      </div>
                      <div className="venue-card-body">
                        <div className="venue-card-name">{venue.name}</div>
                        <div className="venue-card-meta">
                          <span><LuMapPinned size={9} /> {venue.place.split(',')[0]}</span>
                          <span><LuTv size={9} /> {venue.screens}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* FAQ section for SEO */}
              <section aria-label="Frequently asked questions" style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1rem', boxShadow: '0 0 0 1px var(--border)' }}>
                <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>FAQ</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {HOME_FAQS.slice(0, 3).map(faq => (
                    <details key={faq.q} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.6rem' }}>
                      <summary style={{ fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {faq.q} <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>+</span>
                      </summary>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '0.4rem', lineHeight: 1.6 }}>{faq.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .side-col { display: none !important; } }
        `}</style>
      </div>
    </>
  );
}
