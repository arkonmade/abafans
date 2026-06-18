import { v4 as uuidv4 } from "uuid";

import icon from "/icon.svg";

import user3 from "/images/user_3.png";

import venue1 from "/images/venue/image1.jpg";
import venue2 from "/images/venue/image2.jpg";
import venue3 from "/images/venue/image3.jpg";
import venue4 from "/images/venue/image4.jpg";
import venue5 from "/images/venue/image5.jpg";

export const assets = {
  brand: {
    icon,
  },
  users: {
    user3,
  },
};

export const peopleList = [
  {
    id: uuidv4(),
    name: "Kamaliza",
    points: 423,
    avatar: "https://i.pravatar.cc/150?img=1",
    totalPredictions: 95,
    correctPredictions: 76,
    streak: 8,
    joinedAt: "2026-01-15",
  },
  {
    id: uuidv4(),
    name: "Aline",
    points: 498,
    avatar: "https://i.pravatar.cc/150?img=2",
    totalPredictions: 88,
    correctPredictions: 69,
    streak: 6,
    joinedAt: "2026-02-03",
  },
  {
    id: uuidv4(),
    name: "Jean Claude",
    points: 385,
    avatar: "https://i.pravatar.cc/150?img=3",
    totalPredictions: 82,
    correctPredictions: 65,
    streak: 4,
    joinedAt: "2026-01-21",
  },
  {
    id: uuidv4(),
    name: "Diane",
    points: 372,
    avatar: "https://i.pravatar.cc/150?img=4",
    totalPredictions: 79,
    correctPredictions: 62,
    streak: 5,
    joinedAt: "2026-02-11",
  },
  {
    id: uuidv4(),
    name: "Patrick",
    points: 360,
    avatar: "https://i.pravatar.cc/150?img=5",
    totalPredictions: 77,
    correctPredictions: 60,
    streak: 7,
    joinedAt: "2026-03-05",
  },
  {
    id: uuidv4(),
    name: "Olivia",
    points: 344,
    avatar: "https://i.pravatar.cc/150?img=6",
    totalPredictions: 74,
    correctPredictions: 57,
    streak: 3,
    joinedAt: "2026-02-16",
  },
  {
    id: uuidv4(),
    name: "Eric",
    points: 331,
    avatar: "https://i.pravatar.cc/150?img=7",
    totalPredictions: 72,
    correctPredictions: 55,
    streak: 4,
    joinedAt: "2026-03-18",
  },
  {
    id: uuidv4(),
    name: "Sandrine",
    points: 320,
    avatar: "https://i.pravatar.cc/150?img=8",
    totalPredictions: 70,
    correctPredictions: 53,
    streak: 2,
    joinedAt: "2026-04-02",
  },
  {
    id: uuidv4(),
    name: "Mugisha",
    points: 309,
    avatar: "https://i.pravatar.cc/150?img=9",
    totalPredictions: 68,
    correctPredictions: 51,
    streak: 6,
    joinedAt: "2026-01-29",
  },
  {
    id: uuidv4(),
    name: "Grace",
    points: 297,
    avatar: "https://i.pravatar.cc/150?img=10",
    totalPredictions: 66,
    correctPredictions: 49,
    streak: 1,
    joinedAt: "2026-02-25",
  },
  {
    id: uuidv4(),
    name: "Kevin",
    points: 285,
    avatar: "https://i.pravatar.cc/150?img=11",
    totalPredictions: 63,
    correctPredictions: 47,
    streak: 5,
    joinedAt: "2026-03-12",
  },
  {
    id: uuidv4(),
    name: "Alice",
    points: 274,
    avatar: "https://i.pravatar.cc/150?img=12",
    totalPredictions: 60,
    correctPredictions: 45,
    streak: 2,
    joinedAt: "2026-04-01",
  },
  {
    id: uuidv4(),
    name: "Samuel",
    points: 260,
    avatar: "https://i.pravatar.cc/150?img=13",
    totalPredictions: 58,
    correctPredictions: 43,
    streak: 3,
    joinedAt: "2026-04-08",
  },
  {
    id: uuidv4(),
    name: "Yvette",
    points: 248,
    avatar: "https://i.pravatar.cc/150?img=14",
    totalPredictions: 55,
    correctPredictions: 40,
    streak: 4,
    joinedAt: "2026-04-22",
  },
  {
    id: uuidv4(),
    name: "Emmanuel",
    points: 236,
    avatar: "https://i.pravatar.cc/150?img=15",
    totalPredictions: 52,
    correctPredictions: 38,
    streak: 1,
    joinedAt: "2026-05-03",
  },
  {
    id: uuidv4(),
    name: "Vanessa",
    points: 224,
    avatar: "https://i.pravatar.cc/150?img=16",
    totalPredictions: 49,
    correctPredictions: 36,
    streak: 2,
    joinedAt: "2026-05-11",
  },
  {
    id: uuidv4(),
    name: "Thierry",
    points: 210,
    avatar: "https://i.pravatar.cc/150?img=17",
    totalPredictions: 45,
    correctPredictions: 33,
    streak: 3,
    joinedAt: "2026-05-19",
  },
  {
    id: uuidv4(),
    name: "Bella",
    points: 338,
    avatar: "https://i.pravatar.cc/150?img=18",
    totalPredictions: 42,
    correctPredictions: 30,
    streak: 1,
    joinedAt: "2026-05-25",
  },
];

