import React from "react";

import "../../utilities.css";
import "./Home.css";
import "./Cuisine.css";
import "../modules/CountryCuisine.css";
import TurkmenCuisine from "../modules/TurkmenCuisine";
import UzbekCuisine from "../modules/UzbekCuisine";
import centralAsianCuisine from "../../../images/central-asian-cuisine.jpg";

const Cuisine = (props) => {
  return (
    <div style={{ padding: "0 10%" }}>
      <div className="u-textCenter">
        <div className="Cuisine-heading u-bold">Central Aisan Cuisine</div>
      </div>
      <div className="Cuisine-text">
        <p>
          Central Asian cuisine has been influenced by Persian, Indian, Arab, Turkish, Chinese,
          Mongol, African, and Russian cultures, as well as the culinary traditions of other varied
          nomadic and sedentary civilizations. Contributing to the culinary diversity were the
          migrations of Uyghur, Slav, Korean, Tatar, Dungan and German people to the region. Central
          Asian cooking techniques were influenced by the lack of water. Poplar trees, saxaul and
          animal dung were the primary fuel sources used in tandyr ovens, designed to maximize the
          heat gained from the limited supply of fuel, where flatbread, samsa and meats were cooked.
          Soups, stews and steamed dumplings were cooked in single cauldron pots. Turkic influence
          was seen in manti dumplings, wheat porridge called sumalak and assorted dairy products.
          Even after the disruption of the 13th century Mongol invasions, Iranian and Turkic
          culinary traditions carried on in Ottoman palace cuisine and have survived into the 20th
          century.
        </p>
        <img src={centralAsianCuisine} className="Cuisine-img"></img>
      </div>
      <TurkmenCuisine />
      <UzbekCuisine />
      <h1 style={{ textAlign: "center" }}>More to Come...</h1>
    </div>
  );
};

export default Cuisine;
