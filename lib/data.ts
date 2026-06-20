import type { Match, Venue, Person, Prediction, Team, UserProfile } from '@/types';

export const peopleList: Person[] = [
  { id: 'p1', name: 'Kamaliza', points: 423, avatar: 'https://i.pravatar.cc/150?img=1', totalPredictions: 95, correctPredictions: 76, streak: 8, joinedAt: '2026-01-15' },
  { id: 'p2', name: 'Aline', points: 498, avatar: 'https://i.pravatar.cc/150?img=2', totalPredictions: 88, correctPredictions: 69, streak: 6, joinedAt: '2026-02-03' },
  { id: 'p3', name: 'Jean Claude', points: 385, avatar: 'https://i.pravatar.cc/150?img=3', totalPredictions: 82, correctPredictions: 65, streak: 4, joinedAt: '2026-01-21' },
  { id: 'p4', name: 'Diane', points: 372, avatar: 'https://i.pravatar.cc/150?img=4', totalPredictions: 79, correctPredictions: 62, streak: 5, joinedAt: '2026-02-11' },
  { id: 'p5', name: 'Patrick', points: 360, avatar: 'https://i.pravatar.cc/150?img=5', totalPredictions: 77, correctPredictions: 60, streak: 7, joinedAt: '2026-03-05' },
  { id: 'p6', name: 'Olivia', points: 344, avatar: 'https://i.pravatar.cc/150?img=6', totalPredictions: 74, correctPredictions: 57, streak: 3, joinedAt: '2026-02-16' },
  { id: 'p7', name: 'Eric', points: 331, avatar: 'https://i.pravatar.cc/150?img=7', totalPredictions: 72, correctPredictions: 55, streak: 4, joinedAt: '2026-03-18' },
  { id: 'p8', name: 'Sandrine', points: 320, avatar: 'https://i.pravatar.cc/150?img=8', totalPredictions: 70, correctPredictions: 53, streak: 2, joinedAt: '2026-04-02' },
  { id: 'p9', name: 'Mugisha', points: 309, avatar: 'https://i.pravatar.cc/150?img=9', totalPredictions: 68, correctPredictions: 51, streak: 6, joinedAt: '2026-01-29' },
  { id: 'p10', name: 'Grace', points: 297, avatar: 'https://i.pravatar.cc/150?img=10', totalPredictions: 66, correctPredictions: 49, streak: 1, joinedAt: '2026-02-25' },
  { id: 'p11', name: 'Kevin', points: 285, avatar: 'https://i.pravatar.cc/150?img=11', totalPredictions: 63, correctPredictions: 47, streak: 5, joinedAt: '2026-03-12' },
  { id: 'p12', name: 'Alice', points: 274, avatar: 'https://i.pravatar.cc/150?img=12', totalPredictions: 60, correctPredictions: 45, streak: 2, joinedAt: '2026-04-01' },
  { id: 'p13', name: 'Samuel', points: 260, avatar: 'https://i.pravatar.cc/150?img=13', totalPredictions: 58, correctPredictions: 43, streak: 3, joinedAt: '2026-04-08' },
  { id: 'p14', name: 'Yvette', points: 248, avatar: 'https://i.pravatar.cc/150?img=14', totalPredictions: 55, correctPredictions: 40, streak: 4, joinedAt: '2026-04-22' },
  { id: 'p15', name: 'Emmanuel', points: 236, avatar: 'https://i.pravatar.cc/150?img=15', totalPredictions: 52, correctPredictions: 38, streak: 1, joinedAt: '2026-05-03' },
  { id: 'p16', name: 'Vanessa', points: 224, avatar: 'https://i.pravatar.cc/150?img=16', totalPredictions: 49, correctPredictions: 36, streak: 2, joinedAt: '2026-05-11' },
  { id: 'p17', name: 'Thierry', points: 210, avatar: 'https://i.pravatar.cc/150?img=17', totalPredictions: 45, correctPredictions: 33, streak: 3, joinedAt: '2026-05-19' },
  { id: 'p18', name: 'Bella', points: 338, avatar: 'https://i.pravatar.cc/150?img=18', totalPredictions: 42, correctPredictions: 30, streak: 1, joinedAt: '2026-05-25' },
];

