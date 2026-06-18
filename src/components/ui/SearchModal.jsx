import React, { useMemo, useState } from "react";
import { LuHistory, LuMapPin, LuSearch, LuUsers, LuX } from "react-icons/lu";

const searchResults = {
  suggestions: ["design systems", "design sprint", "design portfolio"],

  people: [
    {
      id: 1,
      name: "Jessica Wilson",
      username: "jesswilson",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Michael Roberts",
      username: "michaelr",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Sophia Turner",
      username: "sophiat",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "James Carter",
      username: "jcarter",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Olivia White",
      username: "oliviaw",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ],

  teams: [
    {
      id: 1,
      name: "Man City",
      country: "England",
      logo: "https://images.seeklogo.com/logo-png/28/1/manchester-city-fc-logo-png_seeklogo-289169.png",
    },
    {
      id: 2,
      name: "Arsenal",
      country: "England",
      logo: "https://images.seeklogo.com/logo-png/32/2/arsenal-f-c-logo-png_seeklogo-325701.png",
    },
    {
      id: 3,
      name: "Barcelona",
      country: "Spain",
      logo: "https://images.seeklogo.com/logo-png/5/2/fc-barcelona-logo-png_seeklogo-52470.png",
    },
    {
      id: "abc-rjjfjf",
      name: "Atletico Madrid",
      country: "Spain",
      logo: "https://images.seeklogo.com/logo-png/29/1/atletico-madrid-new-logo-png_seeklogo-297708.png",
    },
    {
      id: "real-abs49035930-2390294",
      name: "Real Madrid",
      country: "Spain",
      logo: "https://images.seeklogo.com/logo-png/19/2/real-madrid-club-crest-new-logo-png_seeklogo-198142.png",
    },
    {
      id: "arkon-abafans-rnsf12-333",
      name: "Inter Milan",
      country: "Spain",
      logo: "https://images.seeklogo.com/logo-png/7/2/inter-fc-logo-png_seeklogo-72396.png",
    },
    {
      id: "fjksfks",
      name: "Inter Miami",
      country: "USA",
      logo: "https://storage.livescore.com/images/team/medium/enet/960720.png",
    },
  ],

  places: [
    {
      id: 1,
      name: "Kigali",
      country: "Rwanda",
    },
    {
      id: 2,
      name: "Nairobi",
      country: "Kenya",
    },
    {
      id: 3,
      name: "Cape Town",
      country: "South Africa",
    },
  ],

  recent: [
    "dashboard ui",
    "react components",
    "branding",
    "figma community",
    "portfolio",
  ],
};

const SearchModal = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return searchResults;

    const q = query.toLowerCase();

    return {
      suggestions: searchResults.suggestions.filter((item) =>
        item.toLowerCase().includes(q),
      ),

      people: searchResults.people.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.username.toLowerCase().includes(q),
      ),

      teams: searchResults.teams.filter((item) =>
        item.name.toLowerCase().includes(q),
      ),

      places: searchResults.places.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.country.toLowerCase().includes(q),
      ),

      recent: searchResults.recent.filter((item) =>
        item.toLowerCase().includes(q),
      ),
    };
  }, [query]);

  const hasResults =
    filtered.suggestions.length ||
    filtered.people.length ||
    filtered.teams.length ||
    filtered.places.length;

  return (
    <div className="search__modal">
      <div className="content">
        <div className="search__box">
          <LuSearch />

          <input
            type="search"
            placeholder="Search here.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <button className="clear__search" onClick={() => setQuery("")}>
              <LuX />
            </button>
          )}
        </div>

        <div className="search__results">
          {!query && (
            <div className="search_recents">
              <div className="search__suggestion_title">
                <span>Recent Searches</span>
              </div>

              <ul>
                {searchResults.recent.slice(0, 4).map((item) => (
                  <li key={item}>
                    <>
                      <LuHistory />
                    </>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query && filtered.suggestions.length > 0 && (
            <div className="search_others">
              <div className="search__suggestion_title">
                <span>Suggestions</span>
              </div>

              <ul>
                {filtered.suggestions.slice(0, 3).map((item) => (
                  <li key={item}>
                    <LuSearch />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query && filtered.people.length > 0 && (
            <div className="search_people">
              <div className="search__suggestion_title">
                <span>People</span>
              </div>

              <ul>
                {filtered.people.slice(0, 3).map((person) => (
                  <li key={person.id}>
                    <div className="img">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="avatar"
                      />
                    </div>

                    <div className="meta">
                      <span className="name">{person.name}</span>
                      <span className="sub">@{person.username}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query && filtered.teams.length > 0 && (
            <div className="search_teams">
              <div className="search__suggestion_title">
                <span>Teams</span>
              </div>

              <ul>
                {filtered.teams.slice(0, 4).map((team) => (
                  <li key={team.id}>
                    <div className="img">
                      <img src={team.logo} alt="" />
                    </div>

                    <div className="meta">
                      <span className="name">{team.name}</span>
                      <span className="sub">{team?.country || "abafans"}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query && filtered.places.length > 0 && (
            <div className="search_places">
              <div className="search__suggestion_title">
                <span>Places</span>
              </div>

              <ul>
                {filtered.places.slice(0, 3).map((place) => (
                  <li key={place.id}>
                    <div className="img">
                      <img
                        src={
                          place?.avatar ||
                          "https://cdn.countryflags.com/thumbs/rwanda/flag-square-500.png"
                        }
                        alt=""
                      />
                    </div>

                    <div className="meta">
                      <span className="name">{place.name}</span>
                      <span className="sub">{place.country}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query && !hasResults && (
            <div className="no_search_found">
              <h4>No Results Found</h4>
              <p>We couldn't find anything matching <br /> "{query}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