export const venuesList = [
  {
    id: uuidv4(),
    name: "Goal! Lounge",
    thumbnail: venue1,
    place: "Nyarutarama, Kigali",
    rating: [
      {
        id: uuidv4(),
        name: "Patrick",
        msg: "Great atmosphere during Champions League nights.",
      },
    ],
    about:
      "Popular football viewing lounge with multiple HD screens, food platters and weekend live entertainment.",

    screens: 8,
    capacity: 120,
    food: true,
    drinks: true,

    contact: {
      address: "KG 9 Ave",
      phone: "250788111222",
      city: "Kigali",
      entry: 2000,
    },
    matches: 6,
    friends: [peopleList[0].id, peopleList[4].id, peopleList[8].id],
  },

  {
    id: uuidv4(),
    name: "Fan Zone Kigali",
    thumbnail: venue2,
    place: "Kimihurura, Kigali",
    rating: [
      {
        id: uuidv4(),
        name: "Aline",
        msg: "One of the best places for EPL weekends.",
      },
    ],
    about:
      "Modern sports bar featuring giant projector screens and a dedicated football fan community.",

    screens: 6,
    capacity: 90,
    food: true,
    drinks: true,

    contact: {
      address: "KG 28 Ave",
      phone: "250788333444",
      city: "Kigali",
      entry: 1500,
    },
    matches: 5,
    friends: [peopleList[1].id, peopleList[5].id],
  },

  {
    id: uuidv4(),
    name: "Kick Off Arena",
    thumbnail: venue3,
    place: "Remera, Kigali",
    rating: [
      {
        id: uuidv4(),
        name: "Eric",
        msg: "Huge screen and amazing crowd energy.",
      },
    ],
    about: "Known for big match screenings and affordable food combos.",

    screens: 5,
    capacity: 150,
    food: true,
    drinks: true,

    contact: {
      address: "KN 5 Rd",
      phone: "250788555666",
      city: "Kigali",
      entry: 1000,
    },
    matches: 8,
    friends: [peopleList[6].id, peopleList[10].id, peopleList[13].id],
  },

  {
    id: uuidv4(),
    name: "The Dugout",
    thumbnail: venue4,
    place: "Kacyiru, Kigali",
    rating: [
      {
        id: uuidv4(),
        name: "Sandrine",
        msg: "Comfortable seating and excellent service.",
      },
    ],
    about: "Relaxed football lounge with indoor and outdoor viewing areas.",

    screens: 4,
    capacity: 40,
    food: true,
    drinks: true,

    contact: {
      address: "KG 7 Ave",
      phone: "250788777888",
      city: "Kigali",
      entry: 2500,
    },
    matches: 4,
    friends: [peopleList[7].id, peopleList[3].id],
  },

  {
    id: uuidv4(),
    name: "90 Minutes Sports Hub",
    thumbnail: venue5,
    place: "Gisozi, Kigali",
    rating: [
      {
        id: uuidv4(),
        name: "Mugisha",
        msg: "Perfect place for watching multiple matches.",
      },
    ],
    about: "Dedicated sports venue showing simultaneous football fixtures.",

    screens: 10,
    capacity: 180,
    food: true,
    drinks: true,

    contact: {
      address: "KG 622 St",
      phone: "250788999000",
      city: "Kigali",
      entry: 3000,
    },
    matches: 10,
    friends: [peopleList[8].id, peopleList[12].id, peopleList[15].id],
  },

  {
    id: uuidv4(),
    name: "Champions Corner",
    thumbnail: venue2,
    place: "Kimironko, Kigali",
    rating: [
      {
        id: uuidv4(),
        name: "Kevin",
        msg: "Good sound system and tasty food.",
      },
    ],
    about: "Football-focused venue with premium match-day experiences.",

    screens: 7,
    capacity: 110,
    food: true,
    drinks: true,

    contact: {
      address: "KG 11 Ave",
      phone: "250788123456",
      city: "Kigali",
      entry: 2000,
    },
    matches: 5,
    friends: [peopleList[10].id, peopleList[14].id],
  },

  {
    id: uuidv4(),
    name: "Extra Time Lounge",
    thumbnail: venue2,
    place: "Kabeza, Kigali",
    rating: [
      {
        id: uuidv4(),
        name: "Bella",
        msg: "My favorite place for Champions League finals.",
      },
    ],
    about:
      "Spacious viewing center popular for international football tournaments.",

    screens: 9,
    capacity: 200,
    food: true,
    drinks: true,

    contact: {
      address: "KK 15 Rd",
      phone: "250788654321",
      city: "Kigali",
      entry: 3500,
    },
    matches: 12,
    friends: [
      peopleList[17].id,
      peopleList[0].id,
      peopleList[2].id,
      peopleList[5].id,
    ],
  },
];