export const teamsList: Team[] = [
  { id: 't1', name: 'Real Madrid', shortName: 'Real', country: 'Spain', avatar: 'https://assets.football-logos.cc/logos/spain/256x256/real-madrid.5ce15611.png' },
  { id: 't2', name: 'Manchester United', shortName: 'Man Utd', country: 'England', avatar: 'https://assets.football-logos.cc/logos/england/256x256/manchester-united.7ab9d343.png' },
  { id: 't3', name: 'Chelsea', shortName: 'Chelsea', country: 'England', avatar: 'https://assets.football-logos.cc/logos/england/256x256/chelsea.fe8d2c2e.png' },
  { id: 't4', name: 'Paris Saint-Germain', shortName: 'PSG', country: 'France', avatar: 'https://assets.football-logos.cc/logos/france/256x256/paris-saint-germain.579907dc.png' },
  { id: 't5', name: 'Arsenal', shortName: 'Arsenal', country: 'England', avatar: 'https://assets.football-logos.cc/logos/england/256x256/arsenal.e5528ede.png' },
  { id: 't6', name: 'Bayern Munich', shortName: 'Bayern', country: 'Germany', avatar: 'https://assets.football-logos.cc/logos/germany/256x256/bayern-munchen.6c38f13a.png' },
];

export const matchesList: Match[] = [
  {
    id: 'm1',
    competition: 'FIFA World Cup',
    stage: 'Final',
    home: 't1',
    away: 't2',
    status: 'scheduled',
    kickoff: '2026-07-19T22:58:00Z',
    minute: '22:58',
    stadium: 'Lusail Stadium',
    homeScore: null,
    awayScore: null,
    totalPredictions: 423,
    predictionStats: { homeWin: 52, draw: 18, awayWin: 30 },
    userPrediction: { homeScore: 2, awayScore: 1, pointsReward: 5 },
    venues: ['v1', 'v3', 'v6'],
    overview: {
      homeForm: ['W', 'W', 'D', 'W', 'L'],
      awayForm: ['W', 'D', 'W', 'W', 'W'],
      homeRank: 1,
      awayRank: 3,
      lastMeetings: [
        { homeScore: 2, awayScore: 1, date: '2025-11-12' },
        { homeScore: 0, awayScore: 0, date: '2025-03-01' },
      ],
    },
    isSaved: true,
  },
  {
    id: 'm2',
    competition: 'Champions League',
    stage: 'Semi Final',
    home: 't3',
    away: 't4',
    status: 'live',
    minute: '67',
    stadium: 'Stamford Bridge',
    homeScore: 2,
    awayScore: 1,
    totalPredictions: 632,
    predictionStats: { homeWin: 41, draw: 22, awayWin: 37 },
    venues: ['v2', 'v5'],
    isSaved: false,
  },
  {
    id: 'm3',
    competition: 'Champions League',
    stage: 'Quarter Final',
    home: 't5',
    away: 't6',
    status: 'fulltime',
    stadium: 'Emirates Stadium',
    homeScore: 3,
    awayScore: 2,
    totalPredictions: 811,
    predictionStats: { homeWin: 60, draw: 15, awayWin: 25 },
    venues: ['v1', 'v4'],
    isSaved: true,
  },
  {
    id: 'm4',
    competition: 'Champions League',
    stage: 'Quarter Final',
    home: 't5',
    away: 't6',
    status: 'fulltime',
    stadium: 'Saint Bernabeu',
    homeScore: 1,
    awayScore: 2,
    totalPredictions: 811,
    predictionStats: { homeWin: 60, draw: 15, awayWin: 25 },
    venues: ['v1', 'v4'],
    isSaved: true,
  },
  {
    id: 'm5',
    competition: 'AFCON',
    stage: 'Group Stage',
    home: 't1',
    away: 't5',
    status: 'scheduled',
    kickoff: '2026-07-20T19:00:00Z',
    minute: '19:00',
    stadium: 'Amahoro National Stadium',
    homeScore: null,
    awayScore: null,
    totalPredictions: 198,
    predictionStats: { homeWin: 45, draw: 25, awayWin: 30 },
    venues: ['v2', 'v3', 'v7'],
    isSaved: false,
  },
  {
    id: 'm6',
    competition: 'Rwanda Premier League',
    stage: 'Match Day 22',
    home: 't2',
    away: 't4',
    status: 'live',
    minute: '34',
    stadium: 'Kigali Pelé Stadium',
    homeScore: 1,
    awayScore: 0,
    totalPredictions: 312,
    predictionStats: { homeWin: 55, draw: 20, awayWin: 25 },
    venues: ['v4', 'v5', 'v6'],
    isSaved: false,
  },
];

