'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  LuMapPin, LuLink, LuTarget, LuFlame, LuCalendar, LuLogIn,
  LuTrophy, LuBookmark, LuSettings, LuStar, LuCircleCheck,
  LuUsers, LuBell, LuBellOff, LuShield
} from 'react-icons/lu';
import { userProfile, matchesList, teamsMap, allBadges, enrichedTeams } from '@/lib/data';
import MatchCard from '@/components/match/MatchCard';

type Tab = 'predictions' | 'saved' | 'stats' | 'badges';

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>('predictions');
  const [notifications, setNotifications] = useState(userProfile.preferences.notifications);

  const savedMatches = matchesList.filter(m => m.isSaved);
  const rep = userProfile.reputation!;
  const favoriteTeam = userProfile.favoriteTeamId ? enrichedTeams.find(t => t.id === userProfile.favoriteTeamId) : null;

  const levelProgress = ((rep.points % 100) / 100) * 100;

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(180deg,var(--secondary) 0%,var(--black) 100%)', padding: '2rem 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', paddingBottom: '1rem' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 76, height: 76, borderRadius: 20, overflow: 'hidden', border: '2px solid var(--brand-red)', position: 'relative', background: 'var(--card)' }}>
                <Image src={userProfile.pic} alt={userProfile.fullname} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              {userProfile.verified && (
                <div style={{ position: 'absolute', bottom: -4, right: -4, background: 'var(--info)', borderRadius: '999px', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--black)' }}>
                  <LuCircleCheck size={11} color="#fff" fill="#fff" />
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.15rem' }}>
                <h1 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{userProfile.fullname}</h1>
                {favoriteTeam && <span style={{ fontSize: '1rem' }} title={favoriteTeam.name}>{favoriteTeam.flag}</span>}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>@{userProfile.username}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.6rem', maxWidth: 380 }}>{userProfile.bio}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {userProfile.location && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '11px', color: 'var(--text-muted)' }}><LuMapPin size={11} /> {userProfile.location}</span>
                )}
                {userProfile.website && (
                  <a href={userProfile.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '11px', color: 'var(--brand-red)' }}><LuLink size={11} /> abafans.rw</a>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '11px', color: 'var(--text-muted)' }}><LuCalendar size={11} /> Joined {userProfile.joinedAt}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <Link href="/auth" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.5rem 1rem', background: 'var(--brand-red)', color: '#fff', borderRadius: 'var(--radius-lg)', fontSize: '13px', fontWeight: 600 }}>
                <LuLogIn size={13} /> Sign in
              </Link>
              <button style={{ padding: '0.5rem 0.65rem', background: 'var(--secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <LuSettings size={15} />
              </button>
              <button onClick={() => setNotifications(!notifications)} title="Toggle notifications" style={{ padding: '0.5rem 0.65rem', background: notifications ? 'rgba(255,77,79,0.15)' : 'var(--secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', color: notifications ? 'var(--brand-red)' : 'var(--text-muted)' }}>
                {notifications ? <LuBell size={15} /> : <LuBellOff size={15} />}
              </button>
            </div>
          </div>

          {/* Followers row */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem' }}>
            {[
              { val: userProfile.followers, label: 'Followers' },
              { val: userProfile.following, label: 'Following' },
              { val: userProfile.posts,     label: 'Posts' },
            ].map(({ val, label }) => (
              <div key={label} style={{ display: 'flex', gap: '0.3rem', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14px', fontWeight: 700 }}>{val.toLocaleString()}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Level progress bar */}
          <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>
                <LuShield size={12} style={{ display: 'inline', marginRight: 4, color: 'var(--brand-red)' }} />
                Level {rep.level} · {rep.levelName}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{rep.points} pts</span>
            </div>
            <div className="pred-bar">
              <div className="pred-bar-fill" style={{ width: `${levelProgress}%`, background: 'var(--brand-red)' }} />
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ display: 'flex', gap: '1px', background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '0.75rem' }}>
            {[
              { val: `#${rep.rank}`,          label: 'Rank',    color: 'var(--warning)' },
              { val: rep.points,              label: 'Points',  color: 'var(--text-primary)' },
              { val: `${rep.correctPredictions}/${rep.totalPredictions}`, label: 'Correct', color: 'var(--text-primary)' },
              { val: `${rep.streak}🔥`,       label: 'Streak',  color: 'var(--brand-red)' },
            ].map(({ val, label, color }) => (
              <div key={label} style={{ flex: 1, padding: '0.65rem 0.5rem', background: 'var(--secondary)', textAlign: 'center' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color }}>{val}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="tab-pills" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', overflow: 'auto' }}>
            {(['predictions', 'saved', 'stats', 'badges'] as Tab[]).map(t => (
              <div key={t} className={`tab-pill${tab === t ? ' active' : ''}`} onClick={() => setTab(t)} style={{ whiteSpace: 'nowrap' }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container" style={{ padding: '1.25rem 0' }}>

        {tab === 'predictions' && (
          <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Your recent predictions</p>
            {matchesList.slice(0, 4).map(m => (
              <div key={m.id} style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '0.75rem', boxShadow: '0 0 0 1px var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span className="comp-badge">{m.competition}</span>
                  {m.status === 'fulltime' ? (
                    <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>✓ +5 pts</span>
                  ) : m.status === 'live' ? (
                    <span style={{ fontSize: '11px', color: 'var(--brand-red)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <span className="live-dot" /> LIVE
                    </span>
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pending</span>
                  )}
                </div>
                <MatchCard match={m} homeTeam={teamsMap[m.home]} awayTeam={teamsMap[m.away]} href={`/matches/${m.id}`} />
              </div>
            ))}
          </div>
        )}

        {tab === 'saved' && (
          <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <LuBookmark size={12} /> {savedMatches.length} saved matches
            </p>
            {savedMatches.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '14px' }}>No saved matches yet</p>
                <Link href="/matches" style={{ marginTop: '0.75rem', display: 'inline-block', color: 'var(--brand-red)', fontSize: '13px' }}>Browse matches →</Link>
              </div>
            ) : (
              savedMatches.map(m => <MatchCard key={m.id} match={m} homeTeam={teamsMap[m.home]} awayTeam={teamsMap[m.away]} href={`/matches/${m.id}`} />)
            )}
          </div>
        )}

        {tab === 'stats' && (
          <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Correct winner', pct: Math.round((rep.correctPredictions / rep.totalPredictions) * 100), color: 'var(--success)' },
              { label: 'Exact score',    pct: 23, color: 'var(--warning)' },
              { label: 'Correct draw',   pct: 18, color: 'var(--info)' },
            ].map(row => (
              <div key={row.label} style={{ background: 'var(--primary)', borderRadius: 'var(--radius)', padding: '1rem', boxShadow: '0 0 0 1px var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{row.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{row.pct}%</span>
                </div>
                <div className="pred-bar"><div className="pred-bar-fill" style={{ width: `${row.pct}%`, background: row.color }} /></div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {[
                { val: rep.totalPredictions, label: 'Total Preds' },
                { val: rep.bestStreak,        label: 'Best Streak' },
                { val: `${Math.round((rep.correctPredictions / rep.totalPredictions) * 100)}%`, label: 'Accuracy' },
                { val: rep.totalCheckIns,     label: 'Check-Ins' },
                { val: rep.weeklyPoints,      label: 'This Week' },
                { val: `#${rep.weeklyRank}`,  label: 'Weekly Rank' },
              ].map(({ val, label }) => (
                <div key={label} className="stat-card" style={{ minWidth: 85 }}>
                  <div className="val" style={{ fontSize: '1.1rem' }}>{val}</div>
                  <div className="lbl">{label}</div>
                </div>
              ))}
            </div>

            {/* Favorite team */}
            {favoriteTeam && (
              <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius)', padding: '1rem', boxShadow: '0 0 0 1px var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Image src={favoriteTeam.avatar} alt={favoriteTeam.name} width={40} height={40} style={{ objectFit: 'contain' }} unoptimized />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Favourite team</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{favoriteTeam.flag} {favoriteTeam.name}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'badges' && (
          <div style={{ maxWidth: 520 }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              {rep.badges.length} / {allBadges.length} badges earned
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '0.75rem' }}>
              {allBadges.map(badge => {
                const earned = rep.badges.find(b => b.id === badge.id);
                return (
                  <div key={badge.id} style={{
                    background: earned ? 'var(--primary)' : 'rgba(18,18,18,0.5)',
                    borderRadius: 'var(--radius)',
                    padding: '1rem 0.75rem',
                    textAlign: 'center',
                    boxShadow: `0 0 0 1px ${earned ? 'var(--border)' : 'rgba(44,44,44,0.4)'}`,
                    opacity: earned ? 1 : 0.5,
                    transition: 'var(--transition)',
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.4rem', filter: earned ? 'none' : 'grayscale(1)' }}>{badge.icon}</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: earned ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: '0.2rem' }}>{badge.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{badge.description}</div>
                    {earned && <div style={{ fontSize: '9px', color: 'var(--success)', marginTop: '0.4rem' }}>Earned {earned.earnedAt}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
