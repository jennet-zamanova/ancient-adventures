import React from "react";

import "../../utilities.css";
import "./CountryCuisine.css";
import "../pages/Cuisine.css";
import nan from "../../../images/nan-uzb.jpg";
import shurpa from "../../../images/shurpa-uzb.jpg";
import tea from "../../../images/tea-uzb.jpg";
import palov from "../../../images/palov-uzb.jpg";
import nisholda from "../../../images/nisholda.jpg";
import kebab from "../../../images/tandir-kabob-uzb.jpg";
const UzbekCuisine = () => {
  return (
    <div className="Cuisine-text">
      <h2 className="u-primary">Uzbek Cuisine</h2>
      <p>
        Uzbek cuisine shares the culinary traditions of peoples across Central Asia. There is a
        great deal of grain farming in Uzbekistan, so breads and noodles are of importance, and
        Uzbek cuisine has been characterized as "noodle-rich". Uzbekistan is well known by palow
        (similar to that of turkmen cuisine) and green tea - the national hot beverage taken
        throughout the day; teahouses (chaikhanas) are of cultural importance.
      </p>
      <div className="u-flex u-flex-justifyCenter">
        <div>
          {" "}
          <h3 className="u-primary">Nan</h3>
          <p>
            Bread (nan or non) is a staple; it is baked in a tandur, which is frequently a pot
            rather than the deep pit or oven of India and Afghanistan.
          </p>
          <img src={nan} className="Cuisine-img"></img>
        </div>
        <div>
          <h3 className="u-primary">Shurpa</h3>
          <p>
            Other notable national dishes include shurpa (shurva or shorva), a soup made of large
            pieces of fatty meat (usually mutton) and fresh vegetables; norin and lagman,
            noodle-based dishes that may be served as a soup or a main course; manti (also called
            qasqoni), chuchvara, and somsa, stuffed pockets of dough served as an appetizer or a
            main course (ranging from "wonderfully flaky and rich" to "heavy, stodgy"); dimlama (a
            meat and vegetable stew) and various kebabs, usually served as a main course.
          </p>
          <img
            src={shurpa}
            className="Cuisine-dishes Cuisine-img"
            style={{ borderRadius: "16px" }}
          ></img>
          <img
            src={tea}
            className="Cuisine-dishes Cuisine-img"
            style={{ borderRadius: "16px" }}
          ></img>
        </div>
      </div>

      <h3 className="u-primary">Here are some more dishes you would see in Uzbekistan</h3>
      <div className="u-flex u-flex-justifyCenter">
        <div className="Cuisine-dishes ">
          <img src={palov} className="Cuisine-img"></img>
          <p>Palov</p>
        </div>
        <div className="Cuisine-dishes ">
          <img src={nisholda} className="Cuisine-img"></img>
          <p>Nisholda</p>
        </div>
        <div className="Cuisine-dishes ">
          <img src={kebab} className="Cuisine-img"></img>
          <p>Tandir Kebab</p>
        </div>
      </div>
    </div>
  );
};

export default UzbekCuisine;