export const predictionsList = [
  {
    id: "c4f6a8b0-1234-4a56-9bcd-111111111111",
    home: "8b5d3f5d-6a9d-4f1e-bc8f-1d7c4a0e6f11", // Real Madrid
    away: "2f7d4a91-4b26-4f58-8c6d-93d3d72f4b22", // Man Utd
    predictions: 322,
    stadium: "Santiago Bernabéu",
    competition: "Champions League",
  },
  {
    id: "d5e7b9c1-2345-4b67-acde-222222222222",
    home: "f6c9f9e8-7d47-4e89-92d5-b2b3f8a1c333", // Chelsea
    away: "a1b2c3d4-e5f6-4789-8123-456789abcdef", // PSG
    predictions: 417,
    stadium: "Stamford Bridge",
    competition: "Champions League",
  },
  {
    id: "e6f8c0d2-3456-4c78-bdef-333333333333",
    home: "d2e3f4a5-b6c7-4890-9234-567890abcdef", // Arsenal
    away: "e3f4a5b6-c7d8-4901-a345-67890abcdef1", // Bayern
    predictions: 548,
    stadium: "Emirates Stadium",
    competition: "Champions League",
  },
];
export const teamsList = {
  teams: [
    {
      id: "8b5d3f5d-6a9d-4f1e-bc8f-1d7c4a0e6f11",
      name: "Real Madrid",
      shortName: "Real",
      country: "Spain",
      avatar:
        "https://assets.football-logos.cc/logos/spain/256x256/real-madrid.5ce15611.png",
    },
    {
      id: "2f7d4a91-4b26-4f58-8c6d-93d3d72f4b22",
      name: "Manchester United",
      shortName: "Man Utd",
      country: "England",
      avatar:
        "https://assets.football-logos.cc/logos/england/256x256/manchester-united.7ab9d343.png",
    },
    {
      id: "f6c9f9e8-7d47-4e89-92d5-b2b3f8a1c333",
      name: "Chelsea",
      shortName: "Chelsea",
      country: "England",
      avatar:
        "https://assets.football-logos.cc/logos/england/256x256/chelsea.fe8d2c2e.png",
    },
    {
      id: "a1b2c3d4-e5f6-4789-8123-456789abcdef",
      name: "Paris Saint-Germain",
      shortName: "PSG",
      country: "France",
      avatar:
        "https://assets.football-logos.cc/logos/france/256x256/paris-saint-germain.579907dc.png",
    },
    {
      id: "d2e3f4a5-b6c7-4890-9234-567890abcdef",
      name: "Arsenal",
      shortName: "Arsenal",
      country: "England",
      avatar:
        "https://assets.football-logos.cc/logos/england/256x256/arsenal.e5528ede.png",
    },
    {
      id: "e3f4a5b6-c7d8-4901-a345-67890abcdef1",
      name: "Bayern Munich",
      shortName: "Bayern",
      country: "Germany",
      avatar:
        "https://assets.football-logos.cc/logos/germany/256x256/bayern-munchen.6c38f13a.png",
    },
  ],
};
export const matchesList = [
  {
    id: uuidv4(),

    competition: "FIFA World Cup",
    stage: "Final",

    home: "8b5d3f5d-6a9d-4f1e-bc8f-1d7c4a0e6f11", // Real Madrid
    away: "2f7d4a91-4b26-4f58-8c6d-93d3d72f4b22", // Man Utd

    status: "scheduled",
    kickoff: "2026-07-19T22:58:00Z",
    minute: "22:58",

    stadium: "Lusail Stadium",

    homeScore: null,
    awayScore: null,

    totalPredictions: 423,

    predictionStats: {
      homeWin: 52,
      draw: 18,
      awayWin: 30,
    },

    userPrediction: {
      homeScore: 2,
      awayScore: 1,
      pointsReward: 5,
    },

    venues: [venuesList[0].id, venuesList[2].id, venuesList[5].id],

    overview: {
      homeForm: ["W", "W", "D", "W", "L"],
      awayForm: ["W", "D", "W", "W", "W"],

      homeRank: 1,
      awayRank: 3,

      lastMeetings: [
        {
          homeScore: 2,
          awayScore: 1,
          date: "2025-11-12",
        },
        {
          homeScore: 0,
          awayScore: 0,
          date: "2025-03-01",
        },
      ],
    },

    isSaved: true,
  },

  {
    id: uuidv4(),

    competition: "Champions League",
    stage: "Semi Final",

    home: "f6c9f9e8-7d47-4e89-92d5-b2b3f8a1c333",
    away: "a1b2c3d4-e5f6-4789-8123-456789abcdef",

    status: "live",
    minute: "67",

    stadium: "Stamford Bridge",

    homeScore: 2,
    awayScore: 1,

    totalPredictions: 632,

    predictionStats: {
      homeWin: 41,
      draw: 22,
      awayWin: 37,
    },

    venues: [venuesList[1].id, venuesList[4].id],

    isSaved: false,
  },

  {
    id: uuidv4(),

    competition: "Champions League",
    stage: "Quarter Final",

    home: "d2e3f4a5-b6c7-4890-9234-567890abcdef",
    away: "e3f4a5b6-c7d8-4901-a345-67890abcdef1",

    status: "fulltime",

    stadium: "Emirates Stadium",

    homeScore: 3,
    awayScore: 2,

    totalPredictions: 811,

    predictionStats: {
      homeWin: 60,
      draw: 15,
      awayWin: 25,
    },

    venues: [venuesList[0].id, venuesList[3].id],

    isSaved: true,
  },
];

