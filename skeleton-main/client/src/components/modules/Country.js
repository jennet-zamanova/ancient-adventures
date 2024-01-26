// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import Country from "../modules/Country";

// import "../../utilities.css";
// import "./Skeleton.css";

// import { get, post } from "../../utilities";

// const WishList = (props) => {
//   const [likedCountries, setCountries] = useState([]);
//   const [likedPlaces, setPlaces] = useState([]);
//   //   const [placeImg, setPlaceImg] = useState("");
//   //   let placeImg = "";
//   let placesToRender = <>before places</>;
//   let countriesToRender = <>before countries</>;
//   let ex = <>before</>;
//   const ar = [1, 2, 3];

//   const getPlaceInformation = async (placeNumber) => {
//     // get Image and Description from db
//     let imgname = "";
//     await get("/api/place/", { placeIdx: placeNumber }).then((placeInfo) => {
//       console.log(placeInfo);
//       if (placeInfo != []) {
//         imgname = "data:image/jpg;base64," + placeInfo[0].img;
//       }
//     });
//     console.log("img", imgname);
//     return imgname;
//   };

//   useEffect(() => {
//     get("/api/wishlist/", { userId: props.userId }).then((locations) => {
//       console.log("locations", locations);
//       setCountries(locations.likedCountries);
//       setPlaces(locations.likedPlaces);
//     });
//     ex = ar.map((item) => {
//       <>{item}</>;
//     });
//   }, []);

//   useEffect(() => {
//     console.log(likedCountries);
//     if (likedCountries != [] && likedCountries !== undefined) {
//       console.log("before", likedCountries);
//       countriesToRender = likedCountries.map((country) => {
//         <>
//           {country} <button>Travel</button>
//         </>;
//         {
//           placesToRender;
//         }
//       });
//       console.log("after", likedCountries);
//     }
//   }, [likedCountries, likedPlaces]);

//   //   useEffect(() => {
//   //     console.log(likedPlaces);
//   //     if (likedPlaces != [] && likedPlaces !== undefined) {
//   //       placesToRender = likedPlaces.map((place) => {
//   //         placeImg = getPlaceInformation(place);
//   //         console.log(placeImg);
//   //         <img src={placeImg}></img>;
//   //       });
//   //     }
//   //   }, [likedPlaces]);

//   useEffect(() => {
//     const fetchPlaceInformation = async (place) => {
//       try {
//         const placeInfo = await getPlaceInformation(place);
//         return <img key={place} src={placeInfo}></img>;
//       } catch (error) {
//         console.error(`Error fetching place information for ${place}:`, error);
//         return null;
//       }
//     };

//     const renderPlaces = async () => {
//       if (likedPlaces && likedPlaces.length > 0) {
//         const renderedPlaces = await Promise.all(likedPlaces.map(fetchPlaceInformation));
//         placesToRender = renderedPlaces.filter((place) => place !== null);
//         console.log(placesToRender);
//       }
//     };

//     renderPlaces();
//   }, [likedPlaces]);

//   return (
//     <>
//       <>Wishlist</>
//       <>{countriesToRender}</>
//       <>{ex}</>
//     </>
//   );
// };

// export default WishList;
