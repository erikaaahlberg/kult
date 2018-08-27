import React from "react";
import "../../assets/styles/Meny.css";
import { Link } from "react-router-dom";





export default function Menu(){
  return(
    <div className="wrapper">
      <h1 className="smallHeader">MENY</h1>
      <p>Det kanske låter gott?</p>
      <div>
      <h2 className="text-align-center">MENY N°7</h2>
      <p className="text-align-center"> </p>
      <p className="text-align-center">&nbsp;BLEAK ROE - LICHEN - HORSERADISH</p>
      <p className="text-align-center">RAINBOW TROUT - DILL FLOWER - KOHLRABI</p>
      <p className="text-align-center">MACKEREL - FOIE GRAS - CHANTERELLE</p>
      <p className="text-align-center">DUCK - TRUFFLE - CELERIAC</p>
      <p className="text-align-center">RASPBERRY - WHITE CHOCOLATE - SPRUCE&nbsp;</p>
        <p class="text-align-center">&nbsp;LEMON VERBENA - SALT - OLIVE OIL</p>
          <p class="text-align-center"> </p>
          <p class="text-align-center">&nbsp;755 SEK</p>
      <div className="buttonlink">      
      <Link to="/book">
      <button className="button">BOKA BORD</button>
      </Link>
     <p className="text-align-center">&nbsp;+46 7283941</p>

 </div>
  </div>
  <br />
  </div>
  )
};