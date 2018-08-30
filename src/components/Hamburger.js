import React from "react";

export default function Hamburger({ className, handleChange }) {
  return (
    <div id="navIcon" className={className} onClick={handleChange}>
      <div className="navIconBackground">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
