import React from 'react';

export default function Selector (props) {
  const { setBookingToState, availableSessions } = props;

  const options = availableSessions.map((session) =>
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
