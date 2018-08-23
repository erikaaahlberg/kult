import React from "react";

export default function SingleEditableBooking(props){
  const { booking, selectBookingToEdit } = props;
  return(
    <div className="bookingContainer" key={booking.id}>
      <h2 className="editBookingHeader">Bokning: </h2>
        <p>
          <strong>Datum:</strong> {booking.date}
          <br />
          <strong>Antal personer:</strong> {booking.guests}
          <br />
          <strong>Sittning:</strong> {booking.session}
          <br />
          <strong>Bokat av:</strong> {booking.name}
          <br />
          <strong>E-mail:</strong> {booking.email}
          <br />
          <strong>Telefon:</strong> {booking.phone}
        </p>
      <button onClick={() => {selectBookingToEdit(booking)}}>Redigera</button>
    </div>
  )
};