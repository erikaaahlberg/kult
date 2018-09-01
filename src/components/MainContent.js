import React from "react";

export default function MainContent(props) {
  return (
    <div className="contentWrapper">
      <div className={props.background} />
      <div className="rightContent">
        {props.children}
      </div>
    </div>
  );
}
