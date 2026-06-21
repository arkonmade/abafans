// ─────────────────────────────────────────────────────────────
//  JSON-LD Structured Data generators
//  For AI crawlers, LLMs, Search Bots, Knowledge Graph builders
// ─────────────────────────────────────────────────────────────
import { brandInfo } from './data';
import type { Match, Venue, Team, Competition } from '@/types';

const SITE = brandInfo.siteUrl;

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AbaFans',
    alternateName: 'AbaFans Rwanda',
    url: SITE,
    logo: `${SITE}/icon.svg`,
    description: brandInfo.description,
    contactPoint: { '@type': 'ContactPoint', telephone: `+${brandInfo.phoneMain}`, contactType: 'customer service', email: brandInfo.emailMain, areaServed: 'RW', availableLanguage: ['English', 'Kinyarwanda'] },
    sameAs: [
      `https://twitter.com/${brandInfo.socials.x}`,
      `https://facebook.com/${brandInfo.socials.facebook}`,
      `https://instagram.com/${brandInfo.socials.instagram}`,
    ],
    address: { '@type': 'PostalAddress', addressCountry: 'RW', addressLocality: 'Kigali' },
    foundingDate: '2026',
    knowsAbout: ['Football', 'Soccer', 'Sports Predictions', 'Football Venues', 'Rwanda Football', 'African Football'],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AbaFans',
    url: SITE,
    description: brandInfo.tagline,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function matchJsonLd(match: Match, homeTeam: Team, awayTeam: Team) {
  const isLive     = match.status === 'live';
  const isFinished = match.status === 'fulltime';
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${homeTeam.name} vs ${awayTeam.name}`,
    description: `${match.competition} ${match.stage} — ${homeTeam.name} vs ${awayTeam.name} at ${match.stadium}.`,
    startDate: match.kickoff ?? match.kickoffDate,
    eventStatus: isFinished
      ? 'https://schema.org/EventScheduled'
      : isLive
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventScheduled',
    location: {
      '@type': 'SportsActivityLocation',
      name: match.stadium,
      address: { '@type': 'PostalAddress', addressCountry: match.country },
    },
    organizer: { '@type': 'SportsOrganization', name: match.competition },
    competitor: [
      { '@type': 'SportsTeam', name: homeTeam.name, sport: 'Football', memberOf: { '@type': 'SportsOrganization', name: match.competition } },
      { '@type': 'SportsTeam', name: awayTeam.name, sport: 'Football', memberOf: { '@type': 'SportsOrganization', name: match.competition } },
    ],
    ...(isFinished && match.homeScore !== null ? {
      result: {
        '@type': 'GamePlayAction',
        resultComment: `${homeTeam.name} ${match.homeScore} – ${match.awayScore} ${awayTeam.name}`,
      },
    } : {}),
    url: `${SITE}/matches/${match.id}`,
    sport: 'Football',
  };
}

export function venueJsonLd(venue: Venue) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}/venues/${venue.slug}`,
    name: venue.name,
    description: venue.about,
    url: `${SITE}/venues/${venue.slug}`,
    telephone: `+${venue.contact.phone}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.contact.address,
      addressLocality: venue.contact.city,
      addressCountry: 'RW',
    },
    ...(venue.coordinates ? {
      geo: { '@type': 'GeoCoordinates', latitude: venue.coordinates.lat, longitude: venue.coordinates.lng },
    } : {}),
    openingHours: venue.openingHours ?? 'Mo-Su 12:00-23:00',
    priceRange: `${venue.contact.entry} RWF`,
    amenityFeature: [
      ...(venue.food    ? [{ '@type': 'LocationFeatureSpecification', name: 'Food', value: true }] : []),
      ...(venue.drinks  ? [{ '@type': 'LocationFeatureSpecification', name: 'Drinks', value: true }] : []),
      ...(venue.wifi    ? [{ '@type': 'LocationFeatureSpecification', name: 'Wi-Fi', value: true }] : []),
      ...(venue.parking ? [{ '@type': 'LocationFeatureSpecification', name: 'Parking', value: true }] : []),
      { '@type': 'LocationFeatureSpecification', name: 'Screens', value: venue.screens },
    ],
    image: `${SITE}${venue.thumbnail}`,
    maximumAttendeeCapacity: venue.capacity,
    knowsAbout: venue.tags,
    aggregateRating: venue.rating.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: (venue.rating.reduce((s, r) => s + r.rating, 0) / venue.rating.length).toFixed(1),
      reviewCount: venue.rating.length,
    } : undefined,
  };
}

export function teamJsonLd(team: Team) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: team.name,
    sport: 'Football',
    memberOf: team.competitions.map(cid => ({ '@type': 'SportsOrganization', name: cid })),
    location: { '@type': 'Place', name: team.country, address: { '@type': 'PostalAddress', addressCountry: team.countryCode } },
    foundingDate: team.founded?.toString(),
    homeLocation: team.stadium ? { '@type': 'SportsActivityLocation', name: team.stadium } : undefined,
    url: `${SITE}/team/${team.slug}`,
    image: team.avatar,
    numberOfEmployees: { '@type': 'QuantitativeValue', description: `${team.followersCount.toLocaleString()} followers on AbaFans` },
  };
}

export function competitionJsonLd(comp: Competition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: comp.name,
    alternateName: comp.shortName,
    sport: 'Football',
    url: `${SITE}/competition/${comp.slug}`,
    location: { '@type': 'Place', name: comp.country, address: { '@type': 'PostalAddress', addressCountry: comp.countryCode } },
    description: `${comp.name} – ${comp.currentSeason} season. Follow fixtures, live scores, and predictions on AbaFans.`,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}
