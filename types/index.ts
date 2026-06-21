// ─────────────────────────────────────────────────────────────
//  AbaFans – Complete TypeScript Type System
//  Supabase-ready, API-first
// ─────────────────────────────────────────────────────────────

// ── Core Enums ────────────────────────────────────────────────

export type MatchStatus =
  | 'scheduled' | 'live' | 'halftime' | 'extratime'
  | 'penalties' | 'fulltime' | 'postponed' | 'suspended' | 'abandoned';

export type BadgeId =
  | 'top_predictor' | 'super_fan' | 'venue_explorer'
  | 'community_leader' | 'matchday_legend' | 'early_adopter'
  | 'streak_5' | 'streak_10' | 'perfect_week';

export type NotificationType =
  | 'match_start' | 'goal_alert' | 'match_end' | 'prediction_closing'
  | 'lineup_available' | 'checkin_activity' | 'community_mention'
  | 'leaderboard_movement' | 'venue_promotion' | 'announcement';

export type CommunityRoomType =
  | 'match' | 'venue' | 'team' | 'competition' | 'general' | 'support' | 'announcement';

export type FollowableType = 'match' | 'team' | 'competition' | 'venue' | 'user';

export type CheckInLocation = 'venue' | 'home' | 'friends' | 'work' | 'other';

// ── Teams ──────────────────────────────────────────────────────

export interface Team {
  id: string;
  name: string;
  shortName: string;
  country: string;
  countryCode: string;         // ISO 3166-1 alpha-2
  flag: string;                // emoji flag
  avatar: string;  // set via enrichedTeams
  slug: string;
  competitions: string[];      // competition IDs
  founded?: number;
  stadium?: string;
  coach?: string;
  followersCount: number;
  recentForm: FormResult[];
}

export type FormResult = 'W' | 'D' | 'L';

// ── Competitions ───────────────────────────────────────────────

export interface Competition {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  country: string;
  countryCode: string;
  logo: string;
  currentSeason: string;
  type: 'league' | 'cup' | 'international';
  followersCount: number;
}

