'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuSearch, LuFilter } from 'react-icons/lu';
import MatchCard from '@/components/match/MatchCard';
import { matchesList, teamsMap } from '@/lib/data';
import type { MatchStatus } from '@/types';

const STATUS_FILTERS: { label: string; value: MatchStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Live', value: 'live' },
  { label: 'Upcoming', value: 'scheduled' },
  { label: 'Finished', value: 'fulltime' },
];

export default function MatchesPage() {
  const [filter, setFilter] = useState<MatchStatus | 'all'>('all');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return matchesList.filter(m => {
      const matchesStatus = filter === 'all' || m.status === filter;
      const home = teamsMap[m.home];
      const away = teamsMap[m.away];
      const matchesQuery = !q ||
        home?.name.toLowerCase().includes(q.toLowerCase()) ||
        away?.name.toLowerCase().includes(q.toLowerCase()) ||
        m.competition.toLowerCase().includes(q.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [filter, q]);

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ padding: '1.5rem 0' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>Matches</h1>

          {/* Search + filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              background: 'var(--primary)', borderRadius: 'var(--radius)', padding: '0 1rem', height: '3rem',
              boxShadow: '0 0 0 1px var(--border)',
            }}>
              <LuSearch size={16} color="var(--text-muted)" />
              <input
                placeholder="Search teams, competitions..."
                value={q} onChange={e => setQ(e.target.value)}
                style={{ flex: 1, fontSize: '14px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {STATUS_FILTERS.map(sf => (
                <button
                  key={sf.value}
                  onClick={() => setFilter(sf.value)}
                  style={{
                    padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                    whiteSpace: 'nowrap', transition: 'var(--transition)',
                    background: filter === sf.value ? 'var(--brand-red)' : 'var(--secondary)',
                    color: filter === sf.value ? '#fff' : 'var(--text-muted)',
                    border: filter === sf.value ? 'none' : '1px solid var(--border)',
                  }}
                >
                  {sf.label === 'Live' && filter === 'live' && <span className="live-dot" style={{ marginRight: 4 }} />}
                  {sf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Match list */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '14px' }}>No matches found.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filtered.map(match => {
                const homeTeam = teamsMap[match.home];
                const awayTeam = teamsMap[match.away];
                return (
                  <div key={match.id} style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '0.5rem', boxShadow: '0 0 0 1px var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.25rem 0.5rem 0.5rem', borderBottom: '1px solid var(--border)' }}>
                      <span className="comp-badge">{match.competition} · {match.stage}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{match.stadium}</span>
                    </div>
                    <MatchCard match={match} homeTeam={homeTeam} awayTeam={awayTeam} href={`/matches/${match.id}`} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
