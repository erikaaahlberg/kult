import React from 'react';

export default function Selector (props) {
    const options = props.availableSessions.map((date) => 
        <option value = {date.session}> {date.session} </option>
    );
    return (
      <select name= {props.name}>
        {options}
      </select>
    )
}
