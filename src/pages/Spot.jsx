import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { peopleList, slugifyApp, venuesList } from "../assets/asset";
import {
  LuArrowLeft,
  LuMapPinned,
  LuNavigation,
  LuPhone,
  LuShare2,
  LuTv,
  LuUsers,
  LuUtensils,
} from "react-icons/lu";

import "./../style/venue.scss";

const VenueSpotPage = () => {
  const { path } = useParams();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const venue = venuesList.find((v) => slugifyApp.slugify(v.name) === path);

  return (
    <>
      <div className="venue__spot_page">
        <div className="hero">
          <div className="img__bg">
            <img src={venue.thumbnail} alt={venue.name} />
          </div>
          <div className="container h-full">
            <div className="content h-full">
              <button onClick={goBack}>
                <span>
                  <LuArrowLeft />
                </span>
                <span>Back</span>
              </button>
              <div className="venue__meta">
                <h1>{venue.name}</h1>
                <div className="item">
                  <span>
                    <LuMapPinned />
                  </span>
                  <span>{venue.place}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <ul className="page__actions">
              <li>
                <span>
                  <LuMapPinned />
                </span>
                <span>Check in</span>
              </li>
              <li>
                <span>
                  <LuNavigation />
                </span>
                <span>Directions</span>
              </li>
              <li>
                <span>
                  <LuPhone />
                </span>
                <span>Call</span>
              </li>
              <li>
                <span>
                  <LuShare2 />
                </span>
                <span>Share</span>
              </li>
            </ul>
            <div className="venue__about">
              <h1>About</h1>
              <p>{venue.about}</p>
            </div>
            <div className="venue__amenity">
              <div className="amenity__box">
                <span>
                  <LuTv />
                </span>
                <h3>{venue.screens}</h3>
                <p>screens</p>
              </div>
              <div className="amenity__box">
                <span>
                  <LuUsers />
                </span>
                <h3>{venue.capacity}</h3>
                <p>capacity</p>
              </div>
              <div className="amenity__box">
                <span>
                  <LuUtensils />
                </span>
                <h3>{venue.food ? "Yes" : "No"}</h3>
                <p>food</p>
              </div>
              <div className="amenity__box">
                <span>
                  <LuTv />
                </span>
                <h3>{venue.drinks ? "Yes" : "No"}</h3>
                <p>drinks</p>
              </div>
            </div>
            <div className="venue__people">
              <div className="box__title">
                <h1>Friends Watching Here</h1>
                <span>2 live</span>
              </div>
              <div className="how__many">
                <div className="user__imgs">
                  {venue.friends.map((frdId) => {
                    const person = peopleList.find((p) => p.id === frdId);

                    return;
                    <div className="user__img">
                      <img
                        src={
                          person?.avatar ||
                          `https://ui-avatars.com/api/?name=${person?.name}&background=random&color=fff&size=256`
                        }
                        alt={person?.name}
                      />
                    </div>;
                  })}
                </div>
                <div className="user__count">
                  <span>
                    <LuUsers />
                  </span>
                  <span>
                    {venue.friends.length}{" "}
                    {venue.friends.length > 1 ? "friends here" : "friend here"}
                  </span>
                </div>
              </div>
            </div>
            <div className="venue__contact">
              <h1>Contact & Entry</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueSpotPage;
