import React from 'react';

export default function Selector (props) {
    const options = props.availableSessions.map((session) => 
        <option value = {session}> {session} </option>
    );
    return (
      <select name= {props.name}>
        {options}
      </select>
    )
}
