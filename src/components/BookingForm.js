import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from "./Calendar";
// import "../assets/styles/Booking.css";
// import clock from "../assets/images/clock.png";
// import calendar from"../assets/images/calendar.svg";
// import persons from"../assets/images/person.png";
import Selector from "./Form/Selector";

export default function BookingForm(props){
  const { createNewBooking, setBookingToState, setNewDateToState } = props;
  const tempArray = ['18:00', '21:00'];
  return(
    
    <React.Fragment>
      <label htmlFor="create_date">Välj datum</label>
      <Calendar setNewDateToState={setNewDateToState}/>

      <label htmlFor="create_session">Sittning</label>
      <Selector name={'create_session'} availableSessions={tempArray} setBookingToState={setBookingToState} />

      <label htmlFor="create_guests">Antal personer</label>
      <select name="create_guests" onChange={setBookingToState}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      
      <br/>
      <label htmlFor="create_name">Namn</label>
      <input placeholder="Kult Svensson" onChange={setBookingToState} name="create_name" id="create_name" required />

      <label htmlFor="create_email">E-mail</label>
      <input placeholder="kult@gmail.com" onChange={setBookingToState} name="create_email" id="create_email" required />

      <label htmlFor="create_phone">Telefon</label>
      <input placeholder="+46 761234567" onChange={setBookingToState} name="create_phone" id="create_phone" required />

      <button onClick={createNewBooking} type="submit">Boka</button>
    </React.Fragment>
  )
}