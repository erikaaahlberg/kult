import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from "./Calendar";
import clock from "./images/clock.png";
import calendar from"./images/calendar.svg";
import persons from"./images/person.png";




export default function BookingForm(){
  return(
    
    <form action="/api/create_booking/" method="POST">
    <div className="bookings">
    <label htmlFor="create_date"></label>
    <div className="box">
    <img className="icons"src={calendar} alt="calendar"/>
    </div>
    <Calendar/>
    <label htmlFor="create_session"></label>
    <div className="box">
    <img className="icons"src={clock} alt="clock"/>
    </div>
      <select name="create_session">
        <option value="18:00">18:00</option>
        <option value="21:00">21:00</option>
      </select>
     <label htmlFor="create_guests"></label>
     <div className="box">
     <img className="icons"src={persons} alt="persons"/>
     </div>

      <br />

      <select name="create_guests">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      </div>

      <div className="bookbutton">
      <button className="findtable" type="submit">SÖK BOKNING</button>
     </div>
      <br />
      <br />

      <div className="contact">
      <p>this mf suppose to come up when searching for tables if available tables on selected dates fill in your shit here</p>
      <br/>
      <p>Succesfull search<br/>
      Please fill in your contact info</p>
      <label htmlFor="create_name"><p>Namn</p></label>
      <br/>
      <input placeholder="Kult Svensson" name="create_name" id="create_name"/>
      <br/>
      <label htmlFor="create_email"><p>E-mail</p></label>
      <br/>
      <input placeholder="kult@gmail.com" name="create_email" id="create_email"/>
      <br/>
      <label htmlFor="create_phone"><p>Phone</p></label>
      <br/>
      <input placeholder="+46 761234567" name="create_phone" id="create_phone" required/>
      <br/>
      </div>
    </form>
  )
}