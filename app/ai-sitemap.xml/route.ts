import { NextResponse } from 'next/server';
import { matchesList, venuesList, enrichedTeams, competitionsList, countriesList, brandInfo } from '@/lib/data';

export function GET() {
  const SITE = brandInfo.siteUrl;
  const now = new Date().toISOString();

  const urls: string[] = [
    url(SITE, now, 'daily', '1.0'),
    url(`${SITE}/matches`, now, 'hourly', '0.9'),
    url(`${SITE}/venues`, now, 'daily', '0.8'),
    url(`${SITE}/leaderboard`, now, 'hourly', '0.8'),
    url(`${SITE}/community`, now, 'hourly', '0.7'),
    ...matchesList.map(m => url(`${SITE}/matches/${m.id}`, m.kickoff ?? now,
      m.status === 'live' ? 'always' : m.status === 'scheduled' ? 'hourly' : 'weekly', '0.9')),
    ...venuesList.map(v => url(`${SITE}/venues/${v.slug}`, now, 'daily', '0.8')),
    ...enrichedTeams.map(t => url(`${SITE}/team/${t.slug}`, now, 'daily', '0.7')),
    ...competitionsList.map(c => url(`${SITE}/competition/${c.slug}`, now, 'daily', '0.7')),
    ...countriesList.map(c => url(`${SITE}/country/${c.slug}`, now, 'weekly', '0.6')),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- AbaFans AI Sitemap – Generated ${now} -->
  <!-- Optimized for AI crawlers, LLMs, and search engines -->
${urls.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=1800',
      'X-Robots-Tag': 'all',
    },
  });
}

function url(loc: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <mobile:mobile/>
  </url>`;
}
