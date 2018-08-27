import React from "react";
import Image from "../components/Image";
import Pen from "../assets/images/pen.svg";

export default function SingleEditableBooking(props){
  const { booking, selectBookingToEdit } = props;
  return(
    <ul className="booking" key={booking.id}>
      <li>{booking.date}</li>
      <li>{booking.guests}</li>
      <li>{booking.session}</li>
      <li>{booking.name}</li>
      <li>{booking.email}</li>
      <li>{booking.phone}</li>
      <li>
        <Image className="adminIcon" src={ Pen } alt="Edit" handleChange={() => {selectBookingToEdit(booking)}} />
      </li>
    </ul>
  )
};