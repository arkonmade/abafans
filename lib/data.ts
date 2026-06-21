import type {
  Match, Venue, Person, Prediction, Team, UserProfile,
  Competition, Country, CommunityRoom, Badge, BrandInfo
} from '@/types';

// ─────────────────────────────────────────────────────────────
//  PEOPLE / FANS
// ─────────────────────────────────────────────────────────────
export const peopleList: Person[] = [
  { id: 'p1',  name: 'Kamaliza',    points: 498, avatar: 'https://i.pravatar.cc/150?img=2',  totalPredictions: 95, correctPredictions: 76, streak: 8,  joinedAt: '2026-01-15' },
  { id: 'p2',  name: 'Aline',       points: 423, avatar: 'https://i.pravatar.cc/150?img=1',  totalPredictions: 88, correctPredictions: 69, streak: 6,  joinedAt: '2026-02-03' },
  { id: 'p3',  name: 'Jean Claude', points: 385, avatar: 'https://i.pravatar.cc/150?img=3',  totalPredictions: 82, correctPredictions: 65, streak: 4,  joinedAt: '2026-01-21' },
  { id: 'p4',  name: 'Diane',       points: 372, avatar: 'https://i.pravatar.cc/150?img=4',  totalPredictions: 79, correctPredictions: 62, streak: 5,  joinedAt: '2026-02-11' },
  { id: 'p5',  name: 'Patrick',     points: 360, avatar: 'https://i.pravatar.cc/150?img=5',  totalPredictions: 77, correctPredictions: 60, streak: 7,  joinedAt: '2026-03-05' },
  { id: 'p6',  name: 'Olivia',      points: 344, avatar: 'https://i.pravatar.cc/150?img=6',  totalPredictions: 74, correctPredictions: 57, streak: 3,  joinedAt: '2026-02-16' },
  { id: 'p7',  name: 'Eric',        points: 338, avatar: 'https://i.pravatar.cc/150?img=18', totalPredictions: 72, correctPredictions: 55, streak: 4,  joinedAt: '2026-03-18' },
  { id: 'p8',  name: 'Sandrine',    points: 331, avatar: 'https://i.pravatar.cc/150?img=7',  totalPredictions: 70, correctPredictions: 53, streak: 2,  joinedAt: '2026-04-02' },
  { id: 'p9',  name: 'Mugisha',     points: 320, avatar: 'https://i.pravatar.cc/150?img=8',  totalPredictions: 68, correctPredictions: 51, streak: 6,  joinedAt: '2026-01-29' },
  { id: 'p10', name: 'Grace',       points: 309, avatar: 'https://i.pravatar.cc/150?img=9',  totalPredictions: 66, correctPredictions: 49, streak: 1,  joinedAt: '2026-02-25' },
  { id: 'p11', name: 'Kevin',       points: 297, avatar: 'https://i.pravatar.cc/150?img=10', totalPredictions: 63, correctPredictions: 47, streak: 5,  joinedAt: '2026-03-12' },
  { id: 'p12', name: 'Alice',       points: 285, avatar: 'https://i.pravatar.cc/150?img=11', totalPredictions: 60, correctPredictions: 45, streak: 2,  joinedAt: '2026-04-01' },
  { id: 'p13', name: 'Samuel',      points: 274, avatar: 'https://i.pravatar.cc/150?img=12', totalPredictions: 58, correctPredictions: 43, streak: 3,  joinedAt: '2026-04-08' },
  { id: 'p14', name: 'Yvette',      points: 260, avatar: 'https://i.pravatar.cc/150?img=13', totalPredictions: 55, correctPredictions: 40, streak: 4,  joinedAt: '2026-04-22' },
  { id: 'p15', name: 'Emmanuel',    points: 248, avatar: 'https://i.pravatar.cc/150?img=14', totalPredictions: 52, correctPredictions: 38, streak: 1,  joinedAt: '2026-05-03' },
  { id: 'p16', name: 'Vanessa',     points: 236, avatar: 'https://i.pravatar.cc/150?img=15', totalPredictions: 49, correctPredictions: 36, streak: 2,  joinedAt: '2026-05-11' },
  { id: 'p17', name: 'Thierry',     points: 224, avatar: 'https://i.pravatar.cc/150?img=16', totalPredictions: 45, correctPredictions: 33, streak: 3,  joinedAt: '2026-05-19' },
  { id: 'p18', name: 'Bella',       points: 210, avatar: 'https://i.pravatar.cc/150?img=17', totalPredictions: 42, correctPredictions: 30, streak: 1,  joinedAt: '2026-05-25' },
];

