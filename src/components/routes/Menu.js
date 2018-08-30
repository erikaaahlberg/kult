import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Menu.css";

export default function Menu() {
  return (
    <div className="mainWrapper">
      <div className="contentWrapper">
        <div className="menuBackground"></div>
        <div className="rightContent">
          <h2>MENY N°7</h2>
          <p>&nbsp;BLEAK ROE - LICHEN - HORSERADISH</p>
          <p>RAINBOW TROUT - DILL FLOWER - KOHLRABI</p>
          <p>MACKEREL - FOIE GRAS - CHANTERELLE</p>
          <p>DUCK - TRUFFLE - CELERIAC</p>
          <p>RASPBERRY - WHITE CHOCOLATE - SPRUCE&nbsp;</p>
          <p>&nbsp;LEMON VERBENA - SALT - OLIVE OIL</p>
          <p>&nbsp;755 SEK</p>
          <Link to="/book">
            <button className="button">BOKA BORD</button>
          </Link>
          <p>&nbsp;+46 123 45 67</p>
        </div>
      </div>
    </div>
  );
}