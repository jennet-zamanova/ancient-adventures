import React from "react";
import { Link } from "react-router-dom";

import "../../utilities.css";
import "./Skeleton.css";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="u-textCenter Home-body u-absolute">
      <div className="Home-heading u-bold">Find Your Next Adventure</div>
      <div className="u-flex ">
        <button className="u-relative">
          <Link to="/explore/">Explore </Link>
        </button>
        <button className="u-relative">
          {props.userId ? (
            <Link to="/wishlist/">WishList </Link>
          ) : (
            <Link to="/cuisine/">Cuisine</Link>
          )}
        </button>
      </div>
      <div className="Home-body">this is body</div>
      <img src="/client/images/h-place-2.png"></img>
    </div>
  );
};

export default Home;
