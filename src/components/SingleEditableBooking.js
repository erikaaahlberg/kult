import React from "react";
import Check from "../assets/images/check.svg";
import TrashCan from "../assets/images/trash_can.svg";
import Image from "../components/Image";

export default function SingleEditableBooking(props){
  const {
    selectedBooking,
    updateSelectedBookingInState,
    updateSelectedBooking,
    confirmDeleteBooking,
  } = props;
  return(
    <ul className="booking">
      <li>
        <input
          value={selectedBooking.date}
          name="update_date"
          id="update_date"
          onChange={updateSelectedBookingInState}
        />
      </li>
      <li>
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
        <input
          value={selectedBooking.name}
          name="update_name"
          id="update_name"
          onChange={updateSelectedBookingInState}
        />
      </li>
      <li>
        <input
          value={selectedBooking.email}
          name="update_email"
          id="update_email"
          onChange={updateSelectedBookingInState}
        />
      </li>
      <li>
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
        <Image className="adminIcon" src={ Check } alt="Done" handleChange={updateSelectedBooking} />
        <Image className="adminIcon" src={ TrashCan } alt="Delete" handleChange={confirmDeleteBooking} />
      </li>
    </ul>
  )
};
