import React, { useState } from "react";
import {
  LuFerrisWheel,
  LuLogOut,
  LuMessageSquareDot,
  LuMessageSquareMore,
  LuSearch,
  LuSettings,
  LuUser,
  LuUsers,
  LuX,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import { assets } from "../assets/asset";

import "./../style/component.scss";
import SearchModal from "./ui/SearchModal";

const Header = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [profileMenuOn, isProfileMenuOn] = useState(false);
  const [searchModalOn, isSearchModalOn] = useState(false);

  const toogleSignIn = () => {
    setSignedIn(!signedIn);
  };
  const toogleOpenProfileMenu = () => {
    isProfileMenuOn(!profileMenuOn);
  };
  const toggleSearchModal = () => {
    isSearchModalOn(!searchModalOn);
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="content">
            <Link to={"/"} className="logo">
              <img src={assets.brand.icon} alt="" />
            </Link>
            <div className="nav__actions">
              <button onClick={toggleSearchModal} className="search__btn">
                {!searchModalOn ? <LuSearch /> : <LuX />}
              </button>
              {signedIn ? (
                <>
                  <Link className="signin__btn">
                    <span>
                      <LuUser />
                    </span>
                    <span>Sign in</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    className="user__img_btn"
                    onClick={toogleOpenProfileMenu}
                  >
                    <img src={assets.users.user3} alt="" />
                  </button>
                </>
              )}

              {profileMenuOn && (
                <>
                  <div className="profile__menu_on">
                    <ul className="profile__menu">
                      <li>
                        <Link className="user__profile">
                          <span>
                            <img src={assets.users.user3} alt="" />
                          </span>
                          <span>View profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <span>
                            <LuSettings />
                          </span>
                          <span>Settings</span>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <span>
                            <LuMessageSquareMore />
                          </span>
                          <span>Contact us</span>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <span>
                            <LuUsers />
                          </span>
                          <span>Community</span>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <span>
                            <LuLogOut />
                          </span>
                          <span>Logout</span>
                        </Link>
                      </li>
                    </ul>
                    <div className="other__on_nav">
                      <Link className="find__more_nav">
                        <span>Find more</span>
                        <span>
                          <LuFerrisWheel />
                        </span>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {searchModalOn && (
        <>
          <div className="search__modal__panel">
            <SearchModal />
          </div>
        </>
      )}
    </>
  );
};

export default Header;
