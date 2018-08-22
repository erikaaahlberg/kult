import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from "./Calendar";

export default function BookingForm(props){
  const { createNewBooking, setBookingToState, setNewDateToState } = props;
  return(
    <div>
     <label htmlFor="create_guests">Antal gäster</label>
      <br />
      <select name="create_guests" onChange={setBookingToState}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <br />
      <label htmlFor="create_session">Sittning</label>
      <br/>
      <select name="create_session" onChange={setBookingToState}>
        <option value="18:00">18:00</option>
        <option value="21:00">21:00</option>
      </select>
      <br />
      <label htmlFor="create_date">Välj datum</label>
      <br />
      <Calendar setNewDateToState={setNewDateToState}/>
      <br/>
      <label htmlFor="create_name">Namn</label>
      <br/>
      <input placeholder="Kult Svensson" onChange={setBookingToState} name="create_name" id="create_name" required/>
      <br/>
      <label htmlFor="create_email">E-mail</label>
      <br/>
      <input placeholder="kult@gmail.com" onChange={setBookingToState} name="create_email" id="create_email" required/>
      <br/>
      <label htmlFor="create_phone">Phone</label>
      <br/>
      <input placeholder="+46 761234567" onChange={setBookingToState} name="create_phone" id="create_phone" required/>
      <br/>
      <button onClick={createNewBooking} type="submit">Boka</button>
    </div>
  )
}