// ─────────────────────────────────────────────────────────────
//  TEAMS
// ─────────────────────────────────────────────────────────────
export const teamsList: Omit<Team, 'avatar'>[] = [
  { id: 't1', name: 'Real Madrid',       shortName: 'Real',    country: 'Spain',   countryCode: 'ES', flag: '🇪🇸', slug: 'real-madrid',        competitions: ['c1','c3'], founded: 1902, stadium: 'Santiago Bernabéu', followersCount: 1248, recentForm: ['W','W','D','W','L'] },
  { id: 't2', name: 'Manchester United', shortName: 'Man Utd', country: 'England', countryCode: 'GB', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', slug: 'manchester-united',  competitions: ['c1','c2'], founded: 1878, stadium: 'Old Trafford',       followersCount:  984, recentForm: ['W','D','W','W','W'] },
  { id: 't3', name: 'Chelsea',           shortName: 'Chelsea', country: 'England', countryCode: 'GB', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', slug: 'chelsea',           competitions: ['c1','c2'], founded: 1905, stadium: 'Stamford Bridge',    followersCount:  756, recentForm: ['L','W','D','W','W'] },
  { id: 't4', name: 'Paris Saint-Germain', shortName: 'PSG',   country: 'France',  countryCode: 'FR', flag: '🇫🇷', slug: 'paris-saint-germain', competitions: ['c1','c4'], founded: 1970, stadium: 'Parc des Princes',  followersCount:  832, recentForm: ['W','W','W','D','W'] },
  { id: 't5', name: 'Arsenal',           shortName: 'Arsenal', country: 'England', countryCode: 'GB', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', slug: 'arsenal',           competitions: ['c1','c2'], founded: 1886, stadium: 'Emirates Stadium',   followersCount:  621, recentForm: ['W','D','W','W','W'] },
  { id: 't6', name: 'Bayern Munich',     shortName: 'Bayern',  country: 'Germany', countryCode: 'DE', flag: '🇩🇪', slug: 'bayern-munich',      competitions: ['c1','c5'], founded: 1900, stadium: 'Allianz Arena',      followersCount:  713, recentForm: ['W','W','W','D','W'] },
  { id: 't7', name: 'Rwanda',            shortName: 'Rwanda',  country: 'Rwanda',  countryCode: 'RW', flag: '🇷🇼', slug: 'rwanda',             competitions: ['c6','c7'], founded: 1972, stadium: 'Amahoro National Stadium', followersCount: 2840, recentForm: ['W','L','D','W','D'] },
  { id: 't8', name: 'Morocco',           shortName: 'Morocco', country: 'Morocco', countryCode: 'MA', flag: '🇲🇦', slug: 'morocco',            competitions: ['c6','c7'], founded: 1955, stadium: 'Stade Mohammed V',   followersCount: 1920, recentForm: ['W','W','W','W','D'] },
];

export const teamsAvatars: Record<string, string> = {
  't1': 'https://assets.football-logos.cc/logos/spain/256x256/real-madrid.5ce15611.png',
  't2': 'https://assets.football-logos.cc/logos/england/256x256/manchester-united.7ab9d343.png',
  't3': 'https://assets.football-logos.cc/logos/england/256x256/chelsea.fe8d2c2e.png',
  't4': 'https://assets.football-logos.cc/logos/france/256x256/paris-saint-germain.579907dc.png',
  't5': 'https://assets.football-logos.cc/logos/england/256x256/arsenal.e5528ede.png',
  't6': 'https://assets.football-logos.cc/logos/germany/256x256/bayern-munchen.6c38f13a.png',
  't7': 'https://i.pravatar.cc/150?img=30',
  't8': 'https://i.pravatar.cc/150?img=31',
};

// Enrich teams with avatar
export const enrichedTeams: Team[] = teamsList.map(t => ({ ...t, avatar: teamsAvatars[t.id] ?? '' }));
export const teamsMap: Record<string, Team> = Object.fromEntries(enrichedTeams.map(t => [t.id, t]));

// ─────────────────────────────────────────────────────────────
//  COMPETITIONS
// ─────────────────────────────────────────────────────────────
export const competitionsList: Competition[] = [
  { id: 'c1', name: 'UEFA Champions League', shortName: 'UCL',      slug: 'champions-league',   country: 'Europe',       countryCode: 'EU', logo: '🏆', currentSeason: '2025/26', type: 'cup',           followersCount: 3820 },
  { id: 'c2', name: 'Premier League',        shortName: 'EPL',      slug: 'premier-league',     country: 'England',      countryCode: 'GB', logo: '🦁', currentSeason: '2025/26', type: 'league',        followersCount: 2940 },
  { id: 'c3', name: 'La Liga',               shortName: 'LaLiga',   slug: 'la-liga',            country: 'Spain',        countryCode: 'ES', logo: '⚽', currentSeason: '2025/26', type: 'league',        followersCount: 1860 },
  { id: 'c4', name: 'Ligue 1',               shortName: 'Ligue 1',  slug: 'ligue-1',            country: 'France',       countryCode: 'FR', logo: '⚽', currentSeason: '2025/26', type: 'league',        followersCount:  940 },
  { id: 'c5', name: 'Bundesliga',            shortName: 'Bund.',    slug: 'bundesliga',         country: 'Germany',      countryCode: 'DE', logo: '⚽', currentSeason: '2025/26', type: 'league',        followersCount: 1120 },
  { id: 'c6', name: 'AFCON 2026',            shortName: 'AFCON',    slug: 'afcon',              country: 'Africa',       countryCode: 'AF', logo: '🌍', currentSeason: '2026',    type: 'international', followersCount: 4210 },
  { id: 'c7', name: 'FIFA World Cup 2026',   shortName: 'World Cup',slug: 'world-cup',          country: 'International',countryCode: 'WW', logo: '🌐', currentSeason: '2026',    type: 'international', followersCount: 8940 },
  { id: 'c8', name: 'Rwanda Premier League', shortName: 'RPL',      slug: 'rwanda-premier-league', country: 'Rwanda',  countryCode: 'RW', logo: '🇷🇼', currentSeason: '2025/26', type: 'league',       followersCount: 5630 },
];
export const competitionsMap: Record<string, Competition> = Object.fromEntries(competitionsList.map(c => [c.id, c]));

// ─────────────────────────────────────────────────────────────
//  COUNTRIES
// ─────────────────────────────────────────────────────────────
export const countriesList: Country[] = [
  { code: 'RW', name: 'Rwanda',  flag: '🇷🇼', slug: 'rwanda',  teamIds: ['t7'], competitionIds: ['c8'] },
  { code: 'ES', name: 'Spain',   flag: '🇪🇸', slug: 'spain',   teamIds: ['t1'], competitionIds: ['c3'] },
  { code: 'GB', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', slug: 'england', teamIds: ['t2','t3','t5'], competitionIds: ['c2'] },
  { code: 'FR', name: 'France',  flag: '🇫🇷', slug: 'france',  teamIds: ['t4'], competitionIds: ['c4'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', slug: 'germany', teamIds: ['t6'], competitionIds: ['c5'] },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', slug: 'morocco', teamIds: ['t8'], competitionIds: ['c6'] },
];

// ─────────────────────────────────────────────────────────────
//  MATCHES  (with dates for match explorer)
// ─────────────────────────────────────────────────────────────
export const matchesList: Match[] = [
  {
    id: 'm1', slug: 'm1',
    competition: 'FIFA World Cup', competitionId: 'c7', stage: 'Final',
    home: 't1', away: 't2', status: 'scheduled',
    kickoff: '2026-06-21T20:00:00Z', kickoffDate: '2026-06-21', minute: '20:00',
    stadium: 'Lusail Stadium', country: 'Qatar',
    homeScore: null, awayScore: null, totalPredictions: 423,
    predictionStats: { homeWin: 52, draw: 18, awayWin: 30 },
    userPrediction: { homeScore: 2, awayScore: 1, pointsReward: 5 },
    venues: ['v1','v3','v6'], followersCount: 312,
    overview: {
      homeForm: ['W','W','D','W','L'], awayForm: ['W','D','W','W','W'],
      homeRank: 1, awayRank: 3,
      lastMeetings: [{ homeScore: 2, awayScore: 1, date: '2025-11-12' }, { homeScore: 0, awayScore: 0, date: '2025-03-01' }],
    },
    isSaved: true, checkIns: [{ venueId: 'v1', venueName: 'Goal! Lounge', count: 15 }, { venueId: 'v3', venueName: 'Kick Off Arena', count: 8 }],
  },
  {
    id: 'm2', slug: 'm2',
    competition: 'Champions League', competitionId: 'c1', stage: 'Semi Final',
    home: 't3', away: 't4', status: 'live', minute: '67',
    kickoff: '2026-06-20T19:00:00Z', kickoffDate: '2026-06-20',
    stadium: 'Stamford Bridge', country: 'England',
    homeScore: 2, awayScore: 1, totalPredictions: 632,
    predictionStats: { homeWin: 41, draw: 22, awayWin: 37 },
    venues: ['v2','v5'], followersCount: 489, isSaved: false,
    checkIns: [{ venueId: 'v2', venueName: 'Fan Zone Kigali', count: 22 }, { venueId: 'v5', venueName: '90 Minutes Sports Hub', count: 31 }],
  },
  {
    id: 'm3', slug: 'm3',
    competition: 'Champions League', competitionId: 'c1', stage: 'Quarter Final',
    home: 't5', away: 't6', status: 'fulltime',
    kickoff: '2026-06-19T18:45:00Z', kickoffDate: '2026-06-19',
    stadium: 'Emirates Stadium', country: 'England',
    homeScore: 3, awayScore: 2, totalPredictions: 811,
    predictionStats: { homeWin: 60, draw: 15, awayWin: 25 },
    venues: ['v1','v4'], followersCount: 634, isSaved: true, checkIns: [],
  },
  {
    id: 'm4', slug: 'm4',
    competition: 'Champions League', competitionId: 'c1', stage: 'Quarter Final',
    home: 't1', away: 't6', status: 'fulltime',
    kickoff: '2026-06-19T21:00:00Z', kickoffDate: '2026-06-19',
    stadium: 'Santiago Bernabéu', country: 'Spain',
    homeScore: 1, awayScore: 2, totalPredictions: 811,
    predictionStats: { homeWin: 60, draw: 15, awayWin: 25 },
    venues: ['v1','v4'], followersCount: 521, isSaved: true, checkIns: [],
  },
  {
    id: 'm5', slug: 'm5',
    competition: 'AFCON', competitionId: 'c6', stage: 'Group Stage',
    home: 't7', away: 't8', status: 'scheduled',
    kickoff: '2026-06-22T17:00:00Z', kickoffDate: '2026-06-22', minute: '17:00',
    stadium: 'Amahoro National Stadium', country: 'Rwanda',
    homeScore: null, awayScore: null, totalPredictions: 198,
    predictionStats: { homeWin: 45, draw: 25, awayWin: 30 },
    venues: ['v2','v3','v7'], followersCount: 1842, isSaved: false, checkIns: [],
  },
  {
    id: 'm6', slug: 'm6',
    competition: 'Rwanda Premier League', competitionId: 'c8', stage: 'Match Day 22',
    home: 't2', away: 't4', status: 'live', minute: '34',
    kickoff: '2026-06-20T15:00:00Z', kickoffDate: '2026-06-20',
    stadium: 'Kigali Pelé Stadium', country: 'Rwanda',
    homeScore: 1, awayScore: 0, totalPredictions: 312,
    predictionStats: { homeWin: 55, draw: 20, awayWin: 25 },
    venues: ['v4','v5','v6'], followersCount: 924, isSaved: false,
    checkIns: [{ venueId: 'v4', venueName: 'The Dugout', count: 7 }],
  },
  {
    id: 'm7', slug: 'm7',
    competition: 'Premier League', competitionId: 'c2', stage: 'Match Day 38',
    home: 't5', away: 't2', status: 'scheduled',
    kickoff: '2026-06-22T15:00:00Z', kickoffDate: '2026-06-22', minute: '15:00',
    stadium: 'Emirates Stadium', country: 'England',
    homeScore: null, awayScore: null, totalPredictions: 156,
    predictionStats: { homeWin: 48, draw: 24, awayWin: 28 },
    venues: ['v1','v6'], followersCount: 387, isSaved: false, checkIns: [],
  },
  {
    id: 'm8', slug: 'm8',
    competition: 'Champions League', competitionId: 'c1', stage: 'Group Stage',
    home: 't4', away: 't6', status: 'postponed',
    kickoff: '2026-06-18T20:00:00Z', kickoffDate: '2026-06-18',
    stadium: 'Parc des Princes', country: 'France',
    homeScore: null, awayScore: null, totalPredictions: 89,
    predictionStats: { homeWin: 55, draw: 18, awayWin: 27 },
    venues: [], followersCount: 201, isSaved: false, checkIns: [],
  },
];

// ─────────────────────────────────────────────────────────────
//  VENUES
// ─────────────────────────────────────────────────────────────
export const venuesList: Venue[] = [
  {
    id: 'v1', name: 'Goal! Lounge', slug: 'goal-lounge',
    thumbnail: '/images/venue/image1.jpg', place: 'Nyarutarama, Kigali',
    rating: [{ id: 'r1', name: 'Patrick', msg: 'Great atmosphere during Champions League nights.', rating: 5, date: '2026-05-12' }],
    about: 'Popular football viewing lounge with multiple HD screens, food platters and weekend live entertainment.',
    screens: 8, capacity: 120, food: true, drinks: true, wifi: true, parking: true,
    contact: { address: 'KG 9 Ave', phone: '250788111222', city: 'Kigali', entry: 2000 },
    coordinates: { lat: -1.9441, lng: 30.0619 },
    matches: ['m1','m2','m4'], friends: ['p1','p5','p9'],
    followersCount: 284, activeCheckIns: 15, openingHours: '14:00 – 00:00',
    tags: ['Champions League', 'EPL', 'AFCON'],
  },
  {
    id: 'v2', name: 'Fan Zone Kigali', slug: 'fan-zone-kigali',
    thumbnail: '/images/venue/image2.jpg', place: 'Kimihurura, Kigali',
    rating: [{ id: 'r2', name: 'Aline', msg: 'One of the best places for EPL weekends.', rating: 4, date: '2026-04-28' }],
    about: 'Modern sports bar featuring giant projector screens and a dedicated football fan community.',
    screens: 6, capacity: 90, food: true, drinks: true, wifi: true, parking: false,
    contact: { address: 'KG 28 Ave', phone: '250788333444', city: 'Kigali', entry: 1500 },
    coordinates: { lat: -1.9536, lng: 30.0894 },
    matches: ['m2','m5','m6'], friends: ['p2','p6'],
    followersCount: 196, activeCheckIns: 22, openingHours: '12:00 – 23:00',
    tags: ['EPL', 'Champions League', 'AFCON'],
  },
  {
    id: 'v3', name: 'Kick Off Arena', slug: 'kick-off-arena',
    thumbnail: '/images/venue/image3.jpg', place: 'Remera, Kigali',
    rating: [{ id: 'r3', name: 'Eric', msg: 'Huge screen and amazing crowd energy.', rating: 5, date: '2026-05-03' }],
    about: 'Known for big match screenings and affordable food combos.',
    screens: 5, capacity: 150, food: true, drinks: true, wifi: false, parking: true,
    contact: { address: 'KN 5 Rd', phone: '250788555666', city: 'Kigali', entry: 1000 },
    coordinates: { lat: -1.9570, lng: 30.1127 },
    matches: ['m1','m5'], friends: ['p7','p11','p14'],
    followersCount: 312, activeCheckIns: 8, openingHours: '11:00 – 23:30',
    tags: ['World Cup', 'AFCON', 'Budget-friendly'],
  },
  {
    id: 'v4', name: 'The Dugout', slug: 'the-dugout',
    thumbnail: '/images/venue/image4.jpg', place: 'Kacyiru, Kigali',
    rating: [{ id: 'r4', name: 'Sandrine', msg: 'Comfortable seating and excellent service.', rating: 4, date: '2026-03-19' }],
    about: 'Relaxed football lounge with indoor and outdoor viewing areas.',
    screens: 4, capacity: 40, food: true, drinks: true, wifi: true, parking: false,
    contact: { address: 'KG 7 Ave', phone: '250788777888', city: 'Kigali', entry: 2500 },
    coordinates: { lat: -1.9480, lng: 30.0643 },
    matches: ['m3','m4','m6'], friends: ['p8','p4'],
    followersCount: 134, activeCheckIns: 7, openingHours: '14:00 – 23:00',
    tags: ['Cozy', 'RPL', 'Champions League'],
  },
  {
    id: 'v5', name: '90 Minutes Sports Hub', slug: '90-minutes-sports-hub',
    thumbnail: '/images/venue/image5.jpg', place: 'Gisozi, Kigali',
    rating: [{ id: 'r5', name: 'Mugisha', msg: 'Perfect place for watching multiple matches.', rating: 5, date: '2026-06-01' }],
    about: 'Dedicated sports venue showing simultaneous football fixtures.',
    screens: 10, capacity: 180, food: true, drinks: true, wifi: true, parking: true,
    contact: { address: 'KG 622 St', phone: '250788999000', city: 'Kigali', entry: 3000 },
    coordinates: { lat: -1.9218, lng: 30.0632 },
    matches: ['m2','m6'], friends: ['p9','p13','p16'],
    followersCount: 421, activeCheckIns: 31, openingHours: '10:00 – 00:00',
    tags: ['Multi-screen', 'RPL', 'Champions League'],
  },
  {
    id: 'v6', name: 'Champions Corner', slug: 'champions-corner',
    thumbnail: '/images/venue/image2.jpg', place: 'Kimironko, Kigali',
    rating: [{ id: 'r6', name: 'Kevin', msg: 'Good sound system and tasty food.', rating: 4, date: '2026-05-22' }],
    about: 'Football-focused venue with premium match-day experiences.',
    screens: 7, capacity: 110, food: true, drinks: true, wifi: true, parking: true,
    contact: { address: 'KG 11 Ave', phone: '250788123456', city: 'Kigali', entry: 2000 },
    coordinates: { lat: -1.9389, lng: 30.1002 },
    matches: ['m1','m2','m6'], friends: ['p11','p15'],
    followersCount: 267, activeCheckIns: 0, openingHours: '13:00 – 23:30',
    tags: ['Champions League', 'World Cup'],
  },
  {
    id: 'v7', name: 'Extra Time Lounge', slug: 'extra-time-lounge',
    thumbnail: '/images/venue/image2.jpg', place: 'Kabeza, Kigali',
    rating: [{ id: 'r7', name: 'Bella', msg: 'My favorite place for Champions League finals.', rating: 5, date: '2026-05-30' }],
    about: 'Spacious viewing center popular for international football tournaments.',
    screens: 9, capacity: 200, food: true, drinks: true, wifi: true, parking: true,
    contact: { address: 'KK 15 Rd', phone: '250788654321', city: 'Kigali', entry: 3500 },
    coordinates: { lat: -1.9728, lng: 30.1221 },
    matches: ['m5'], friends: ['p18','p1','p3','p6'],
    followersCount: 389, activeCheckIns: 0, openingHours: '12:00 – 00:00',
    tags: ['AFCON', 'World Cup', 'Premium'],
  },
];
export const venuesMap: Record<string, Venue> = Object.fromEntries(venuesList.map(v => [v.id, v]));

// ─────────────────────────────────────────────────────────────
//  PREDICTIONS SIDEBAR
// ─────────────────────────────────────────────────────────────
export const predictionsList: Prediction[] = [
  { id: 'pr1', home: 't1', away: 't2', predictions: 322, stadium: 'Santiago Bernabéu',  competition: 'Champions League' },
  { id: 'pr2', home: 't3', away: 't4', predictions: 417, stadium: 'Stamford Bridge',    competition: 'Champions League' },
  { id: 'pr3', home: 't5', away: 't6', predictions: 548, stadium: 'Emirates Stadium',   competition: 'Champions League' },
];

// ─────────────────────────────────────────────────────────────
//  USER PROFILE
// ─────────────────────────────────────────────────────────────
export const userProfile: UserProfile = {
  id: 'USR-847291',
  pic: 'https://cdn.dribbble.com/users/24593303/avatars/normal/756dab07ef0b0519b20654d29eba783d.png?1766760445',
  username: 'abafan_kigali', fullname: 'Arkon Studio',
  email: 'fan@abafans.rw',
  bio: 'Football fanatic based in Kigali. Never miss a match day. Predictions addict.',
  location: 'Kigali, Rwanda', website: 'https://abafans.rw',
  role: 'Fan', company: 'AbaFans',
  joinedAt: '2026-01-15', lastActive: '2 hours ago',
  followers: 312, following: 98, posts: 47, verified: false,
  favoriteTeamId: 't7',
  stats: { projects: 0, clients: 0, reviews: 0, rating: 4.5 },
  socials: { instagram: '@abafans', x: '@abafans' },
  preferences: { theme: 'dark', language: 'en', notifications: true, pushNotifications: true, emailNotifications: false, whatsappNotifications: true },
  reputation: {
    points: 312, level: 7, levelName: 'Rising Fan',
    badges: [
      { id: 'streak_5', name: 'Streak Master', description: '5-day prediction streak', icon: '🔥', earnedAt: '2026-05-10' },
      { id: 'venue_explorer', name: 'Venue Explorer', description: 'Checked in at 3+ venues', icon: '📍', earnedAt: '2026-04-15' },
    ],
    totalCheckIns: 8, totalPredictions: 56, correctPredictions: 40,
    streak: 5, bestStreak: 8, weeklyPoints: 45, monthlyPoints: 180, rank: 23, weeklyRank: 14,
  },
};

// ─────────────────────────────────────────────────────────────
//  COMMUNITY ROOMS
// ─────────────────────────────────────────────────────────────
export const communityRooms: CommunityRoom[] = [
  { id: 'room-m1', type: 'match', referenceId: 'm1', name: 'Real Madrid vs Man Utd 🔥', slug: 'real-madrid-vs-man-utd', isPermanent: false, expiresAt: '2026-06-22T22:00:00Z', messageCount: 147, activeUsers: 23, createdAt: '2026-06-20T00:00:00Z' },
  { id: 'room-m2', type: 'match', referenceId: 'm2', name: 'Chelsea vs PSG LIVE 💥',    slug: 'chelsea-vs-psg-live',   isPermanent: false, expiresAt: '2026-06-21T21:00:00Z', messageCount: 412, activeUsers: 89, createdAt: '2026-06-20T00:00:00Z' },
  { id: 'room-v1', type: 'venue', referenceId: 'v1', name: 'Goal! Lounge Watch Party',  slug: 'goal-lounge-chat',      isPermanent: false, expiresAt: '2026-06-21T00:00:00Z', messageCount: 34,  activeUsers: 11, createdAt: '2026-06-20T00:00:00Z' },
  { id: 'room-gen', type: 'general',   referenceId: 'gen',  name: 'Football Talk',          slug: 'football-talk',         isPermanent: true, messageCount: 892, activeUsers: 44, createdAt: '2026-01-01T00:00:00Z' },
  { id: 'room-sup', type: 'support',   referenceId: 'sup',  name: 'Support',                slug: 'support',               isPermanent: true, messageCount: 128, activeUsers: 3,  createdAt: '2026-01-01T00:00:00Z' },
  { id: 'room-ann', type: 'announcement', referenceId: 'ann', name: 'Announcements',        slug: 'announcements',         isPermanent: true, messageCount: 12,  activeUsers: 0,  createdAt: '2026-01-01T00:00:00Z' },
];

// ─────────────────────────────────────────────────────────────
//  ALL BADGES
// ─────────────────────────────────────────────────────────────
export const allBadges: Badge[] = [
  { id: 'top_predictor',    name: 'Top Predictor',    description: 'Correct predictions leader for a week',  icon: '🎯' },
  { id: 'super_fan',        name: 'Super Fan',        description: 'Logged in every day for a month',         icon: '⭐' },
  { id: 'venue_explorer',   name: 'Venue Explorer',   description: 'Checked in at 3+ different venues',       icon: '📍' },
  { id: 'community_leader', name: 'Community Leader', description: '50+ helpful messages in discussions',      icon: '💬' },
  { id: 'matchday_legend',  name: 'Matchday Legend',  description: 'Perfect score prediction in a major match',icon: '🏆' },
  { id: 'early_adopter',    name: 'Early Adopter',    description: 'Joined AbaFans in the first month',        icon: '🚀' },
  { id: 'streak_5',         name: 'Streak 5',         description: '5-day correct prediction streak',          icon: '🔥' },
  { id: 'streak_10',        name: 'Streak 10',        description: '10-day correct prediction streak',         icon: '💎' },
  { id: 'perfect_week',     name: 'Perfect Week',     description: 'All correct predictions in one week',      icon: '✨' },
];

// ─────────────────────────────────────────────────────────────
//  BRAND
// ─────────────────────────────────────────────────────────────
export const brandInfo: BrandInfo = {
  name: 'AbaFans',
  phoneMain: '250788967812',
  emailMain: 'hello@abafans.rw',
  socials: { x: 'abafans', facebook: 'abafans', instagram: 'abafans', youtube: 'abafans' },
  siteUrl: 'https://abafans.rw',
  tagline: 'Never miss a match. Predict, watch, and connect.',
  description: 'AbaFans is Rwanda\'s football match-day platform. Predict scores, find sports bars and venues, follow fixtures, compete on leaderboards, and enjoy every match.',
};

// ─────────────────────────────────────────────────────────────
//  UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

export function getTeamById(id: string)        { return teamsMap[id]; }
export function getMatchById(id: string)        { return matchesList.find(m => m.id === id); }
export function getVenueById(id: string)        { return venuesMap[id]; }
export function getPersonById(id: string)       { return peopleList.find(p => p.id === id); }
export function getCompetitionById(id: string)  { return competitionsMap[id]; }
export function getVenueBySlug(slug: string)    { return venuesList.find(v => v.slug === slug); }
export function getMatchBySlug(slug: string)    { return matchesList.find(m => m.id === slug); }
export function getTeamBySlug(slug: string)     { return enrichedTeams.find(t => t.slug === slug); }
export function getCompetitionBySlug(slug: string) { return competitionsList.find(c => c.slug === slug); }
export function getCountryBySlug(slug: string)  { return countriesList.find(c => c.slug === slug); }

export function getMatchStatusLabel(status: string): string {
  const map: Record<string, string> = {
    scheduled:'SCH', live:'LIVE', halftime:'HT', extratime:'ET',
    penalties:'PEN', fulltime:'FT', postponed:'PPD', suspended:'SUSP', abandoned:'ABD',
  };
  return map[status] ?? '';
}

export function formatPhoneNumber(phone: string | number): string {
  const d = String(phone).replace(/\D/g, '');
  return d.length === 12 ? d.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4') : String(phone);
}

export function buildWhatsAppMatchShare(matchId: string): string {
  const m = getMatchById(matchId);
  if (!m) return 'https://wa.me/';
  const home = getTeamById(m.home);
  const away = getTeamById(m.away);
  const score = m.homeScore !== null && m.awayScore !== null ? `${m.homeScore} - ${m.awayScore}` : 'TBD';
  const text = encodeURIComponent(`⚽ ${m.competition} | ${m.stage}\n${home?.name} vs ${away?.name}\nScore: ${score}\n📍 ${m.stadium}\n\nPredict on AbaFans 🇷🇼\n${brandInfo.siteUrl}`);
  return `https://wa.me/?text=${text}`;
}

export function buildWhatsAppVenueShare(venueId: string): string {
  const v = getVenueById(venueId);
  if (!v) return 'https://wa.me/';
  const text = encodeURIComponent(`📍 ${v.name} – ${v.place}\n🖥️ ${v.screens} screens | 👥 ${v.capacity} cap\nEntry: ${v.contact.entry} RWF\n\nFind venues on AbaFans 🇷🇼\n${brandInfo.siteUrl}`);
  return `https://wa.me/?text=${text}`;
}

export function getMatchesForDate(dateStr: string): Match[] {
  return matchesList.filter(m => m.kickoffDate === dateStr);
}

export function getMatchesForDateRange(from: string, to: string): Match[] {
  return matchesList.filter(m => m.kickoffDate && m.kickoffDate >= from && m.kickoffDate <= to);
}

export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export function getRelativeDateLabel(dateStr: string): string {
  const today = getTodayISO();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const tomorrow  = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  if (dateStr === today)     return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  if (dateStr === tomorrow)  return 'Tomorrow';
  return new Date(dateStr).toLocaleDateString('en-RW', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function getMatchUrl(match: Match): string {
  return `/matches/${match.id}`;
}

export function getVenueUrl(venue: Venue): string {
  return `/venues/${venue.slug}`;
}

export function getTeamUrl(team: Team): string {
  return `/team/${team.slug}`;
}

export function getCompetitionUrl(comp: Competition): string {
  return `/competition/${comp.slug}`;
}
