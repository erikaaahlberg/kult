import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from "./Calendar";

export default function BookingForm(){
  return(
    <form action="/api/create_booking/" method="POST">
     <label htmlFor="create_guests">Antal gäster</label>
      <br />
      <select name="create_guests">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <br />
      <label htmlFor="create_session">Sittning</label>
      <br/>
      <select name="create_session">
        <option value="18:00">18:00</option>
        <option value="21:00">21:00</option>
      </select>
      <br />
      <label htmlFor="create_date">Välj datum</label>
      <br />
      <Calendar/>
      <br/>
      <label htmlFor="create_name">Namn</label>
      <br/>
      <input placeholder="Kult Svensson" name="create_name" id="create_name"/>
      <br/>
      <label htmlFor="create_email">E-mail</label>
      <br/>
      <input placeholder="kult@gmail.com" name="create_email" id="create_email"/>
      <br/>
      <label htmlFor="create_phone">Phone</label>
      <br/>
      <input placeholder="+46 761234567" name="create_phone" id="create_phone" required/>
      <br/>
      <button type="submit">Boka</button>
    </form>
  )
}