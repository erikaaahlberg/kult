import React from 'react';

export default function Listitem(props){
  return(
    <li className={ props.className }>
      { props.children }
    </li>
  )
}