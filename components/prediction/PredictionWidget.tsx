'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Match, Team } from '@/types';
import Toast from '@/components/ui/Toast';

interface Props {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
}

type Pick = 'home' | 'draw' | 'away' | null;

export default function PredictionWidget({ match, homeTeam, awayTeam }: Props) {
  const [pick, setPick] = useState<Pick>(null);
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const total = (match.predictionStats?.homeWin ?? 0) + (match.predictionStats?.draw ?? 0) + (match.predictionStats?.awayWin ?? 0);
  const pct = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0;

  const homeWinPct = pct(match.predictionStats?.homeWin ?? 0);
  const drawPct    = pct(match.predictionStats?.draw    ?? 0);
  const awayWinPct = pct(match.predictionStats?.awayWin ?? 0);

  const handleSubmit = () => {
    if (!pick) { setToast('Please pick a winner first!'); return; }
    setSubmitted(true);
    setToast(`Prediction submitted! +5 pts if correct 🎯`);
  };

  return (
    <div style={{
      background: 'var(--primary)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      boxShadow: '0 0 0 1px var(--border)',
    }}>
      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Who will win?
      </p>

      {/* Team pick buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          className={`prediction-team-btn${pick === 'home' ? ' active' : ''}`}
          onClick={() => !submitted && setPick('home')}
          disabled={submitted}
        >
          <Image src={homeTeam.avatar} alt={homeTeam.name} width={32} height={32} unoptimized style={{ objectFit: 'contain' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{homeTeam.shortName}</span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{homeWinPct}%</span>
        </button>

        <button
          className={`prediction-team-btn${pick === 'draw' ? ' draw' : ''}`}
          onClick={() => !submitted && setPick('draw')}
          disabled={submitted}
          style={{ maxWidth: 72 }}
        >
          <span style={{ fontSize: '18px', fontWeight: 700 }}>X</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Draw</span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{drawPct}%</span>
        </button>

        <button
          className={`prediction-team-btn${pick === 'away' ? ' active' : ''}`}
          onClick={() => !submitted && setPick('away')}
          disabled={submitted}
        >
          <Image src={awayTeam.avatar} alt={awayTeam.name} width={32} height={32} unoptimized style={{ objectFit: 'contain' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{awayTeam.shortName}</span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{awayWinPct}%</span>
        </button>
      </div>

      {/* Prediction bars */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
        <div className="pred-bar" style={{ flex: homeWinPct }}>
          <div className="pred-bar-fill" style={{ width: '100%', background: 'var(--brand-red)' }} />
        </div>
        <div className="pred-bar" style={{ flex: drawPct }}>
          <div className="pred-bar-fill" style={{ width: '100%', background: 'var(--text-muted)' }} />
        </div>
        <div className="pred-bar" style={{ flex: awayWinPct }}>
          <div className="pred-bar-fill" style={{ width: '100%', background: 'var(--info)' }} />
        </div>
      </div>

      {/* Score prediction */}
      {match.status === 'scheduled' && !submitted && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="number" min="0" max="20"
            placeholder="0"
            value={homeScore}
            onChange={e => setHomeScore(e.target.value)}
            style={{
              width: 48, height: 40, textAlign: 'center',
              background: 'var(--secondary)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', fontSize: '16px', fontWeight: 700,
            }}
          />
          <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>:</span>
          <input
            type="number" min="0" max="20"
            placeholder="0"
            value={awayScore}
            onChange={e => setAwayScore(e.target.value)}
            style={{
              width: 48, height: 40, textAlign: 'center',
              background: 'var(--secondary)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', fontSize: '16px', fontWeight: 700,
            }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', flex: 1 }}>Exact score = +10 pts</span>
        </div>
      )}

      {submitted ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem', background: 'rgba(34,197,94,0.1)', borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(34,197,94,0.3)',
        }}>
          <span style={{ color: 'var(--success)', fontSize: '13px', fontWeight: 600 }}>
            ✓ Prediction locked in!
          </span>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '0.75rem',
            background: pick ? 'var(--brand-red)' : 'var(--card)',
            color: pick ? '#fff' : 'var(--text-muted)',
            borderRadius: 'var(--radius)',
            fontSize: '13px', fontWeight: 600,
            transition: 'var(--transition)',
          }}
        >
          Submit Prediction {pick ? '→' : ''}
        </button>
      )}

      <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>
        {match.totalPredictions.toLocaleString()} fans have predicted
      </p>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
