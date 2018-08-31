import React from "react";

export default function BookingListItem(props) {
  const { item, title } = props;
  return (
    <li>
      <span className="deviceHeading">
        { title }
      </span>
      { item }
    </li>
  );
}
