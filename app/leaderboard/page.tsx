'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuTrophy, LuFlame, LuTarget, LuShield, LuArrowUp, LuArrowDown, LuMinus } from 'react-icons/lu';
import { peopleList } from '@/lib/data';

type Period = 'Daily' | 'Weekly' | 'All-Time';

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>('Weekly');

  const ranked = useMemo(() => [...peopleList].sort((a, b) => b.points - a.points), []);
  const [first, second, third, ...rest] = ranked;

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ padding: '1.25rem 0' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>🏆</div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.2rem' }}>Leaderboard</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Top AbaFans predictors — ranked by accuracy</p>
          </div>

          {/* Period tabs */}
          <div className="tab-pills" style={{ maxWidth: 320, margin: '0 auto 1.75rem', borderRadius: 'var(--radius-lg)' }}>
            {(['Daily','Weekly','All-Time'] as Period[]).map(p => (
              <div key={p} className={`tab-pill${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>{p}</div>
            ))}
          </div>

          {/* Podium */}
          <div style={{ maxWidth: 480, margin: '0 auto 1.75rem' }}>
            <div className="podium">
              <div className="podium-col">
                <div className="podium-name">{second.name}</div>
                <div className="podium-pts">{second.points} pts</div>
                <div className="podium-avatar-wrap" style={{ height: 100 }}>
                  <Image src={second.avatar} alt={second.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  <div className="podium-rank-bg">2</div>
                </div>
              </div>
              <div className="podium-col first">
                <div style={{ fontSize: '1.3rem', textAlign: 'center' }}>👑</div>
                <div className="podium-name" style={{ color: 'var(--warning)' }}>{first.name}</div>
                <div className="podium-pts" style={{ color: 'var(--warning)' }}>{first.points} pts</div>
                <div className="podium-avatar-wrap" style={{ height: 140 }}>
                  <Image src={first.avatar} alt={first.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  <div className="podium-rank-bg">1</div>
                </div>
              </div>
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
            {rest.map((person, i) => {
              const rank = i + 4;
              const trendIcon = rank <= 8 ? <LuArrowUp size={10} color="var(--success)" /> : rank <= 12 ? <LuMinus size={10} color="var(--text-muted)" /> : <LuArrowDown size={10} color="var(--brand-red)" />;
              return (
                <div key={person.id} style={{ display: 'grid', gridTemplateColumns: '36px 40px 1fr auto', alignItems: 'center', gap: '0.65rem', padding: '0.7rem 1rem', borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>{rank}</span>
                    {trendIcon}
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: 9, overflow: 'hidden', position: 'relative', background: 'var(--card)' }}>
                    <Image src={person.avatar} alt={person.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{person.name}</span>
                      {person.streak >= 5 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '10px', color: 'var(--warning)', background: 'rgba(245,158,11,0.1)', padding: '1px 5px', borderRadius: '999px' }}>
                          <LuFlame size={9} /> {person.streak}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: 2 }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LuTarget size={9} /> {person.correctPredictions}/{person.totalPredictions}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {Math.round((person.correctPredictions / person.totalPredictions) * 100)}% accuracy
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700 }}>{person.points}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>pts</div>
                  </div>
                </div>
              );
            })}

            {/* My row */}
            <div style={{ display: 'grid', gridTemplateColumns: '36px 40px 1fr auto', alignItems: 'center', gap: '0.65rem', padding: '0.7rem 1rem', background: 'var(--brand-red)' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>23</span>
              <div style={{ width: 36, height: 36, borderRadius: 9, overflow: 'hidden', position: 'relative', background: 'rgba(0,0,0,0.3)' }}>
                <Image src="https://i.pravatar.cc/150?img=23" alt="You" fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>You</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', marginTop: 1 }}>40/56 · 71% accuracy</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>312</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>pts</div>
              </div>
            </div>
          </div>

          {/* How points work */}
          <div style={{ maxWidth: 600, margin: '1.5rem auto 0', background: 'var(--secondary)', borderRadius: 'var(--radius-lg)', padding: '1.1rem', boxShadow: '0 0 0 1px var(--border)' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 5 }}>
              <LuShield size={12} /> How points work
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {[
                { pts: '+10', desc: 'Exact score prediction', color: 'var(--warning)' },
                { pts: '+5',  desc: 'Correct winner',         color: 'var(--success)' },
                { pts: '+3',  desc: 'Correct draw',           color: 'var(--info)' },
                { pts: '+2',  desc: 'Daily login bonus',       color: 'var(--text-muted)' },
                { pts: '+1',  desc: 'Venue check-in',          color: 'var(--text-muted)' },
                { pts: '+1',  desc: 'Community message',       color: 'var(--text-muted)' },
              ].map(row => (
                <div key={row.desc} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: row.color, minWidth: 28 }}>{row.pts}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{row.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
