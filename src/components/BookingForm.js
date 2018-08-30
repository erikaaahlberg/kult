import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/styles/Booking.css";
import ClockIcon from "../assets/images/clock.png";
import CalendarIcon from "../assets/images/calendar.svg";
import UserIcon from "../assets/images/user.png";
import Selector from "./Form/Selector";
import Calendar from "./Calendar";
import Image from "./Image";

export default function BookingForm(props) {
  const {
    // bookingShouldBeDisabled,
    createNewBooking,
    updateBooking,
    updateDate,
    findSessionsForSelectedDate,
    availableSessions,
    fullyBookedDates,
  } = props;

  // TODO: Split up.

  return (
    <React.Fragment>
      <form onSubmit={ createNewBooking } className="bookingFormWrapper">
        <div className="bookingForm">
        <div>
          <div className="container">
            <Image
              className="icons"
              src={CalendarIcon}
              alt="Calendar"
            />
            <div>
              <label className="bookingLabel" htmlFor="create_date">
                Välj datum
              </label>
              <Calendar
                updateDate={updateDate}
                fullyBookedDates={fullyBookedDates}
                findSessionsForSelectedDate={findSessionsForSelectedDate}
              />
            </div>
          </div>
          <div className="container">
            <Image
              className="icons"
              src={ClockIcon}
              alt="Clock"
            />
            <div>
              <label className="bookingLabel" htmlFor="create_session">
                Sittning
              </label>
              <br />
              <Selector
                name="create_session"
                availableSessions={availableSessions}
                updateBooking={updateBooking}
              />
            </div>
          </div>
          <div>
          </div>
            <div className="container">
              <Image
                className="icons"
                src={ UserIcon }
                alt="User"
              />
              <div>
                <label className="bookingLabel" htmlFor="create_guests">
                  Antal personer
                </label>
                <br />
                <select className="bookingSelect" name="create_guests" onChange={ updateBooking }>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>

          
          <div>
            <div>
              <label className="bookingLabel" htmlFor="create_name">Namn</label>
              <br />
              <input
                placeholder="Kult Svensson"
                onChange={ updateBooking }
                name="create_name"
                id="create_name"
                required
              />
            </div>
            <div>
              <label className="bookingLabel" htmlFor="create_email">E-mail</label>
              <br />
              <input
                placeholder="kult@gmail.com"
                onChange={ updateBooking }
                name="create_email"
                id="create_email"
                required
              />
            </div>
            <div>
              <label className="bookingLabel" htmlFor="create_phone">Telefon</label>
              <br />
              <input
                placeholder="+46 761234567"
                onChange={ updateBooking }
                name="create_phone"
                id="create_phone"
                required
              />
            </div>
          </div>
        </div>
        <button className="button" type="submit">Boka</button>
      </form>
    </React.Fragment>
  );
}
