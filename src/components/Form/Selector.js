import React from 'react';

export default function Selector (props) {
  const { updateBooking, availableSessions, name } = props;

  const options = availableSessions.map((session) =>
    <option key={ session } value={ session }>
      { session }
    </option>
  );
  return (
    <select onChange={ updateBooking }  name={ name }>
      { options }
    </select>
  )
}
