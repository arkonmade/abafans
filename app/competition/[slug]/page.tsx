import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { LuArrowLeft, LuBell, LuTrophy, LuUsers } from 'react-icons/lu';
import MatchCard from '@/components/match/MatchCard';
import { getCompetitionBySlug, matchesList, teamsMap, competitionsList, brandInfo } from '@/lib/data';
import { competitionMetadata } from '@/lib/metadata';
import { competitionJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = getCompetitionBySlug(slug);
  if (!comp) return { title: 'Competition Not Found' };
  return competitionMetadata(comp);
}

export async function generateStaticParams() {
  return competitionsList.map(c => ({ slug: c.slug }));
}

export default async function CompetitionPage({ params }: Props) {
  const { slug } = await params;
  const comp = getCompetitionBySlug(slug);
  if (!comp) notFound();

  const compMatches = matchesList.filter(m => m.competitionId === comp.id);
  const live      = compMatches.filter(m => m.status === 'live' || m.status === 'halftime');
  const upcoming  = compMatches.filter(m => m.status === 'scheduled');
  const finished  = compMatches.filter(m => m.status === 'fulltime');

  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home',         url: brandInfo.siteUrl },
    { name: 'Competitions', url: `${brandInfo.siteUrl}/competitions` },
    { name: comp.name,      url: `${brandInfo.siteUrl}/competition/${comp.slug}` },
  ]);

  const sectionStyle = { marginBottom: '1.5rem' };
  const headingStyle = { fontSize: '11px', fontWeight: 700 as const, textTransform: 'uppercase' as const, letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' };

  const MatchSection = ({ title, matches }: { title: string; matches: typeof compMatches }) =>
    matches.length > 0 ? (
      <section style={sectionStyle} aria-label={title}>
        <h2 style={headingStyle}>{title}</h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: 560 }}>
          {matches.map(m => (
            <MatchCard key={m.id} match={m} homeTeam={teamsMap[m.home]} awayTeam={teamsMap[m.away]} href={`/matches/${m.id}`} />
          ))}
        </ul>
      </section>
    ) : null;

  return (
    <>
      <Script id="jsonld-comp"      type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(competitionJsonLd(comp)) }} />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <article style={{ background: 'var(--black)', minHeight: '100vh' }}>
        <header style={{ background: 'linear-gradient(180deg,var(--secondary) 0%,var(--black) 100%)', padding: '1.5rem 0 0', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <Link href="/matches" className="back-btn" style={{ marginBottom: '1.25rem' }}><LuArrowLeft size={16} /> Matches</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '3rem', lineHeight: 1 }}>{comp.logo}</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.2rem' }}>{comp.name}</h1>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                  {comp.country} • {comp.currentSeason} • {comp.type}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <LuUsers size={12} /> {comp.followersCount.toLocaleString()} following
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <LuTrophy size={12} /> {compMatches.length} matches
                  </span>
                </div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.2rem', background: 'var(--brand-red)', color: '#fff', borderRadius: 'var(--radius-lg)', fontSize: '13px', fontWeight: 600 }}>
                <LuBell size={14} /> Follow
              </button>
            </div>
          </div>
        </header>

        <div className="container">
          <div style={{ padding: '1.5rem 0' }}>
            <MatchSection title="🔴 Live Now" matches={live} />
            <MatchSection title="📅 Upcoming" matches={upcoming} />
            <MatchSection title="✅ Results" matches={finished} />
            {compMatches.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <p>No matches scheduled for {comp.name}</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