export const venuesList: Venue[] = [
  {
    id: 'v1',
    name: 'Goal! Lounge',
    thumbnail: '/images/venue/image1.jpg',
    place: 'Nyarutarama, Kigali',
    rating: [{ id: 'r1', name: 'Patrick', msg: 'Great atmosphere during Champions League nights.' }],
    about: 'Popular football viewing lounge with multiple HD screens, food platters and weekend live entertainment.',
    screens: 8,
    capacity: 120,
    food: true,
    drinks: true,
    contact: { address: 'KG 9 Ave', phone: '250788111222', city: 'Kigali', entry: 2000 },
    matches: ['m4', 'm2', 'm1'],
    friends: ['p1', 'p5', 'p9'],
  },
  {
    id: 'v2',
    name: 'Fan Zone Kigali',
    thumbnail: '/images/venue/image2.jpg',
    place: 'Kimihurura, Kigali',
    rating: [{ id: 'r2', name: 'Aline', msg: 'One of the best places for EPL weekends.' }],
    about: 'Modern sports bar featuring giant projector screens and a dedicated football fan community.',
    screens: 6,
    capacity: 90,
    food: true,
    drinks: true,
    contact: { address: 'KG 28 Ave', phone: '250788333444', city: 'Kigali', entry: 1500 },
    matches: ['m4', 'm2', 'm1'],
    friends: ['p2', 'p6'],
  },
  {
    id: 'v3',
    name: 'Kick Off Arena',
    thumbnail: '/images/venue/image3.jpg',
    place: 'Remera, Kigali',
    rating: [{ id: 'r3', name: 'Eric', msg: 'Huge screen and amazing crowd energy.' }],
    about: 'Known for big match screenings and affordable food combos.',
    screens: 5,
    capacity: 150,
    food: true,
    drinks: true,
    contact: { address: 'KN 5 Rd', phone: '250788555666', city: 'Kigali', entry: 1000 },
    matches: ['m4', 'm2', 'm1'],
    friends: ['p7', 'p11', 'p14'],
  },
  {
    id: 'v4',
    name: 'The Dugout',
    thumbnail: '/images/venue/image4.jpg',
    place: 'Kacyiru, Kigali',
    rating: [{ id: 'r4', name: 'Sandrine', msg: 'Comfortable seating and excellent service.' }],
    about: 'Relaxed football lounge with indoor and outdoor viewing areas.',
    screens: 4,
    capacity: 40,
    food: true,
    drinks: true,
    contact: { address: 'KG 7 Ave', phone: '250788777888', city: 'Kigali', entry: 2500 },
    matches: ['m2', 'm1'],
    friends: ['p8', 'p4'],
  },
  {
    id: 'v5',
    name: '90 Minutes Sports Hub',
    thumbnail: '/images/venue/image5.jpg',
    place: 'Gisozi, Kigali',
    rating: [{ id: 'r5', name: 'Mugisha', msg: 'Perfect place for watching multiple matches.' }],
    about: 'Dedicated sports venue showing simultaneous football fixtures.',
    screens: 10,
    capacity: 180,
    food: true,
    drinks: true,
    contact: { address: 'KG 622 St', phone: '250788999000', city: 'Kigali', entry: 3000 },
    matches: ['m4', 'm1'],
    friends: ['p9', 'p13', 'p16'],
  },
  {
    id: 'v6',
    name: 'Champions Corner',
    thumbnail: '/images/venue/image2.jpg',
    place: 'Kimironko, Kigali',
    rating: [{ id: 'r6', name: 'Kevin', msg: 'Good sound system and tasty food.' }],
    about: 'Football-focused venue with premium match-day experiences.',
    screens: 7,
    capacity: 110,
    food: true,
    drinks: true,
    contact: { address: 'KG 11 Ave', phone: '250788123456', city: 'Kigali', entry: 2000 },
    matches: ['m3', 'm2', 'm1'],
    friends: ['p11', 'p15'],
  },
  {
    id: 'v7',
    name: 'Extra Time Lounge',
    thumbnail: '/images/venue/image2.jpg',
    place: 'Kabeza, Kigali',
    rating: [{ id: 'r7', name: 'Bella', msg: 'My favorite place for Champions League finals.' }],
    about: 'Spacious viewing center popular for international football tournaments.',
    screens: 9,
    capacity: 200,
    food: true,
    drinks: true,
    contact: { address: 'KK 15 Rd', phone: '250788654321', city: 'Kigali', entry: 3500 },
    matches: ['m3', 'm2', 'm1'],
    friends: ['p18', 'p1', 'p3', 'p6'],
  },
];

