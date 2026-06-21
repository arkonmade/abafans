'use client';
import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { LuSearch, LuCalendar, LuChevronLeft, LuChevronRight, LuRefreshCw } from 'react-icons/lu';
import MatchCard from '@/components/match/MatchCard';
import { matchesList, teamsMap, getTodayISO, getRelativeDateLabel, competitionsList } from '@/lib/data';
import type { MatchStatus } from '@/types';

type DateFilter = 'today' | 'yesterday' | 'tomorrow' | 'week' | 'month' | 'custom';
type StatusFilter = 'all' | 'live' | 'scheduled' | 'fulltime' | 'postponed';

function addDays(base: string, d: number): string {
  const dt = new Date(base);
  dt.setDate(dt.getDate() + d);
  return dt.toISOString().split('T')[0];
}

export default function MatchesPage() {
  const today = getTodayISO();
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [customDate, setCustomDate] = useState(today);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [compFilter, setCompFilter] = useState('all');
  const [q, setQ] = useState('');

  const activeDateISO = useMemo((): string | null => {
    switch (dateFilter) {
      case 'today':     return today;
      case 'yesterday': return addDays(today, -1);
      case 'tomorrow':  return addDays(today, 1);
      case 'custom':    return customDate;
      default:          return null; // week/month = range
    }
  }, [dateFilter, customDate, today]);

  const filtered = useMemo(() => {
    return matchesList.filter(m => {
      // Date filter
      if (activeDateISO) {
        if (m.kickoffDate !== activeDateISO) return false;
      } else if (dateFilter === 'week') {
        const from = today, to = addDays(today, 6);
        if (!m.kickoffDate || m.kickoffDate < from || m.kickoffDate > to) return false;
      } else if (dateFilter === 'month') {
        const from = today, to = addDays(today, 29);
        if (!m.kickoffDate || m.kickoffDate < from || m.kickoffDate > to) return false;
      }
      // Status
      if (statusFilter !== 'all' && m.status !== statusFilter) return false;
      // Competition
      if (compFilter !== 'all' && m.competitionId !== compFilter) return false;
      // Search
      if (q) {
        const lq = q.toLowerCase();
        const home = teamsMap[m.home]?.name.toLowerCase() ?? '';
        const away = teamsMap[m.away]?.name.toLowerCase() ?? '';
        if (!home.includes(lq) && !away.includes(lq) && !m.competition.toLowerCase().includes(lq)) return false;
      }
      return true;
    });
  }, [activeDateISO, dateFilter, statusFilter, compFilter, q, today]);

  // Group by date for week/month view
  const groupedMatches = useMemo(() => {
    if (dateFilter !== 'week' && dateFilter !== 'month') return null;
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(m => {
      const key = m.kickoffDate ?? 'unknown';
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered, dateFilter]);

  const liveCount = matchesList.filter(m => m.status === 'live').length;

  const DATE_TABS: { id: DateFilter; label: string }[] = [
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'today',     label: 'Today' },
    { id: 'tomorrow',  label: 'Tomorrow' },
    { id: 'week',      label: 'This Week' },
    { id: 'month',     label: 'This Month' },
    { id: 'custom',    label: '📅 Date' },
  ];

  const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
    { id: 'all',       label: 'All' },
    { id: 'live',      label: 'Live' },
    { id: 'scheduled', label: 'Upcoming' },
    { id: 'fulltime',  label: 'Finished' },
    { id: 'postponed', label: 'Postponed' },
  ];

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ padding: '1.25rem 0' }}>

          {/* Page header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Match Explorer</h1>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Browse football history &amp; upcoming fixtures</p>
            </div>
            {liveCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--brand-red)', padding: '4px 10px', borderRadius: '999px' }}>
                <span className="live-dot" />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{liveCount} live</span>
              </div>
            )}
          </div>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--primary)', borderRadius: 'var(--radius)', padding: '0 1rem', height: '2.75rem', boxShadow: '0 0 0 1px var(--border)', marginBottom: '0.75rem' }}>
            <LuSearch size={16} color="var(--text-muted)" />
            <input placeholder="Search teams, competitions…" value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, fontSize: '14px' }} />
            {q && <button onClick={() => setQ('')} style={{ color: 'var(--text-muted)', fontSize: '11px' }}>✕</button>}
          </div>

          {/* Date tabs – scrollable on mobile */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.3rem', marginBottom: '0.5rem', scrollbarWidth: 'none' }}>
            {DATE_TABS.map(dt => (
              <button key={dt.id} onClick={() => setDateFilter(dt.id)} style={{
                padding: '0.45rem 0.9rem', borderRadius: '999px',
                fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
                flexShrink: 0, transition: 'var(--transition)',
                background: dateFilter === dt.id ? 'var(--brand-red)' : 'var(--secondary)',
                color: dateFilter === dt.id ? '#fff' : 'var(--text-muted)',
                border: dateFilter === dt.id ? 'none' : '1px solid var(--border)',
              }}>
                {dt.id === 'today' && dateFilter === 'today' ? '⚡ Today' : dt.label}
              </button>
            ))}
          </div>

          {/* Custom date picker */}
          {dateFilter === 'custom' && (
            <div style={{ marginBottom: '0.75rem' }}>
              <input
                type="date"
                value={customDate}
                onChange={e => setCustomDate(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: 'var(--secondary)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--text-primary)',
                  colorScheme: 'dark',
                }}
              />
            </div>
          )}

          {/* Status + competition filters */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.75rem', scrollbarWidth: 'none' }}>
            {STATUS_FILTERS.map(sf => (
              <button key={sf.id} onClick={() => setStatusFilter(sf.id)} style={{
                padding: '0.35rem 0.75rem', borderRadius: '999px',
                fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'var(--transition)',
                background: statusFilter === sf.id ? 'var(--card)' : 'transparent',
                color: statusFilter === sf.id ? 'var(--hover-red)' : 'var(--text-muted)',
                border: statusFilter === sf.id ? '1px solid var(--border)' : '1px solid transparent',
              }}>
                {sf.id === 'live' && statusFilter === 'live' && <span className="live-dot" style={{ marginRight: 3 }} />}
                {sf.label}
              </button>
            ))}
            <span style={{ width: 1, background: 'var(--border)', margin: '0 0.2rem', flexShrink: 0 }} />
            <select
              value={compFilter}
              onChange={e => setCompFilter(e.target.value)}
              style={{
                padding: '0.35rem 0.75rem', borderRadius: '999px',
                fontSize: '11px', fontWeight: 600,
                background: compFilter !== 'all' ? 'var(--card)' : 'transparent',
                color: compFilter !== 'all' ? 'var(--hover-red)' : 'var(--text-muted)',
                border: '1px solid var(--border)',
                cursor: 'pointer', colorScheme: 'dark', flexShrink: 0,
              }}
            >
              <option value="all">All Competitions</option>
              {competitionsList.map(c => <option key={c.id} value={c.id}>{c.shortName}</option>)}
            </select>
          </div>

          {/* Date label */}
          <div style={{ marginBottom: '1rem', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {activeDateISO ? getRelativeDateLabel(activeDateISO) : dateFilter === 'week' ? 'This Week' : 'This Month'}
            <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: 8 }}>— {filtered.length} match{filtered.length !== 1 ? 'es' : ''}</span>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>No matches found</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Try a different date or filter</p>
              <button onClick={() => { setDateFilter('today'); setStatusFilter('all'); setCompFilter('all'); setQ(''); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.2rem', background: 'var(--secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', fontSize: '13px', margin: '0 auto' }}>
                <LuRefreshCw size={14} /> Reset filters
              </button>
            </div>
          ) : groupedMatches ? (
            // Grouped (week / month)
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {groupedMatches.map(([date, matches]) => (
                <div key={date}>
                  <h2 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <LuCalendar size={12} /> {getRelativeDateLabel(date)}
                    <span style={{ fontWeight: 400, color: 'var(--border)' }}>·</span>
                    <span style={{ fontWeight: 400 }}>{matches.length} match{matches.length !== 1 ? 'es' : ''}</span>
                  </h2>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {matches.map(m => (
                      <div key={m.id} style={{ background: 'var(--primary)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                        <div style={{ padding: '0.3rem 0.75rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                          <Link href={`/competition/${m.competitionId}`} style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>{m.competition}</Link>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{m.stage}</span>
                        </div>
                        <MatchCard match={m} homeTeam={teamsMap[m.home]} awayTeam={teamsMap[m.away]} href={`/matches/${m.id}`} />
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            // Single date
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {filtered.map(m => (
                <div key={m.id} style={{ background: 'var(--primary)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <div style={{ padding: '0.3rem 0.75rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                    <Link href={`/competition/${m.competitionId}`} style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>{m.competition}</Link>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{m.stage}</span>
                  </div>
                  <MatchCard match={m} homeTeam={teamsMap[m.home]} awayTeam={teamsMap[m.away]} href={`/matches/${m.id}`} />
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
