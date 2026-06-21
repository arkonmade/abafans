// ─────────────────────────────────────────────────────────────
//  Centralized metadata helpers for every page
//  SEO / OG / Twitter / Canonical
// ─────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import { brandInfo, getTeamById } from './data';
import type { Match, Venue, Team, Competition } from '@/types';

const SITE_URL = brandInfo.siteUrl;
const DEFAULT_OG = `${SITE_URL}/og-default.png`;
const BRAND_COLOR = '#ff4d4f';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AbaFans | Football Predictions, Match Schedules & Where to Watch in Rwanda',
    template: '%s | AbaFans',
  },
  description: 'Never miss a match with AbaFans. View today\'s football fixtures, predict scores, climb the leaderboard, discover where to watch matches near you, and share predictions with friends.',
  keywords: [
    'football', 'soccer', 'world cup', 'football predictions', 'match predictions',
    'football fixtures', 'today matches', 'sports bars', 'where to watch football',
    'football venues', 'Rwanda football', 'Africa football', 'football leaderboard',
    'football fans', 'AbaFans', 'AFCON', 'Champions League', 'Premier League',
  ],
  authors: [{ name: 'AbaFans', url: SITE_URL }],
  creator: 'AbaFans',
  publisher: 'AbaFans',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    siteName: 'AbaFans',
    title: 'AbaFans ⚽ Predict, Watch & Connect',
    description: 'Follow today\'s football matches, make predictions, discover the best places to watch, and compete with fans across Rwanda on AbaFans.',
    url: SITE_URL,
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: 'AbaFans – Football Predictions & Venues' }],
    locale: 'en_RW',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@abafans',
    creator: '@abafans',
    title: 'AbaFans ⚽ Football Predictions & Match-Day Experience',
    description: 'Predict scores, find venues, follow fixtures, and climb the leaderboard. Join Rwanda\'s football match-day community.',
    images: [DEFAULT_OG],
  },
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'AbaFans' },
};

export function matchMetadata(match: Match): Metadata {
  const home = getTeamById(match.home);
  const away = getTeamById(match.away);
  const title = `${home?.name} vs ${away?.name} – ${match.competition} ${match.stage}`;
  const scoreStr = match.homeScore !== null ? `${match.homeScore}–${match.awayScore}` : 'Predict now';
  const desc = `${home?.name} vs ${away?.name} | ${match.competition} ${match.stage} | ${match.stadium} | ${scoreStr}. Predict the score on AbaFans.`;
  const url = `${SITE_URL}/matches/${match.id}`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, type: 'article' },
    twitter: { title, description: desc },
  };
}

export function venueMetadata(venue: Venue): Metadata {
  const title = `${venue.name} – Watch Football in ${venue.place}`;
  const desc = `${venue.name} in ${venue.place}. ${venue.screens} screens, ${venue.capacity} capacity. Entry from ${venue.contact.entry} RWF. Find who's watching here on AbaFans.`;
  const url = `${SITE_URL}/venues/${venue.slug}`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, type: 'article', images: [{ url: venue.thumbnail, alt: venue.name }] },
    twitter: { title, description: desc },
  };
}

export function teamMetadata(team: Team): Metadata {
  const title = `${team.name} – ${team.flag} ${team.country} Football`;
  const desc = `Follow ${team.name} on AbaFans. Recent form, upcoming matches, fan predictions, and community discussions. ${team.followersCount.toLocaleString()} followers.`;
  const url = `${SITE_URL}/team/${team.slug}`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, type: 'article', images: [{ url: team.avatar, alt: team.name }] },
    twitter: { title, description: desc },
  };
}

export function competitionMetadata(comp: Competition): Metadata {
  const title = `${comp.name} – Fixtures, Predictions & Standings`;
  const desc = `Follow ${comp.name} on AbaFans. Fixtures, live scores, predictions, standings, and the best venues to watch. ${comp.followersCount.toLocaleString()} fans following.`;
  const url = `${SITE_URL}/competition/${comp.slug}`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, type: 'article' },
    twitter: { title, description: desc },
  };
}
