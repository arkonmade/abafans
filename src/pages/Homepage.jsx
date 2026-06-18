import React, { useState, forwardRef, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  LuBookmark,
  LuBookmarkCheck,
  LuLandPlot,
  LuMapPinned,
  LuSearch,
  LuStar,
  LuTrophy,
  LuTv,
  LuTvMinimalPlay,
  LuUsers,
} from "react-icons/lu";
import CalendarIcon from "../components/ui/calendarIcon";
import MatchCard from "../components/ui/MatchCard1";

import "./../style/home.scss";
import {
  matchesList,
  peopleList,
  predictionsList,
  slugifyApp,
  teamsList,
  venuesList,
} from "../assets/asset";
import { useNavigate } from "react-router-dom";

const CalendarButton = forwardRef(({ onClick }, ref) => (
  <button ref={ref} type="button" className="calendar__btn" onClick={onClick}>
    <CalendarIcon day={new Date().getDate()} />
  </button>
));
export const MATCH_STATUSES = [
  { value: "scheduled", label: "SCH" },
  { value: "live", label: "LIVE" },
  { value: "halftime", label: "HT" },
  { value: "extratime", label: "ET" },
  { value: "penalties", label: "PEN" },
  { value: "fulltime", label: "FT" },
  { value: "postponed", label: "PPD" },
  { value: "suspended", label: "SUSP" },
  { value: "abandoned", label: "ABD" },
];

