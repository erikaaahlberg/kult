import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
  return(
    <ul>
      <li>
        <Link to="/">Hem</Link>
      </li>
      <li>
        <Link to="/book">Boka</Link>
      </li>
      <li>
        <Link to="/contact">Kontakt</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  )
};
