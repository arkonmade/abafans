'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { LuTrophy, LuFlame, LuTarget } from 'react-icons/lu';
import { peopleList } from '@/lib/data';

type Period = 'Daily' | 'Weekly' | 'All-Time';

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>('Weekly');

  const ranked = useMemo(() => {
    return [...peopleList].sort((a, b) => b.points - a.points);
  }, []);

  const [first, second, third, ...rest] = ranked;

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ padding: '1.5rem 0' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Leaderboard</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>The hall of fame — top AbaFans predictors</p>
          </div>

          {/* Period tabs */}
          <div className="tab-pills" style={{ marginBottom: '2rem', maxWidth: 320, margin: '0 auto 2rem' }}>
            {(['Daily', 'Weekly', 'All-Time'] as Period[]).map(p => (
              <div key={p} className={`tab-pill${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>{p}</div>
            ))}
          </div>

          {/* Podium */}
          <div style={{ maxWidth: 480, margin: '0 auto 2rem' }}>
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
                <div className="podium-avatar-wrap" style={{ height: 140 }}>
                  <Image src={first.avatar} alt={first.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  <div className="podium-rank-bg">1</div>
                </div>
              </div>
              {/* 3rd */}
              <div className="podium-col">
                <div className="podium-name">{third.name}</div>
                <div className="podium-pts">{third.points} pts</div>
                <div className="podium-avatar-wrap" style={{ height: 80 }}>
                  <Image src={third.avatar} alt={third.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  <div className="podium-rank-bg">3</div>
                </div>
              </div>
            </div>
          </div>

          {/* Full list */}
          <div style={{ maxWidth: 600, margin: '0 auto', background: 'var(--primary)', borderRadius: 'var(--radius-lg)', boxShadow: '0 0 0 1px var(--border)', overflow: 'hidden' }}>
            {rest.map((person, i) => (
              <div key={person.id} style={{
                display: 'grid', gridTemplateColumns: '40px 44px 1fr auto',
                alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--border)',
                transition: 'var(--transition)',
              }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center' }}>
                  {i + 4}
                </span>
                <div style={{ width: 38, height: 38, borderRadius: 10, overflow: 'hidden', position: 'relative', background: 'var(--card)' }}>
                  <Image src={person.avatar} alt={person.name} fill style={{ objectFit: 'cover' }} unoptimized />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{person.name}</span>
                    {person.streak >= 5 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '10px', color: 'var(--warning)' }}>
                        <LuFlame size={10} /> {person.streak}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: 2 }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <LuTarget size={9} /> {person.correctPredictions}/{person.totalPredictions} correct
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{person.points}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>pts</div>
                </div>
              </div>
            ))}

            {/* My position */}
            <div style={{
              display: 'grid', gridTemplateColumns: '40px 44px 1fr auto',
              alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: 'var(--brand-red)',
            }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>23</span>
              <div style={{ width: 38, height: 38, borderRadius: 10, overflow: 'hidden', position: 'relative', background: 'rgba(0,0,0,0.3)' }}>
                <Image src="https://i.pravatar.cc/150?img=23" alt="You" fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>You</span>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>40/56 correct — keep climbing!</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>312</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>pts</div>
              </div>
            </div>
          </div>

          {/* How points work */}
          <div style={{ maxWidth: 600, margin: '2rem auto 0', background: 'var(--secondary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: '0 0 0 1px var(--border)' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              How points work
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { pts: '+5', desc: 'Correct winner prediction' },
                { pts: '+10', desc: 'Exact score prediction' },
                { pts: '+3', desc: 'Correct draw prediction' },
                { pts: '+2', desc: 'Daily login bonus' },
              ].map(row => (
                <div key={row.desc} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--success)', minWidth: 36 }}>{row.pts}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{row.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
