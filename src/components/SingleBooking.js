import React from "react";

export default function SingleEditableBooking(props){
  const { booking, selectBookingToEdit } = props;
  return(
    <ul className="bookingGrid" key={booking.id}>
      <li>{booking.date}</li>
      <li>{booking.guests}</li>
      <li>{booking.session}</li>
      <li>{booking.name}</li>
      <li>{booking.email}</li>
      <li>{booking.phone}</li>
      <li><button onClick={() => {selectBookingToEdit(booking)}}>Redigera</button></li>
    </ul>
  )
};