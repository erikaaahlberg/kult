import React from "react";
import { Link } from "react-router-dom";

export default function Menu(){
  return(
    <div className="wrapper">
      <h1 className="smallHeader">MENY</h1>
      <p>Det kanske låter gott?</p>
      <div className="alignCenter">
        <h2>MENY N°7</h2>
        <p>&nbsp;BLEAK ROE - LICHEN - HORSERADISH</p>
        <p>RAINBOW TROUT - DILL FLOWER - KOHLRABI</p>
        <p>MACKEREL - FOIE GRAS - CHANTERELLE</p>
        <p>DUCK - TRUFFLE - CELERIAC</p>
        <p>RASPBERRY - WHITE CHOCOLATE - SPRUCE&nbsp;</p>
        <p>&nbsp;LEMON VERBENA - SALT - OLIVE OIL</p>
        <p>&nbsp;755 SEK</p>    
        <Link to="/book">
          <button>BOKA BORD</button>
        </Link>
        <p className="text-align-center">&nbsp;+46 7283941</p>
      </div>
  </div>
  )
};