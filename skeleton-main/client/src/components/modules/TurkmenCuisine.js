import React from "react";

import "../../utilities.css";
import "./CountryCuisine.css";
import "../pages/Cuisine.css";
import manty from "../../../images/manty-tkm.jpg";
import corek from "../../../images/corek-tkm.jpg";
import fitchi from "../../../images/fitchi-tkm.jpg";
import batyrma from "../../../images/batyrma-tkm.jpg";
import pisme from "../../../images/pisme-tkm.jpg";
const TurkmenCuisine = () => {
  return (
    <div className="Cuisine-text">
      <h2 className="u-primary">Turkmen Cuisine</h2>
      <p>
        The nomadic past has left a very noticeable trace in Turkmen cuisine - the basis of the diet
        is meat: lamb, meat of gazelles, non-working camels, wild fowl, chicken. Beef is consumed
        much less frequently because this food appeared on the table much later, Turkmens don't eat
        horse meat at all.
      </p>
      <div className="u-flex u-flex-justifyCenter">
        <div>
          {" "}
          <h3 className="u-primary">Dumplings</h3>
          <p>
            A wide variety of filled pies and dumplings are available in restaurants and bazaars.
            Manty are steamed dumplings filled with ground meat, onions or pumpkin. Typical fried
            dishes include somsa, gutap (often filled with spinach), fitchi (fitçi), börek, and
            ichlekli (içlekli). These are popular with travelers, taxi drivers, and students, as
            they can be eaten quickly on the run, and are often sold at roadside stands.
          </p>
          <img src={manty} className="Cuisine-img"></img>
        </div>
        <div>
          <h3 className="u-primary ">Bread</h3>
          <p>
            The main role in the hospitality of the peoples of Central Asia is played by bread -
            çörek, which also serves as a symbol of hospitality, brotherhood, honor, hard work,
            prosperity, gratitude and the kindest wishes
          </p>
          <img src={corek} className="Cuisine-img"></img>
        </div>
      </div>
      <h3 className="u-primary">Here are some more dishes you would see in Turkmenistan</h3>
      <div className="u-flex u-flex-justifyCenter">
        <div className="Cuisine-dishes ">
          <img src={fitchi} className="Cuisine-img"></img>
          <p>Fitchi</p>
        </div>
        <div className="Cuisine-dishes ">
          <img src={batyrma} className="Cuisine-img"></img>
          <p>Batyrma</p>
        </div>
        <div className="Cuisine-dishes ">
          <img src={pisme} className="Cuisine-img"></img>
          <p>Pishme</p>
        </div>
      </div>
    </div>
  );
};

export default TurkmenCuisine;
