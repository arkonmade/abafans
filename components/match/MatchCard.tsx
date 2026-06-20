'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuBookmark, LuBookmarkCheck } from 'react-icons/lu';
import type { Match, Team } from '@/types';
import { getMatchStatusLabel } from '@/lib/data';

interface Props {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
  href?: string;
}

export default function MatchCard({ match, homeTeam, awayTeam, href }: Props) {
  const [saved, setSaved] = useState(match.isSaved);
  const label = getMatchStatusLabel(match.status);
  const isLive = match.status === 'live' || match.status === 'halftime' || match.status === 'extratime' || match.status === 'penalties';
  const isFinished = match.status === 'fulltime';

  const timeDisplay = isLive ? `${match.minute}'` : isFinished ? 'FT' : (match.minute ?? '--:--');

  const content = (
    <li className="match-card" style={{ listStyle: 'none' }}>
      <div className={`match-timer${isLive ? ' live' : ''}`}>
        <span className="status-label" style={isLive ? { color: 'var(--brand-red)' } : {}}>
          {isLive && <span className="live-dot" style={{ marginRight: 3 }} />}
          {label}
        </span>
        <span className="time-val">{timeDisplay}</span>
      </div>

      <div className="match-teams">
        <div className="match-team">
          {homeTeam?.avatar && (
            <Image src={homeTeam.avatar} alt={homeTeam.name} width={20} height={20} className="match-team-logo" unoptimized />
          )}
          <span className="match-team-name">{homeTeam?.name}</span>
        </div>
        <div className="match-team">
          {awayTeam?.avatar && (
            <Image src={awayTeam.avatar} alt={awayTeam.name} width={20} height={20} className="match-team-logo" unoptimized />
          )}
          <span className="match-team-name">{awayTeam?.shortName}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
        <div className="match-scores">
          <span className="match-score">{match.homeScore ?? '-'}</span>
          <span className="match-score">{match.awayScore ?? '-'}</span>
        </div>
        <button
          className={`bookmark-btn${saved ? ' active' : ''}`}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved(!saved); }}
          title={saved ? 'Remove bookmark' : 'Bookmark match'}
        >
          {saved ? <LuBookmarkCheck size={16} /> : <LuBookmark size={16} />}
        </button>
      </div>
    </li>
  );

  if (href) {
    return <Link href={href} style={{ display: 'block' }}>{content}</Link>;
  }
  return content;
}
