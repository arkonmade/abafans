import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LuArrowLeft } from 'react-icons/lu';
import MatchCard from '@/components/match/MatchCard';
import { getCountryBySlug, countriesList, enrichedTeams, competitionsList, matchesList, teamsMap, brandInfo } from '@/lib/data';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: 'Country Not Found' };
  return {
    title: `${country.name} Football – Teams, Competitions & Matches`,
    description: `Explore ${country.name} football on AbaFans. Follow national teams, competitions, and match predictions from ${country.name}.`,
    alternates: { canonical: `${brandInfo.siteUrl}/country/${country.slug}` },
  };
}

export async function generateStaticParams() {
  return countriesList.map(c => ({ slug: c.slug }));
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const teams = enrichedTeams.filter(t => country.teamIds.includes(t.id));
  const competitions = competitionsList.filter(c => country.competitionIds.includes(c.id));
  const countryMatches = matchesList.filter(m => m.country.toLowerCase() === country.name.toLowerCase());

  return (
    <article style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <header style={{ background: 'linear-gradient(180deg,var(--secondary) 0%,var(--black) 100%)', padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <Link href="/" className="back-btn" style={{ marginBottom: '1.25rem' }}><LuArrowLeft size={16} /> Home</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '3.5rem', lineHeight: 1 }}>{country.flag}</span>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{country.name} Football</h1>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {teams.length} team{teams.length !== 1 ? 's' : ''} · {competitions.length} competition{competitions.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {teams.length > 0 && (
            <section aria-label="Teams">
              <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Teams</h2>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {teams.map(t => (
                  <Link key={t.id} href={`/team/${t.slug}`} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem 1rem', background: 'var(--primary)',
                    borderRadius: 'var(--radius-lg)', boxShadow: '0 0 0 1px var(--border)',
                    transition: 'var(--transition)', minWidth: 180,
                  }}>
                    <Image src={t.avatar} alt={t.name} width={36} height={36} style={{ objectFit: 'contain' }} unoptimized />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t.followersCount.toLocaleString()} followers</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {competitions.length > 0 && (
            <section aria-label="Competitions">
              <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Competitions</h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {competitions.map(c => (
                  <Link key={c.id} href={`/competition/${c.slug}`} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 1rem', background: 'var(--secondary)',
                    borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
                    fontSize: '13px', fontWeight: 500,
                  }}>
                    {c.logo} {c.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {countryMatches.length > 0 && (
            <section aria-label="Recent matches">
              <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Matches in {country.name}</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: 520 }}>
                {countryMatches.map(m => (
                  <MatchCard key={m.id} match={m} homeTeam={teamsMap[m.home]} awayTeam={teamsMap[m.away]} href={`/matches/${m.id}`} />
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
