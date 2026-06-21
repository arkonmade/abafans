'use client';
import { useState, useMemo, useEffect } from 'react';
import { LuSearch, LuX, LuHistory, LuMapPin, LuTrophy, LuUsers, LuCalendar } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { matchesList, enrichedTeams, venuesList, peopleList, competitionsList, countriesList, teamsMap } from '@/lib/data';

interface Props { onClose: () => void }

export default function SearchModal({ onClose }: Props) {
  const [q, setQ] = useState('');
  const router = useRouter();

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return null;
    const lq = q.toLowerCase();
    return {
      matches:      matchesList.filter(m => {
        const ht = teamsMap[m.home]?.name.toLowerCase() ?? '';
        const at = teamsMap[m.away]?.name.toLowerCase() ?? '';
        return ht.includes(lq) || at.includes(lq) || m.competition.toLowerCase().includes(lq);
      }).slice(0, 3),
      teams:        enrichedTeams.filter(t => t.name.toLowerCase().includes(lq) || t.country.toLowerCase().includes(lq)).slice(0, 4),
      venues:       venuesList.filter(v => v.name.toLowerCase().includes(lq) || v.place.toLowerCase().includes(lq)).slice(0, 3),
      competitions: competitionsList.filter(c => c.name.toLowerCase().includes(lq) || c.shortName.toLowerCase().includes(lq)).slice(0, 3),
      people:       peopleList.filter(p => p.name.toLowerCase().includes(lq)).slice(0, 3),
      countries:    countriesList.filter(c => c.name.toLowerCase().includes(lq)).slice(0, 2),
    };
  }, [q]);

  const totalResults = results ? Object.values(results).reduce((s, arr) => s + arr.length, 0) : 0;
  const recentSearches = ['Champions League', 'Goal! Lounge', 'Real Madrid', 'AFCON'];

  const go = (url: string) => { router.push(url); onClose(); };

  return (
    <div className="search-overlay" role="dialog" aria-label="Search" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="search-panel">
        <div className="search-input-row">
          <LuSearch size={17} color="var(--text-muted)" />
          <input autoFocus placeholder="Search matches, venues, teams, competitions…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search" />
          {q && <button onClick={() => setQ('')} aria-label="Clear" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: 'var(--text-muted)' }}><LuX size={14} /></button>}
          <button onClick={onClose} style={{ color: 'var(--text-muted)', fontSize: '12px', padding: '0.25rem 0.5rem', background: 'var(--secondary)', borderRadius: 'var(--radius-sm)' }}>ESC</button>
        </div>

        <div className="search-results-scroll">
          {!q && (
            <div>
              <div className="search-section-label">Recent searches</div>
              {recentSearches.map(s => (
                <div key={s} className="search-item" onClick={() => setQ(s)} role="button" tabIndex={0}>
                  <LuHistory size={13} color="var(--text-muted)" />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{s}</span>
                </div>
              ))}
              <div className="search-section-label" style={{ marginTop: '0.75rem' }}>Quick links</div>
              {[
                { label: 'All Matches',  url: '/matches',     icon: <LuCalendar size={13} /> },
                { label: 'Venues',       url: '/venues',      icon: <LuMapPin size={13} /> },
                { label: 'Leaderboard',  url: '/leaderboard', icon: <LuTrophy size={13} /> },
                { label: 'Community',    url: '/community',   icon: <LuUsers size={13} /> },
              ].map(({ label, url, icon }) => (
                <div key={label} className="search-item" onClick={() => go(url)} role="button" tabIndex={0}>
                  <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</span>
                </div>
              ))}
            </div>
          )}

          {q && totalResults === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>No results for &ldquo;{q}&rdquo;</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Try teams, venues, or competitions</p>
            </div>
          )}

          {results?.matches && results.matches.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="search-section-label">Matches</div>
              {results.matches.map(m => {
                const home = teamsMap[m.home]; const away = teamsMap[m.away];
                return (
                  <div key={m.id} className="search-item" onClick={() => go(`/matches/${m.id}`)}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>⚽</div>
                    <div>
                      <div className="search-item-name">{home?.shortName} vs {away?.shortName}</div>
                      <div className="search-item-sub">{m.competition} · {m.status.toUpperCase()}</div>
                    </div>
                    {m.status === 'live' && <span style={{ marginLeft: 'auto', flexShrink: 0 }}><span className="live-dot" /></span>}
                  </div>
                );
              })}
            </div>
          )}

          {results?.teams && results.teams.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="search-section-label">Teams</div>
              {results.teams.map(t => (
                <div key={t.id} className="search-item" onClick={() => go(`/team/${t.slug}`)}>
                  <Image src={t.avatar} alt={t.name} width={36} height={36} className="search-avatar" unoptimized />
                  <div>
                    <div className="search-item-name">{t.flag} {t.name}</div>
                    <div className="search-item-sub">{t.country} · {t.followersCount.toLocaleString()} followers</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results?.competitions && results.competitions.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="search-section-label">Competitions</div>
              {results.competitions.map(c => (
                <div key={c.id} className="search-item" onClick={() => go(`/competition/${c.slug}`)}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{c.logo}</div>
                  <div>
                    <div className="search-item-name">{c.name}</div>
                    <div className="search-item-sub">{c.country} · {c.currentSeason}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results?.venues && results.venues.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="search-section-label">Venues</div>
              {results.venues.map(v => (
                <div key={v.id} className="search-item" onClick={() => go(`/venues/${v.slug}`)}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-red)', flexShrink: 0 }}><LuMapPin size={16} /></div>
                  <div>
                    <div className="search-item-name">{v.name}</div>
                    <div className="search-item-sub">{v.place} {v.activeCheckIns > 0 ? `· ${v.activeCheckIns} live` : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results?.people && results.people.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="search-section-label">Fans</div>
              {results.people.map(p => (
                <div key={p.id} className="search-item" onClick={onClose}>
                  <Image src={p.avatar} alt={p.name} width={36} height={36} className="search-avatar" unoptimized />
                  <div>
                    <div className="search-item-name">{p.name}</div>
                    <div className="search-item-sub">{p.points} pts · #{peopleList.indexOf(p) + 1} ranked</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results?.countries && results.countries.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="search-section-label">Countries</div>
              {results.countries.map(c => (
                <div key={c.code} className="search-item" onClick={() => go(`/country/${c.slug}`)}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{c.flag}</div>
                  <div>
                    <div className="search-item-name">{c.name}</div>
                    <div className="search-item-sub">{c.teamIds.length} team{c.teamIds.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
