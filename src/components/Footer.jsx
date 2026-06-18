import React from "react";
import { Link } from "react-router-dom";
import { assets, brandInfo, formatPhoneNumber } from "../assets/asset";
import { LuFacebook, LuInstagram, LuTwitter, LuYoutube } from "react-icons/lu";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="content">
            <div className="div">
              <Link>
                <img src={assets.brand.icon} alt="AbaFans__Logo" />
              </Link>
              <div className="hello">
                <div className="circle">
                  <div className="fancy-box"></div>
                </div>
                <h2>Say hello</h2>
              </div>
              <ul>
                <li>
                  <Link to={`tel:${brandInfo.phoneMain}`}>
                    <span>+{formatPhoneNumber(brandInfo?.phoneMain)}</span>
                  </Link>
                  <Link to={`mailto:${brandInfo.emailMain}`}>
                    <span>{brandInfo?.emailMain}</span>
                  </Link>
                </li>
              </ul>
              <p>
                &copy; {new Date().getFullYear()} {brandInfo.name}. All rights
                reserved.
              </p>
            </div>
            <div className="rdiv">
              <p>/@abafans</p>
              <ul>
                <li>
                  <Link
                    to={`https://instagram.com/${brandInfo.socials.instagram}`}
                  >
                    <span>
                      <LuInstagram />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`https://facebook.com/${brandInfo.socials.facebook}`}
                  >
                    <span>
                      <LuFacebook />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={`https://x.com/${brandInfo.socials.x}`}>
                    <span>
                      <LuTwitter />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`https://youtube.com/@${brandInfo.socials.youtube}`}
                  >
                    <span>
                      <LuYoutube />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