export interface CompetitionStanding {
  position: number;
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

// ── Matches ────────────────────────────────────────────────────

export interface MatchPredictionStats {
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface UserPrediction {
  homeScore: number;
  awayScore: number;
  pointsReward: number;
}

export interface MatchOverview {
  homeForm: FormResult[];
  awayForm: FormResult[];
  homeRank: number;
  awayRank: number;
  lastMeetings: HeadToHead[];
}

export interface HeadToHead {
  homeScore: number;
  awayScore: number;
  date: string;
}

export interface CheckInSummary {
  venueId: string;
  venueName: string;
  count: number;
}

export interface Match {
  id: string;
  slug: string;
  competition: string;
  competitionId: string;
  stage: string;
  home: string;
  away: string;
  status: MatchStatus;
  kickoff?: string;
  kickoffDate?: string;        // YYYY-MM-DD
  minute?: string;
  stadium: string;
  country: string;
  homeScore: number | null;
  awayScore: number | null;
  totalPredictions: number;
  predictionStats?: MatchPredictionStats;
  userPrediction?: UserPrediction;
  venues: string[];
  overview?: MatchOverview;
  isSaved: boolean;
  checkIns?: CheckInSummary[];
  followersCount: number;
}

// ── Venues ─────────────────────────────────────────────────────

export interface VenueContact {
  address: string;
  phone: string;
  city: string;
  entry: number;
}

export interface VenueRating {
  id: string;
  name: string;
  msg: string;
  rating: number;
  date: string;
}

export interface VenueCoordinates {
  lat: number;
  lng: number;
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  place: string;
  rating: VenueRating[];
  about: string;
  screens: number;
  capacity: number;
  food: boolean;
  drinks: boolean;
  wifi: boolean;
  parking: boolean;
  contact: VenueContact;
  coordinates?: VenueCoordinates;
  matches: string[];
  friends: string[];
  followersCount: number;
  activeCheckIns: number;
  openingHours?: string;
  tags: string[];
}

// ── People / Users ─────────────────────────────────────────────

export interface Person {
  id: string;
  name: string;
  points: number;
  avatar: string;
  totalPredictions: number;
  correctPredictions: number;
  streak: number;
  joinedAt: string;
}

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface UserReputation {
  points: number;
  level: number;
  levelName: string;
  badges: Badge[];
  totalCheckIns: number;
  totalPredictions: number;
  correctPredictions: number;
  streak: number;
  bestStreak: number;
  weeklyPoints: number;
  monthlyPoints: number;
  rank: number;
  weeklyRank: number;
}

export interface UserProfile {
  id: string;
  pic: string;
  username: string;
  fullname: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  role: string;
  company: string;
  joinedAt: string;
  lastActive: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  favoriteTeamId?: string;
  stats: {
    projects: number;
    clients: number;
    reviews: number;
    rating: number;
  };
  socials: Record<string, string>;
  preferences: {
    theme: string;
    language: string;
    notifications: boolean;
    pushNotifications: boolean;
    emailNotifications: boolean;
    whatsappNotifications: boolean;
  };
  reputation?: UserReputation;
}

// ── Predictions ────────────────────────────────────────────────

export interface Prediction {
  id: string;
  home: string;
  away: string;
  predictions: number;
  stadium: string;
  competition: string;
}

export interface UserMatchPrediction {
  id: string;
  userId: string;
  matchId: string;
  pick: 'home' | 'draw' | 'away';
  homeScorePred?: number;
  awayScorePred?: number;
  pointsEarned: number;
  settled: boolean;
  createdAt: string;
}

// ── Check-Ins ──────────────────────────────────────────────────

export interface CheckIn {
  id: string;
  userId: string;
  matchId: string;
  venueId?: string;
  locationType: CheckInLocation;
  customLabel?: string;
  createdAt: string;
  person?: Person;
}

// ── Community ──────────────────────────────────────────────────

export interface CommunityRoom {
  id: string;
  type: CommunityRoomType;
  referenceId: string;         // matchId | venueId | teamId | competitionId
  name: string;
  slug: string;
  description?: string;
  isPermanent: boolean;
  expiresAt?: string;
  messageCount: number;
  activeUsers: number;
  pinnedMessageId?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  replyToId?: string;
  reactions: MessageReaction[];
  isPinned: boolean;
  isModerated: boolean;
  createdAt: string;
  author?: Person;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  userIds: string[];
}

// ── Follows ─────────────────────────────────────────────────────

export interface Follow {
  id: string;
  userId: string;
  followableType: FollowableType;
  followableId: string;
  notifyOnStart: boolean;
  notifyOnEnd: boolean;
  notifyOnGoal: boolean;
  createdAt: string;
}

// ── Notifications ──────────────────────────────────────────────

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  referenceId?: string;
  referenceType?: FollowableType;
  isRead: boolean;
  createdAt: string;
}

// ── Search ─────────────────────────────────────────────────────

export interface SearchResult {
  id: string;
  type: 'team' | 'venue' | 'match' | 'competition' | 'user' | 'country';
  title: string;
  subtitle?: string;
  image?: string;
  url: string;
}

export interface SearchIndex {
  teams: Team[];
  venues: Venue[];
  matches: Match[];
  competitions: Competition[];
  people: Person[];
}

// ── Country ─────────────────────────────────────────────────────

export interface Country {
  code: string;
  name: string;
  flag: string;
  slug: string;
  teamIds: string[];
  competitionIds: string[];
}

// ── Analytics ──────────────────────────────────────────────────

export interface MatchAnalytics {
  matchId: string;
  activeFans: number;
  checkInsPerVenue: Record<string, number>;
  predictionParticipationRate: number;
  communityMessages: number;
}

export interface VenueAnalytics {
  venueId: string;
  checkInsToday: number;
  mostPopularMatch: string;
  avgRating: number;
  totalReviews: number;
}

// ── Brand ───────────────────────────────────────────────────────

export interface BrandInfo {
  name: string;
  phoneMain: string;
  emailMain: string;
  socials: Record<string, string>;
  siteUrl: string;
  tagline: string;
  description: string;
}

// ── Supabase DB Schema Types ────────────────────────────────────

export interface DBMatch {
  id: string;
  slug: string;
  competition_id: string;
  stage: string;
  home_team_id: string;
  away_team_id: string;
  status: MatchStatus;
  kickoff: string | null;
  stadium: string;
  country: string;
  home_score: number | null;
  away_score: number | null;
  minute: string | null;
  total_predictions: number;
  followers_count: number;
  is_saved: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBProfile {
  id: string;
  username: string;
  fullname: string;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  website: string | null;
  favorite_team_id: string | null;
  points: number;
  total_predictions: number;
  correct_predictions: number;
  streak: number;
  best_streak: number;
  rank: number | null;
  verified: boolean;
  joined_at: string;
  last_active: string;
}

export interface DBCheckIn {
  id: string;
  user_id: string;
  match_id: string;
  venue_id: string | null;
  location_type: CheckInLocation;
  custom_label: string | null;
  created_at: string;
}

export interface DBFollow {
  id: string;
  user_id: string;
  followable_type: FollowableType;
  followable_id: string;
  notify_on_start: boolean;
  notify_on_end: boolean;
  notify_on_goal: boolean;
  created_at: string;
}

export interface DBMessage {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  reply_to_id: string | null;
  is_pinned: boolean;
  is_moderated: boolean;
  created_at: string;
}

export interface DBNotification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  reference_id: string | null;
  reference_type: string | null;
  is_read: boolean;
  created_at: string;
}
