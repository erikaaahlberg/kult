import React from "react";
import Image from "../components/Image";
import BookingListItem from "../components/BookingListItem";
import Pen from "../assets/images/pen.svg";

export default function SingleEditableBooking(props){
  const { booking, selectBookingToEdit } = props;
  return(
    <React.Fragment>
      <h2 className="bookingHeader">Bokning:</h2>
      <ul className="booking" key={booking.id}>
        <BookingListItem 
          title="Datum" 
          item={booking.date}
        />
        <BookingListItem
          title="Gäster" 
          item={booking.guests}
        />
        <BookingListItem
          title="Sittning"
          item={booking.session} 
        />
        <BookingListItem 
          title="Namn"
          item={ 
            <span>{booking.name}</span> 
          }
        />
        <BookingListItem
          title="E-mail"
          item={
            <span>{booking.email}</span>
          }
        />
        <BookingListItem
          title="Telefon"
          item={booking.phone}
        />
        <BookingListItem 
          title="Redigera" 
          item={ 
            <Image 
              className="adminIcon"
              src={ Pen } 
              alt="Edit" 
              handleChange={() => {selectBookingToEdit(booking)}} 
            />
          }
        />
      </ul>
    </React.Fragment>
  )
};