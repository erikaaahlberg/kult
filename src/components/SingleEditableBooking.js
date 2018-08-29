import React from "react";
import Check from "../assets/images/check.svg";
import TrashCan from "../assets/images/trash_can.svg";
import BookingListItem from "../components/BookingListItem";
import Image from "../components/Image";

export default function SingleEditableBooking(props){
  const {
    selectedBooking,
    updateSelectedBookingInState,
    updateSelectedBooking,
    confirmDeleteBooking,
  } = props;
  return(
    <React.Fragment>
      <h2 className="bookingHeader">Bokning:</h2>
      <ul className="booking">
        <BookingListItem
          title="Datum"
          item={
            <input
              value={selectedBooking.date}
              name="update_date"
              id="update_date"
              onChange={updateSelectedBookingInState}
            />
          }
        />
        <BookingListItem
          title="Antal"
          item= {
            <input
              type="number"
              min="1"
              max="4"
              value={selectedBooking.guests}
              name="update_guests"
              id="update_guests"
              onChange={updateSelectedBookingInState}
            />
          }
        />
        <BookingListItem
          title="Sittning"
          item={
            <select
              value={selectedBooking.session}
              name="update_session"
              id="update_session"
              onChange={updateSelectedBookingInState}
            >
              <option value="18:00">18:00</option>
              <option value="21:00">21:00</option>
            </select>

          }
        />
        <BookingListItem
          title="Namn"
          item={
            <input
              value={selectedBooking.name}
              name="update_name"
              id="update_name"
              onChange={updateSelectedBookingInState}
            />
          }
        />
        <BookingListItem
          title="E-mail"
          item={
            <input
              value={selectedBooking.email}
              name="update_email"
              id="update_email"
              onChange={updateSelectedBookingInState}
            />
          }
        />
        <BookingListItem
          title="Telefon"
          item={
            <React.Fragment>
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
            </React.Fragment>
          }
        />
        <BookingListItem
          title="Redigera"
          item={
            <span>
              <Image
                className="adminIcon"
                src={ Check } alt="Delete"
                handleChange={updateSelectedBooking}
              />
              <Image
                className="adminIcon"
                src={ TrashCan }
                alt="Delete"
                handleChange={confirmDeleteBooking}
              />
            </span>
          }
        />
    </ul>
    </React.Fragment>
  )
};
