import React from "react";

export default function MainWrapper(props) {
  return (
    <div className="mainWrapper">
      {props.children}
    </div>
  );
}