export const predictionsList: Prediction[] = [
  { id: 'pr1', home: 't1', away: 't2', predictions: 322, stadium: 'Santiago Bernabéu', competition: 'Champions League' },
  { id: 'pr2', home: 't3', away: 't4', predictions: 417, stadium: 'Stamford Bridge', competition: 'Champions League' },
  { id: 'pr3', home: 't5', away: 't6', predictions: 548, stadium: 'Emirates Stadium', competition: 'Champions League' },
];

export const userProfile: UserProfile = {
  id: 'USR-847291',
  pic: 'https://cdn.dribbble.com/users/24593303/avatars/normal/756dab07ef0b0519b20654d29eba783d.png?1766760445',
  username: 'abafan_kigali',
  fullname: 'Arkon Studio',
  email: 'fan@abafans.rw',
  bio: 'Football fanatic based in Kigali. Never miss a match day. Predictions addict.',
  location: 'Kigali, Rwanda',
  website: 'https://abafans.rw',
  role: 'Fan',
  company: 'AbaFans',
  joinedAt: '2026-01-15',
  lastActive: '2 hours ago',
  followers: 312,
  following: 98,
  posts: 47,
  verified: false,
  stats: { projects: 0, clients: 0, reviews: 0, rating: 4.5 },
  socials: { instagram: '@abafans', x: '@abafans' },
  preferences: { theme: 'dark', language: 'en', notifications: true },
};

export const brandInfo = {
  name: 'AbaFans',
  phoneMain: '250788967812',
  emailMain: 'hello@abafans.rw',
  socials: { x: 'abafans', facebook: 'abafans', instagram: 'abafans', youtube: 'abafans' },
};

// ---- Utility functions ----

export function getTeamById(id: string): Team | undefined {
  return teamsList.find((t) => t.id === id);
}

export function getMatchById(id: string): Match | undefined {
  return matchesList.find((m) => m.id === id);
}

export function getVenueById(id: string): Venue | undefined {
  return venuesList.find((v) => v.id === id);
}

export function getPersonById(id: string): Person | undefined {
  return peopleList.find((p) => p.id === id);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return venuesList.find((v) => slugify(v.name) === slug);
}

export function getMatchBySlug(slug: string): Match | undefined {
  return matchesList.find((m) => m.id === slug);
}

export function getMatchStatusLabel(status: string): string {
  const map: Record<string, string> = {
    scheduled: 'SCH',
    live: 'LIVE',
    halftime: 'HT',
    extratime: 'ET',
    penalties: 'PEN',
    fulltime: 'FT',
    postponed: 'PPD',
    suspended: 'SUSP',
    abandoned: 'ABD',
  };
  return map[status] ?? '';
}

export function formatPhoneNumber(phone: string | number): string {
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length === 12) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  }
  return String(phone);
}

export function buildWhatsAppMatchShare(matchId: string): string {
  const match = getMatchById(matchId);
  if (!match) return 'https://wa.me/';
  const home = getTeamById(match.home);
  const away = getTeamById(match.away);
  const scoreStr =
    match.homeScore !== null && match.awayScore !== null
      ? `${match.homeScore} - ${match.awayScore}`
      : 'TBD';
  const text = encodeURIComponent(
    `⚽ ${match.competition} | ${match.stage}\n${home?.name} vs ${away?.name}\nScore: ${scoreStr}\n📍 ${match.stadium}\n\nWatch & predict on AbaFans 🇷🇼\nhttps://abafans.rw`
  );
  return `https://wa.me/?text=${text}`;
}

export function buildWhatsAppVenueShare(venueId: string): string {
  const venue = getVenueById(venueId);
  if (!venue) return 'https://wa.me/';
  const text = encodeURIComponent(
    `📍 ${venue.name} - ${venue.place}\n🖥️ ${venue.screens} screens | 👥 ${venue.capacity} capacity\nEntry: ${venue.contact.entry} RWF\n\nFind more venues on AbaFans 🇷🇼\nhttps://abafans.rw`
  );
  return `https://wa.me/?text=${text}`;
}

export const teamsMap = Object.fromEntries(teamsList.map((t) => [t.id, t]));
