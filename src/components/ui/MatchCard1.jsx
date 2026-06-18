import React from "react";
import { LuBookmark, LuBookmarkCheck } from "react-icons/lu";
import { getMatchStatusLabel } from "../../assets/asset";

const MatchCard = ({
  status = "scheduled",
  homeTeam = "Team 1",
  awayTeam = "Team 2",
  homeScore = 0,
  awayScore = 0,
  minute = "23:00",
  isSaved = false,
}) => {
  const label = getMatchStatusLabel(status);

  const isLive = status === "live";
  const isFinished = status === "fulltime";

  return (
    <li className="match__card">
      <div className="match__timer">
        <p>{label}</p>

        {isLive && <h3>{minute}'</h3>}
        {!isLive && !isFinished && <h3>{minute}</h3>}
        {isFinished && <h3>FT</h3>}
      </div>

      <div className="match__teams">
        <div className="match__team">
          <div className="team__img">
            <img src={homeTeam?.avatar} alt={homeTeam?.name} />
          </div>
          <div className="team_name">{homeTeam?.name}</div>
        </div>

        <div className="match__team">
          <div className="team__img">
            <img src={awayTeam.avatar} alt={awayTeam?.name} />
          </div>
          <div className="team_name">{awayTeam?.shortName}</div>
        </div>
      </div>

      <div className="match__views">
        <div className="match__goals">
          <span>{homeScore}</span>
          <span>{awayScore}</span>
        </div>

        <div className={`save__match ${isSaved ? "active" : ""}`}>
          {isSaved ? (
            <span className="active">
              <LuBookmarkCheck />
            </span>
          ) : (
            <span>
              <LuBookmark />
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default MatchCard;