const Homepage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [matchSaved, isMatchSaved] = useState(true);

  const navigate = useNavigate();
  const toggleSaveMatch = () => {
    isMatchSaved(!matchSaved);
  };

  // const rankedPeople = [...peopleList].sort((a, b) => b.points - a.points);
  const rankedPeople = useMemo(
    () => [...peopleList].sort((a, b) => b.points - a.points),
    [peopleList],
  );
  const [first, second, third, ...rest] = rankedPeople;

  const getTeam = (id) => teamsList.teams.find((team) => team.id === id);

  const teamsMap = Object.fromEntries(
    teamsList.teams.map((team) => [team.id, team]),
  );

  return (
    <div className="homepage">
      <div className="container">
        <div className="content">
          <div className="main__div">
            <div className="match__list__box">
              <div className="div__title">
                <div className="search__box">
                  <span>
                    <LuSearch />
                  </span>
                  <input type="search" placeholder="Search" />
                </div>

                <button type="button" className=" live__btn">
                  <span>Live</span>
                </button>

                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  customInput={<CalendarButton />}
                  calendarClassName="custom-datepicker "
                />
              </div>
              <div className="match__list">
                <ul>
                  {matchesList.slice(0, 4).map((match) => (
                    <MatchCard
                      key={match.id}
                      status={match.status}
                      minute={match.minute}
                      homeTeam={teamsMap[match.home]}
                      awayTeam={teamsMap[match.away]}
                      homeScore={match.homeScore}
                      awayScore={match.awayScore}
                      isSaved={match.isSaved}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="leaderboard__list">
              <div className="box__title">
                <span>
                  <LuTrophy />
                </span>
                <div>
                  <h3>Top leaderboard</h3>
                  <p>The hall of fame</p>
                </div>
              </div>
              <div className="leaderboard__items">
                <div className="lb__filters">
                  <li>
                    <span>Daily</span>
                  </li>
                  <li className="active">
                    <span>Weekly</span>
                  </li>
                  <li>
                    <span>All-Time</span>
                  </li>
                </div>
                <div className="lb__lists">
                  <div className="top__lb">
                    {/* 2nd */}
                    <div className="lb lb2nd">
                      <div className="lb_in">
                        <h2>{second.name}</h2>
                        <p>{second.points} pts</p>
                      </div>
                      <div className="lb__img">
                        <img src={second.avatar} alt="" />
                        <span>2</span>
                      </div>
                    </div>

                    {/* 1st */}
                    <div className="lb lb1st">
                      <div className="lb_in">
                        <h2>{first.name}</h2>
                        <p>{first.points} pts</p>
                      </div>
                      <div className="lb__img">
                        <img src={first.avatar} alt="" />
                        <span>1</span>
                      </div>
                    </div>

                    {/* 3rd */}
                    <div className="lb lb3rd">
                      <div className="lb_in">
                        <h2>{third.name}</h2>
                        <p>{third.points} pts</p>
                      </div>
                      <div className="lb__img">
                        <img src={third.avatar} alt="" />
                        <span>3</span>
                      </div>
                    </div>
                  </div>
                  <div className="other__lb">
                    {rest.slice(0, 7).map((person, index) => (
                      <div className="lb__item" key={person.id}>
                        <div className="lb__meta">
                          <span className="item__rank">{index + 4}</span>

                          <div className="item_img">
                            <img src={person.avatar} alt={person.name} />
                          </div>

                          <div className="item__meta">
                            <h3>{person.name}</h3>
                            <p>
                              {person.correctPredictions}/
                              {person.totalPredictions} correct
                            </p>
                          </div>
                        </div>

                        <div className="item__point">
                          <h3>{person.points}</h3>
                          <p>points</p>
                        </div>
                      </div>
                    ))}
                    <div className="lb__item mine">
                      <div className="lb__meta">
                        <span className="item__rank">23</span>

                        <div className="item_img">
                          <img
                            src="https://i.pravatar.cc/150?img=23"
                            alt="Your Name"
                          />
                        </div>

                        <div className="item__meta">
                          <h3>You</h3>
                          <p>40/ 56 correct - keep climbing!</p>
                        </div>
                      </div>

                      <div className="item__point">
                        <h3>312</h3>
                        <p>points</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="side__div">
            <div className="home__community">
              <div className="community__imgs">
                {peopleList.slice(0, 3).map((img, i) => (
                  <div className="img" key={i}>
                    <img
                      src={img?.avatar}
                      alt={`Community__Member_${img.name}`}
                    />
                  </div>
                ))}
              </div>
              <div className="community__info">
                <h2>2.4k+</h2>
                <p>Already joined</p>
              </div>
            </div>

            <div className="home__predictions">
              <div className="__title">
                <span className="line"></span>
                <h3>Who will win?</h3>
              </div>
              <div className="prediction__teams">
                {predictionsList.slice(0, 3).map((item) => {
                  const homeTeam = getTeam(item.home);
                  const awayTeam = getTeam(item.away);

                  return (
                    <div className="team__item" key={item.id}>
                      <div className="teams__item">
                        <button>
                          <div className="img">
                            <img src={homeTeam?.avatar} alt={homeTeam?.name} />
                          </div>
                          <div>
                            <h4>{homeTeam?.shortName}</h4>
                          </div>
                        </button>

                        <span className="team__divider">vs</span>

                        <button>
                          <div className="img">
                            <img src={awayTeam?.avatar} alt={awayTeam?.name} />
                          </div>
                          <div>
                            <h4>{awayTeam?.shortName}</h4>
                          </div>
                        </button>
                      </div>
                      {/* <hr /> */}
                      <div className="box__down">
                        <p>
                          <span>
                            <LuUsers />
                          </span>
                          <span>{item.predictions} predictions</span>
                        </p>

                        <p>
                          <span>
                            <LuLandPlot />
                          </span>
                          <span>{item.stadium}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="home__venues">
              <div className="__title">
                <h2>venues</h2>
                <p>Where to watch?</p>
              </div>
              <div className="venues__list">
                {venuesList.slice(0, 4).map((place, i) => (
                  <div
                    className="venue__item"
                    key={i}
                    onClick={() =>
                      navigate(`/venue/${slugifyApp.slugify(place.name)}`)
                    }
                  >
                    <div className="venue__img">
                      <img src={place.thumbnail} alt={place.name} />
                    </div>
                    <div className="venue__meta">
                      <h3>{place.name}</h3>
                      <div className="venue__meta__info">
                        <p>
                          <span>
                            <LuMapPinned />
                          </span>
                          <span>{place.place}</span>
                        </p>
                        <p>
                          <span>
                            <LuTv />
                          </span>
                          <span>{place.screens} screens</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
