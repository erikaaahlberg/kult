import React from 'react';

export default function Selector (props) {
  const { setBookingToState, availableSessions } = props;
  console.log(availableSessions);
  //console.log(setBookingToState);
  const array = ["18.00", "21.00"];
  const options = array.map((session) =>
    <option key={session} value={session}>
      {session}
    </option>
  );
  return (
    <select onChange={setBookingToState} name={props.name}>
      {options}
    </select>
  )
}
