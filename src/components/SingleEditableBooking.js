import React from "react";

export default function SingleEditableBooking(props){
  const { updateSelectedBookingInState, updateSelectedBooking, selectedBooking } = props;
  return(
    <div>
      <h2>Bokning:</h2>
      <p>
        <label htmlFor="update_date">Datum:</label>
        <input
          value={selectedBooking.date}
          name="update_date"
          id="update_date"
          onChange={updateSelectedBookingInState}
        />
      </p>
      <p>
        <label htmlFor="update_guests">Antal gäster:</label>
        <input
          type="number"
          max="4"
          value={selectedBooking.guests}
          name="update_guests"
          id="update_guests"
          onChange={updateSelectedBookingInState}
        />
      </p>
      <p>
        <label htmlFor="update_session">Sittning:</label>
        <select
          value={selectedBooking.session}
          name="update_session"
          id="update_session"
          onChange={updateSelectedBookingInState}
        >
          <option value="18:00">18:00</option>
          <option value="21:00">21:00</option>
        </select>
      </p>
      <p>
        <label htmlFor="update_name">Bokat av:</label>
        <input
          value={selectedBooking.name}
          name="update_name"
          id="update_name"
          onChange={updateSelectedBookingInState}
        />
      </p>
      <p>
        <label htmlFor="update_email">E-mail:</label>
        <input
          value={selectedBooking.email}
          name="update_email"
          id="update_email"
          onChange={updateSelectedBookingInState}
        />
      </p>
      <p>
        <label htmlFor="update_phone">Telefon:</label>
        <input
          value={selectedBooking.phone}
          name="update_phone"
          id="update_phone"
          onChange={updateSelectedBookingInState}
        />
      </p>
      <input
        value={selectedBooking.id}
        readOnly
        name="id"
        hidden={true}
        id="id"
      />
      <button onClick={updateSelectedBooking} type="submit">Klar</button>
    </div>
  )
};