// ------
export const userProfile = {
  id: "USR-847291",
  pic: "https://cdn.dribbble.com/users/24593303/avatars/normal/756dab07ef0b0519b20654d29eba783d.png?1766760445",

  username: "arkonmade",
  fullname: "Arkon Studio",
  email: "arkonmade@gmail.com",

  bio: "Independent creative studio crafting digital products, visual identities, and memorable user experiences for modern brands.",

  location: "Kigali, Rwanda",
  website: "https://arkonmade.com",

  role: "Creative Studio",
  company: "Arkon Studio",

  joinedAt: "2022-08-14",
  lastActive: "2 hours ago",

  followers: 12847,
  following: 356,
  posts: 214,

  verified: true,

  stats: {
    projects: 48,
    clients: 32,
    reviews: 127,
    rating: 4.9,
  },

  socials: {
    instagram: "@arkonmade",
    x: "@arkonmade",
    dribbble: "arkonmade",
    behance: "arkonmade",
    linkedin: "arkon-studio",
  },

  preferences: {
    theme: "dark",
    language: "en",
    notifications: true,
  },
};
export const brandInfo = {
  name: "AbaFans",
  phoneMain: "250788967812",
  emailMain: "arkonmade@gmail.com",

  socials: {
    x: "abafans",
    facebook: "abafans",
    instagram: "abafans",
    youtube: "abafans",
  },
};

// ---------

export const formatPhoneNumber = (phone) => {
  const digits = String(phone).replace(/\D/g, "");

  if (digits.length === 12) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  }

  return phone;
};
export const getMatchStatusLabel = (status) => {
  switch (status) {
    case "scheduled":
      return "SCH";
    case "live":
      return "LIVE";
    case "halftime":
      return "HT";
    case "extratime":
      return "ET";
    case "penalties":
      return "PEN";
    case "fulltime":
      return "FT";
    case "postponed":
      return "PPD";
    case "suspended":
      return "SUSP";
    case "abandoned":
      return "ABD";
    default:
      return "";
  }
};
export const slugifyApp = {
  slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  },
};
