import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { LuArrowLeft, LuUsers, LuTrophy, LuCalendar, LuBell, LuFlame, LuMapPin } from 'react-icons/lu';
import MatchCard from '@/components/match/MatchCard';
import {
  getTeamBySlug, matchesList, teamsMap, communityRooms,
  enrichedTeams, competitionsList
} from '@/lib/data';
import { teamMetadata } from '@/lib/metadata';
import { teamJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { brandInfo } from '@/lib/data';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeamBySlug(slug);
  if (!team) return { title: 'Team Not Found' };
  return teamMetadata(team);
}

export async function generateStaticParams() {
  return enrichedTeams.map(t => ({ slug: t.slug }));
}

export default async function TeamPage({ params }: Props) {
  const { slug } = await params;
  const team = getTeamBySlug(slug);
  if (!team) notFound();

  const teamMatches = matchesList.filter(m => m.home === team.id || m.away === team.id);
  const upcomingMatches = teamMatches.filter(m => m.status === 'scheduled');
  const recentMatches   = teamMatches.filter(m => m.status === 'fulltime' || m.status === 'live');
  const competitions    = competitionsList.filter(c => team.competitions.includes(c.id));
  const teamRoom        = communityRooms.find(r => r.type === 'team' && r.referenceId === team.id);

  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: brandInfo.siteUrl },
    { name: 'Teams', url: `${brandInfo.siteUrl}/teams` },
    { name: team.name, url: `${brandInfo.siteUrl}/team/${team.slug}` },
  ]);

  return (
    <>
      <Script id="jsonld-team" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd(team)) }} />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <article style={{ background: 'var(--black)', minHeight: '100vh' }}>
        {/* Hero */}
        <header style={{ background: 'linear-gradient(180deg,var(--secondary) 0%,var(--black) 100%)', padding: '1.5rem 0 0', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <Link href="/" className="back-btn" style={{ marginBottom: '1.25rem' }}><LuArrowLeft size={16} /> Back</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ width: 80, height: 80, position: 'relative', flexShrink: 0 }}>
                <Image src={team.avatar} alt={team.name} fill style={{ objectFit: 'contain' }} unoptimized />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '2rem' }}>{team.flag}</span>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{team.name}</h1>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {team.country} • {team.founded && `Est. ${team.founded}`} {team.stadium && `• ${team.stadium}`}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <LuUsers size={12} /> {team.followersCount.toLocaleString()} followers
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <LuTrophy size={12} /> {competitions.length} competitions
                  </span>
                </div>
              </div>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.2rem', background: 'var(--brand-red)', color: '#fff',
                borderRadius: 'var(--radius-lg)', fontSize: '13px', fontWeight: 600,
              }}>
                <LuBell size={14} /> Follow
              </button>
            </div>

            {/* Recent Form */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.25rem' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Form:</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {team.recentForm.map((r, i) => (
                  <div key={i} className={`form-badge form-badge-${r}`}>{r}</div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <section style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Competitions */}
            {competitions.length > 0 && (
              <section aria-label="Competitions">
                <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Active Competitions
                </h2>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {competitions.map(c => (
                    <Link key={c.id} href={`/competition/${c.slug}`} style={{
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.4rem 0.9rem', background: 'var(--secondary)',
                      borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
                      fontSize: '12px', fontWeight: 500, transition: 'var(--transition)',
                    }}>
                      <span>{c.logo}</span> {c.shortName}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming */}
            {upcomingMatches.length > 0 && (
              <section aria-label="Upcoming matches">
                <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <LuCalendar size={13} style={{ display: 'inline', marginRight: 5 }} />Upcoming
                </h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: 520 }}>
                  {upcomingMatches.map(m => (
                    <MatchCard key={m.id} match={m} homeTeam={teamsMap[m.home]} awayTeam={teamsMap[m.away]} href={`/matches/${m.id}`} />
                  ))}
                </ul>
              </section>
            )}

            {/* Recent */}
            {recentMatches.length > 0 && (
              <section aria-label="Recent matches">
                <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <LuFlame size={13} style={{ display: 'inline', marginRight: 5 }} />Recent Results
                </h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: 520 }}>
                  {recentMatches.map(m => (
                    <MatchCard key={m.id} match={m} homeTeam={teamsMap[m.home]} awayTeam={teamsMap[m.away]} href={`/matches/${m.id}`} />
                  ))}
                </ul>
              </section>
            )}

            {/* Community */}
            {teamRoom && (
              <section aria-label="Community room">
                <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Community
                </h2>
                <Link href={`/community/${teamRoom.slug}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem', background: 'var(--primary)', borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 0 0 1px var(--border)', maxWidth: 480,
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '0.2rem' }}>{teamRoom.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{teamRoom.messageCount} messages · {teamRoom.activeUsers} active</div>
                  </div>
                  <div style={{ background: 'var(--brand-red)', color: '#fff', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 600 }}>
                    Join →
                  </div>
                </Link>
              </section>
            )}

            {teamMatches.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <p>No matches found for {team.name}</p>
              </div>
            )}
          </section>
        </div>
      </article>
    </>
  );
}
