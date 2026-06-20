'use client';
import { useState, useMemo, useEffect } from 'react';
import { LuSearch, LuX, LuHistory, LuMapPin } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { matchesList, teamsList, venuesList, peopleList, slugify } from '@/lib/data';

interface Props { onClose: () => void; }

interface SearchResults {
  teams: typeof teamsList;
  venues: typeof venuesList;
  people: typeof peopleList;
}

export default function SearchModal({ onClose }: Props) {
  const [q, setQ] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = useMemo<SearchResults | null>(() => {
    if (!q.trim()) return null;
    const lq = q.toLowerCase();
    return {
      teams: teamsList.filter(t => t.name.toLowerCase().includes(lq) || t.shortName.toLowerCase().includes(lq)).slice(0, 4),
      venues: venuesList.filter(v => v.name.toLowerCase().includes(lq) || v.place.toLowerCase().includes(lq)).slice(0, 3),
      people: peopleList.filter(p => p.name.toLowerCase().includes(lq)).slice(0, 3),
    };
  }, [q]);

  const recentSearches = ['Champions League', 'Goal! Lounge', 'Real Madrid'];
  const hasResults = results !== null && (results.teams.length + results.venues.length + results.people.length) > 0;

  return (
    <div className="search-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="search-panel">
        <div className="search-input-row">
          <LuSearch size={18} color="var(--text-muted)" />
          <input
            autoFocus
            placeholder="Search matches, venues, teams..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          {q && (
            <button onClick={() => setQ('')} style={{
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: 'var(--text-muted)',
            }}>
              <LuX size={16} />
            </button>
          )}
          <button onClick={onClose} style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Close</button>
        </div>

        <div className="search-results-scroll">
          {!q && (
            <div>
              <div className="search-section-label">Recent</div>
              {recentSearches.map(s => (
                <div key={s} className="search-item" onClick={() => setQ(s)}>
                  <LuHistory size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{s}</span>
                </div>
              ))}
            </div>
          )}

          {q && !hasResults && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No results found</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Try different keywords</p>
            </div>
          )}

          {results && results.teams.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div className="search-section-label">Teams</div>
              {results.teams.map(t => (
                <div key={t.id} className="search-item" onClick={onClose}>
                  <Image src={t.avatar} alt={t.name} width={36} height={36} className="search-avatar" unoptimized />
                  <div>
                    <div className="search-item-name">{t.name}</div>
                    <div className="search-item-sub">{t.country}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results && results.venues.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div className="search-section-label">Venues</div>
              {results.venues.map(v => (
                <div key={v.id} className="search-item" onClick={() => { router.push(`/venues/${slugify(v.name)}`); onClose(); }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: 'var(--brand-red)',
                  }}>
                    <LuMapPin size={16} />
                  </div>
                  <div>
                    <div className="search-item-name">{v.name}</div>
                    <div className="search-item-sub">{v.place}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results && results.people.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div className="search-section-label">Fans</div>
              {results.people.map(p => (
                <div key={p.id} className="search-item" onClick={onClose}>
                  <Image src={p.avatar} alt={p.name} width={36} height={36} className="search-avatar" unoptimized />
                  <div>
                    <div className="search-item-name">{p.name}</div>
                    <div className="search-item-sub">{p.points} pts</div>
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
