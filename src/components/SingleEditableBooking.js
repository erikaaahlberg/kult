import React from "react";

export default function SingleEditableBooking(props){
  const {
    updateSelectedBookingInState,
    updateSelectedBooking,
    deleteSelectedBooking,
    selectedBooking
  } = props;
  return(
    <div className="bookingContainer">
      <h2 className="editBookingHeader">Bokning:</h2>
      <p>
        <label htmlFor="update_date"><strong>Datum:</strong></label>
        <input
          className="editBooking"
          value={selectedBooking.date}
          name="update_date"
          id="update_date"
          onChange={updateSelectedBookingInState}
        />
        <br />
        <label htmlFor="update_guests"><strong>Antal personer:</strong></label>
        <input
          className="editBooking"
          type="number"
          min="1"
          max="4"
          value={selectedBooking.guests}
          name="update_guests"
          id="update_guests"
          onChange={updateSelectedBookingInState}
        />
        <br />
        <label htmlFor="update_session"><strong>Sittning:</strong></label>
        <select
          className="editBooking"
          value={selectedBooking.session}
          name="update_session"
          id="update_session"
          onChange={updateSelectedBookingInState}
        >
          <option value="18:00">18:00</option>
          <option value="21:00">21:00</option>
        </select>
        <br />
        <label htmlFor="update_name"><strong>Bokat av:</strong></label>
        <input
          className="editBooking"
          value={selectedBooking.name}
          name="update_name"
          id="update_name"
          onChange={updateSelectedBookingInState}
        />
        <br />
        <label htmlFor="update_email"><strong>E-mail:</strong></label>
        <input
          className="editBooking"
          value={selectedBooking.email}
          name="update_email"
          id="update_email"
          onChange={updateSelectedBookingInState}
        />
        <br />
        <label htmlFor="update_phone"><strong>Telefon:</strong></label>
        <input
          className="editBooking"
          value={selectedBooking.phone}
          name="update_phone"
          id="update_phone"
          onChange={updateSelectedBookingInState}
        />
      </p>
      <input
        className="editBooking"
        value={selectedBooking.id}
        readOnly
        name="id"
        hidden={true}
        id="id"
      />
      <button onClick={deleteSelectedBooking} type="submit">Delete</button>
      <button onClick={updateSelectedBooking} type="submit">Klar</button>
    </div>
  )
};
