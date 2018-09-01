import React from "react";

export default function MainWrapper(props) {
  return (
    <div className="contentWrapper">
      <div className={props.background} />
      <div className="rightContent">
        {props.children}
      </div>
    </div>
  );
}
