import React from "react";

export default function Hamburger({className, handleChange}){
  return(
    <div id="navIcon" className={className} onClick={handleChange}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}