export interface Team {
  id: string;
  name: string;
  shortName: string;
  country: string;
  avatar: string;
}

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
  homeForm: string[];
  awayForm: string[];
  homeRank: number;
  awayRank: number;
  lastMeetings: { homeScore: number; awayScore: number; date: string }[];
}

export type MatchStatus =
  | 'scheduled'
  | 'live'
  | 'halftime'
  | 'extratime'
  | 'penalties'
  | 'fulltime'
  | 'postponed'
  | 'suspended'
  | 'abandoned';

export interface Match {
  id: string;
  competition: string;
  stage: string;
  home: string;
  away: string;
  status: MatchStatus;
  kickoff?: string;
  minute?: string;
  stadium: string;
  homeScore: number | null;
  awayScore: number | null;
  totalPredictions: number;
  predictionStats?: MatchPredictionStats;
  userPrediction?: UserPrediction;
  venues: string[];
  overview?: MatchOverview;
  isSaved: boolean;
}

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
}

export interface Venue {
  id: string;
  name: string;
  thumbnail: string;
  place: string;
  rating: VenueRating[];
  about: string;
  screens: number;
  capacity: number;
  food: boolean;
  drinks: boolean;
  contact: VenueContact;
  matches: string[];
  friends: string[];
}

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

export interface Prediction {
  id: string;
  home: string;
  away: string;
  predictions: number;
  stadium: string;
  competition: string;
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
  };
}
