'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuMapPin, LuLink, LuTarget, LuFlame, LuCalendar, LuBell, LuLogIn, LuTrophy, LuBookmark, LuSettings } from 'react-icons/lu';
import { userProfile, matchesList, teamsMap } from '@/lib/data';
import MatchCard from '@/components/match/MatchCard';

type Tab = 'predictions' | 'saved' | 'stats';

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>('predictions');

  const savedMatches = matchesList.filter(m => m.isSaved);

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      {/* Profile hero */}
      <div style={{ background: 'linear-gradient(180deg, var(--secondary) 0%, var(--black) 100%)', padding: '2rem 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap', paddingBottom: '1.25rem' }}>
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, overflow: 'hidden', border: '2px solid var(--brand-red)', position: 'relative', background: 'var(--card)' }}>
                <Image src={userProfile.pic} alt={userProfile.fullname} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              {userProfile.verified && (
                <div style={{ position: 'absolute', bottom: -4, right: -4, background: 'var(--info)', borderRadius: '999px', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--black)', fontSize: '10px' }}>
                  ✓
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{userProfile.fullname}</h1>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>@{userProfile.username}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.6rem', maxWidth: 400 }}>
                {userProfile.bio}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {userProfile.location && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '12px', color: 'var(--text-muted)' }}>
                    <LuMapPin size={12} /> {userProfile.location}
                  </span>
                )}
                {userProfile.website && (
                  <a href={userProfile.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '12px', color: 'var(--brand-red)' }}>
                    <LuLink size={12} /> abafans.rw
                  </a>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '12px', color: 'var(--text-muted)' }}>
                  <LuCalendar size={12} /> Joined {userProfile.joinedAt}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.5rem 1rem', background: 'var(--brand-red)', color: '#fff',
                borderRadius: 'var(--radius-lg)', fontSize: '13px', fontWeight: 600,
                transition: 'var(--transition)',
              }}>
                <LuLogIn size={14} /> Sign in
              </button>
              <button style={{
                padding: '0.5rem 0.75rem',
                background: 'var(--secondary)', borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)', color: 'var(--text-muted)',
              }}>
                <LuSettings size={16} />
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ display: 'flex', gap: '1px', background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '1rem' }}>
            {[
              { val: '23rd', label: 'Rank', icon: <LuTrophy size={14} /> },
              { val: '312', label: 'Points', icon: <LuTarget size={14} /> },
              { val: '40/56', label: 'Correct', icon: <LuTarget size={14} /> },
              { val: '5🔥', label: 'Streak', icon: <LuFlame size={14} /> },
            ].map(({ val, label }) => (
              <div key={label} className="stat-card" style={{ background: 'var(--secondary)', borderRadius: 0, padding: '0.75rem 0.5rem' }}>
                <div className="val" style={{ fontSize: '1.1rem' }}>{val}</div>
                <div className="lbl">{label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="tab-pills" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
            {([
              { id: 'predictions' as Tab, label: 'Predictions' },
              { id: 'saved' as Tab, label: 'Saved' },
              { id: 'stats' as Tab, label: 'Stats' },
            ]).map(({ id, label }) => (
              <div key={id} className={`tab-pill${tab === id ? ' active' : ''}`} onClick={() => setTab(id)}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container" style={{ padding: '1.25rem 0' }}>

        {tab === 'predictions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 600 }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Your recent predictions</p>
            {matchesList.slice(0, 4).map(m => (
              <div key={m.id} style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '0.75rem', boxShadow: '0 0 0 1px var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="comp-badge">{m.competition}</span>
                  {m.status === 'fulltime' ? (
                    <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>✓ +5 pts</span>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 600 }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <LuBookmark size={13} style={{ display: 'inline', marginRight: 4 }} />
              {savedMatches.length} saved matches
            </p>
            {savedMatches.map(m => (
              <MatchCard key={m.id} match={m} homeTeam={teamsMap[m.home]} awayTeam={teamsMap[m.away]} href={`/matches/${m.id}`} />
            ))}
          </div>
        )}

        {tab === 'stats' && (
          <div style={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Accuracy chart-like breakdown */}
            {[
              { label: 'Correct winner', pct: 71, color: 'var(--success)' },
              { label: 'Exact score', pct: 23, color: 'var(--warning)' },
              { label: 'Correct draw', pct: 18, color: 'var(--info)' },
            ].map(row => (
              <div key={row.label} style={{ background: 'var(--primary)', borderRadius: 'var(--radius)', padding: '1rem', boxShadow: '0 0 0 1px var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{row.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{row.pct}%</span>
                </div>
                <div className="pred-bar">
                  <div className="pred-bar-fill" style={{ width: `${row.pct}%`, background: row.color }} />
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { val: '56', label: 'Total predictions' },
                { val: '5', label: 'Win streak' },
                { val: '71%', label: 'Accuracy' },
                { val: '18', label: 'Competitions' },
              ].map(({ val, label }) => (
                <div key={label} className="stat-card" style={{ minWidth: 100 }}>
                  <div className="val">{val}</div>
                  <div className="lbl">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
