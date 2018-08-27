import React from "react";
import "../../assets/styles/Meny.css";


export default function Menu(){
  return(
    <div className="wrapper">
      <h1 className="smallHeader">MENY</h1>
      <p>Det kanske låter gott?</p>
      <div>
      <h2 class="text-align-center">MENU N°7</h2>
      <p class="text-align-center"> </p>
      <p class="text-align-center">&nbsp;BLEAK ROE - LICHEN - HORSERADISH</p>
      <p class="text-align-center">RAINBOW TROUT - DILL FLOWER - KOHLRABI</p>
      <p class="text-align-center">MACKEREL - FOIE GRAS - CHANTERELLE</p>
      <p class="text-align-center">DUCK - TRUFFLE - CELERIAC</p>
      <p class="text-align-center">RASPBERRY - WHITE CHOCOLATE - SPRUCE&nbsp;</p>
        <p class="text-align-center">&nbsp;LEMON VERBENA - SALT - OLIVE OIL</p>
          <p class="text-align-center"> </p>
          <p class="text-align-center">&nbsp;755 SEK</p>
          <div className="buttonlink"><button className="button">BOKA BORD</button> </div>
          </div>
          <br />
    </div>
  )
};