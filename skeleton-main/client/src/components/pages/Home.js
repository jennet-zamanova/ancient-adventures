import React from "react";
import { Link } from "react-router-dom";

import "../../utilities.css";
import "./Skeleton.css";

const Home = (props) => {
  return (
    <>
      <>Find Your Next Adventure</>
      <>
        <button>
          <Link to="/explore/">Explore </Link>
        </button>
        <button>
          {props.userId ? (
            <Link to="/mywishlist/">WishList </Link>
          ) : (
            <Link to="/cuisine/">Cuisine</Link>
          )}
        </button>
      </>
    </>
  );
};

export default Home;
