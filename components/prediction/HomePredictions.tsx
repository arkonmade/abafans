'use client';
import { useState } from 'react';
import Image from 'next/image';
import { LuUsers, LuLandPlot } from 'react-icons/lu';
import { predictionsList, teamsList } from '@/lib/data';

export default function HomePredictions() {
  const [picks, setPicks] = useState<Record<string, 'home' | 'away' | null>>({});

  const getTeam = (id: string) => teamsList.find(t => t.id === id);

  const toggle = (predId: string, side: 'home' | 'away') => {
    setPicks(prev => ({ ...prev, [predId]: prev[predId] === side ? null : side }));
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ position: 'relative', height: '1rem', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <h3 style={{
            position: 'absolute', left: '1rem', top: '-0.4rem',
            background: 'var(--black)', padding: '0 0.3rem',
            fontSize: '12px', fontWeight: 700, textTransform: 'uppercase',
            color: 'var(--text-muted)', letterSpacing: '0.5px',
          }}>
            Who will win?
          </h3>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {predictionsList.map(pred => {
          const home = getTeam(pred.home);
          const away = getTeam(pred.away);
          const myPick = picks[pred.id];

          return (
            <div key={pred.id} style={{
              background: 'var(--primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              boxShadow: '0 0 0 1px var(--border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative', gap: '0.25rem' }}>
                {/* Home */}
                <button
                  onClick={() => toggle(pred.id, 'home')}
                  style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-start', gap: '0.3rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '0.6rem 0 0 0.6rem',
                    background: myPick === 'home' ? 'var(--brand-red)' : 'var(--card)',
                    transition: 'var(--transition)', cursor: 'pointer',
                  }}
                >
                  <div style={{ width: 28, height: 28, position: 'relative' }}>
                    {home && <Image src={home.avatar} alt={home.name} fill style={{ objectFit: 'contain' }} unoptimized />}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: myPick === 'home' ? 'var(--black)' : 'var(--text-primary)' }}>
                    {home?.shortName}
                  </span>
                </button>

                {/* VS divider */}
                <div style={{
                  position: 'absolute', left: '50%', bottom: 0,
                  transform: 'translateX(-50%)',
                  height: '110%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--brand-red)',
                  borderRadius: '2rem 2rem 0 0',
                  boxShadow: '0 0 0 2px var(--primary)',
                  padding: '0 0.6rem',
                  zIndex: 1,
                }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--black)' }}>vs</span>
                </div>

                {/* Away */}
                <button
                  onClick={() => toggle(pred.id, 'away')}
                  style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-end', gap: '0.3rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '0 0.6rem 0.6rem 0',
                    background: myPick === 'away' ? 'var(--brand-red)' : 'var(--card)',
                    transition: 'var(--transition)', cursor: 'pointer',
                  }}
                >
                  <div style={{ width: 28, height: 28, position: 'relative' }}>
                    {away && <Image src={away.avatar} alt={away.name} fill style={{ objectFit: 'contain' }} unoptimized />}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: myPick === 'away' ? 'var(--black)' : 'var(--text-primary)' }}>
                    {away?.shortName}
                  </span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', padding: '0 0.25rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '10px', color: 'var(--text-muted)' }}>
                  <LuUsers size={10} /> {pred.predictions} predictions
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '10px', color: 'var(--text-muted)' }}>
                  <LuLandPlot size={10} /> {pred.stadium}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
