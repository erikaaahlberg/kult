import React from "react";
import Check from "../assets/images/check.svg";
import TrashCan from "../assets/images/trash_can.svg";
import Image from "../components/Image";

export default function SingleEditableBooking(props){
  const {
    updateSelectedBookingInState,
    updateSelectedBooking,
    deleteSelectedBooking,
    selectedBooking
  } = props;
  return(
    <React.Fragment>
      <h2 className="bookingHeader">Bokning:</h2>
      <ul className="booking">
        <li>
          <span className="deviceHeading">Datum:</span>
          <input
            value={selectedBooking.date}
            name="update_date"
            id="update_date"
            onChange={updateSelectedBookingInState}
          />
        </li>
        <li>
          <span className="deviceHeading">Antal:</span>
          <input
            type="number"
            min="1"
            max="4"
            value={selectedBooking.guests}
            name="update_guests"
            id="update_guests"
            onChange={updateSelectedBookingInState}
          />
        </li>
        <li>
          <span className="deviceHeading">Sittning:</span>
          <select
            value={selectedBooking.session}
            name="update_session"
            id="update_session"
            onChange={updateSelectedBookingInState}
          >
            <option value="18:00">18:00</option>
            <option value="21:00">21:00</option>
          </select>
        </li>
        <li>
          <span className="deviceHeading">Namn:</span>
          <input
            value={selectedBooking.name}
            name="update_name"
            id="update_name"
            onChange={updateSelectedBookingInState}
          />
        </li>
        <li>
          <span className="deviceHeading">E-mail:</span>
          <input
            value={selectedBooking.email}
            name="update_email"
            id="update_email"
            onChange={updateSelectedBookingInState}
          />
        </li>
        <li>
          <span className="deviceHeading">Telefon:</span>
          <input
            value={selectedBooking.phone}
            name="update_phone"
            id="update_phone"
            onChange={updateSelectedBookingInState}
          />
          <input
            value={selectedBooking.id}
            readOnly
            name="id"
            hidden={true}
            id="id"
          />
        </li>
        <li>
          <span className="deviceHeading">Redigera:</span>
          <span>
            <Image className="adminIcon" src={ Check } alt="Delete" handleChange={updateSelectedBooking} />
            <Image className="adminIcon" src={ TrashCan } alt="Delete" handleChange={deleteSelectedBooking} />
          </span>
        </li>
      </ul>
    </React.Fragment>
  )
};
