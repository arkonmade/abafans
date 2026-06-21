// /llms.txt  – Machine-readable content index for LLMs, AI agents, and crawlers
import { NextResponse } from 'next/server';
import { matchesList, venuesList, enrichedTeams, competitionsList, countriesList, brandInfo } from '@/lib/data';

export function GET() {
  const lines: string[] = [
    `# ${brandInfo.name}`,
    `> ${brandInfo.tagline}`,
    ``,
    `## About`,
    brandInfo.description,
    ``,
    `## Platform`,
    `- Site: ${brandInfo.siteUrl}`,
    `- Language: English / Kinyarwanda`,
    `- Primary Region: Rwanda, East Africa`,
    `- Focus: Football match-day experience, predictions, venue discovery`,
    ``,
    `## Content Hierarchy`,
    ``,
    `### Matches`,
    `URL pattern: ${brandInfo.siteUrl}/matches/[id]`,
    `Available matches:`,
    ...matchesList.map(m => {
      const kickoff = m.kickoff ? new Date(m.kickoff).toISOString() : 'TBD';
      return `- [${m.competition} ${m.stage}] ${m.id}: ${m.home} vs ${m.away} | status: ${m.status} | kickoff: ${kickoff} | stadium: ${m.stadium} | URL: ${brandInfo.siteUrl}/matches/${m.id}`;
    }),
    ``,
    `### Venues (Where to Watch in Kigali, Rwanda)`,
    `URL pattern: ${brandInfo.siteUrl}/venues/[slug]`,
    ...venuesList.map(v =>
      `- ${v.name} | ${v.place} | screens: ${v.screens} | capacity: ${v.capacity} | entry: ${v.contact.entry} RWF | URL: ${brandInfo.siteUrl}/venues/${v.slug}`
    ),
    ``,
    `### Teams`,
    `URL pattern: ${brandInfo.siteUrl}/team/[slug]`,
    ...enrichedTeams.map(t =>
      `- ${t.name} (${t.flag} ${t.country}) | slug: ${t.slug} | followers: ${t.followersCount} | URL: ${brandInfo.siteUrl}/team/${t.slug}`
    ),
    ``,
    `### Competitions`,
    `URL pattern: ${brandInfo.siteUrl}/competition/[slug]`,
    ...competitionsList.map(c =>
      `- ${c.name} (${c.shortName}) | ${c.country} | season: ${c.currentSeason} | type: ${c.type} | URL: ${brandInfo.siteUrl}/competition/${c.slug}`
    ),
    ``,
    `### Countries`,
    `URL pattern: ${brandInfo.siteUrl}/country/[slug]`,
    ...countriesList.map(c =>
      `- ${c.name} (${c.flag}) | code: ${c.code} | URL: ${brandInfo.siteUrl}/country/${c.slug}`
    ),
    ``,
    `## Core Features`,
    `- Match Predictions: Users predict match outcomes and earn points`,
    `- Leaderboard: Weekly / daily / all-time fan ranking by prediction accuracy`,
    `- Venue Discovery: Find football sports bars and viewing venues in Kigali`,
    `- WhatsApp Sharing: Share match info and venue details to WhatsApp groups`,
    `- Match Check-In: Mark presence at a venue or home while watching`,
    `- Community Rooms: Auto-created match discussion rooms (24h), permanent support/announcements`,
    `- Follow System: Follow teams, competitions, matches, venues for notifications`,
    `- Fan Reputation: Points, badges, streaks for predictions, check-ins, community participation`,
    ``,
    `## API Endpoints`,
    `- GET /api/matches          – All matches with status and scores`,
    `- GET /api/matches/:id      – Single match detail`,
    `- GET /api/venues           – All venues`,
    `- GET /api/venues/:slug     – Single venue detail`,
    `- GET /api/teams            – All teams`,
    `- GET /api/competitions     – All competitions`,
    `- GET /api/leaderboard      – Top fan rankings`,
    ``,
    `## Contact`,
    `- Email: ${brandInfo.emailMain}`,
    `- Phone: +${brandInfo.phoneMain}`,
    `- Twitter: @${brandInfo.socials.x}`,
    `- Instagram: @${brandInfo.socials.instagram}`,
  ];

  return new NextResponse(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
