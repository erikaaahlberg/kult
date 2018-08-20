import React from "react";

export default function SingleEditableBooking(props){
  const { booking, selectBookingToEdit } = props;
  return(
    <div key={booking.id}>
      <h2>Bokning: </h2>
      <p>Datum: {booking.date}</p>
      <p>Antal personer: {booking.guests}</p>
      <p>Sittning: {booking.session}</p>
      <p>Bokat av: {booking.name}</p>
      <p>E-mail: {booking.email}</p>
      <p>Telefon: {booking.phone}</p>
      <button onClick={() => {selectBookingToEdit(booking)}}>Redigera</button>
    </div>
  )
};