import React from "react";
import { Link } from "react-router-dom";

import "../../utilities.css";
import "./Skeleton.css";
import "./Home.css";

import homeImg from "./h-place-2.png";

const Home = (props) => {
  return (
    <>
      <img src={homeImg} className="Home-img"></img>
      <div className="u-textCenter Home-body u-absolute">
        <div className="Home-heading u-bold">Find Your Next Adventure</div>
        <div className="u-flex u-flex-justifyCenter">
          <button className="u-relative Home-button u-bold">
            <Link to="/explore/" className="Home-button-text">
              Explore{" "}
            </Link>
          </button>
          <button className="u-relative Home-button">
            {props.userId ? (
              <Link to="/wishlist/" className="Home-button-text u-bold">
                WishList{" "}
              </Link>
            ) : (
              <Link to="/cuisine/" className="Home-button-text u-bold">
                Cuisine
              </Link>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
