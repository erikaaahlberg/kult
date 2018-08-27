import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import "../assets/styles/Booking.css";
import ClockIcon from "../assets/images/clock.png";
import CalendarIcon from"../assets/images/calendar.svg";
import UserIcon from"../assets/images/user.png";
import Selector from "./Form/Selector";
import Calendar from "./Calendar";
import Image from "./Image";

export default function BookingForm(props){
  const { createNewBooking,
    updateBooking,
    updateDate,
    findSessionsForSelectedDate,
    availableSessions,
    fullyBookedDates } = props;
  return(
    <React.Fragment>
      <div className="bookingWrapper">
        <Image
          className="icons"
          src={ CalendarIcon }
          alt="Calendar"
        />
        <div className="container">
          <label htmlFor="create_date">
            Välj datum
          </label>
          <Calendar
            updateDate={ updateDate }
            fullyBookedDates={ fullyBookedDates }
            findSessionsForSelectedDate={ findSessionsForSelectedDate }
          />
        </div>
        <Image
          className="icons"
          src={ ClockIcon }
          alt="Clock"
        />
        <div className="container">
          <label htmlFor="create_session">
            Sittning
          </label>
          <br />
          <Selector
            name={'create_session'}
            availableSessions={ availableSessions }
            updateBooking={ updateBooking }
          />
        </div>
        <Image
          className="icons"
          src={ UserIcon }
          alt="User"
        />
        <div className="container">
          <label htmlFor="create_guests">
            Antal personer
          </label>
          <br />
          <select name="create_guests" onChange={ updateBooking }>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
      <div className="contactInfoWrapper">
        <p>
          Innan din bokning kan genomföras – behöver
          <br />vi veta lite mer om dig!
        </p>
        <label htmlFor="create_name">Namn</label>
        <input
          placeholder="Kult Svensson"
          onChange={ updateBooking }
          name="create_name"
          id="create_name"
        />
        <label htmlFor="create_email">E-mail</label>
        <input
          placeholder="kult@gmail.com"
          onChange={ updateBooking }
          name="create_email"
          id="create_email"
        />
        <label htmlFor="create_phone">Telefon</label>
        <input
          placeholder="+46 761234567"
          onChange={ updateBooking }
          name="create_phone"
          id="create_phone"
        />
        <button className="bookButton" onClick={createNewBooking} type="submit">Boka</button>
      </div>
    </React.Fragment>
  )
}