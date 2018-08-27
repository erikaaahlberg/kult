import React from "react";

export default function SingleEditableBooking(props){
  const {
    updateSelectedBookingInState,
    updateSelectedBooking,
    deleteSelectedBooking,
    selectedBooking
  } = props;
  return(
    <div className="bookingGrid">
      <input
        className="editBooking"
        value={selectedBooking.date}
        name="update_date"
        id="update_date"
        onChange={updateSelectedBookingInState}
      />
  
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
      
      <input
        className="editBooking"
        value={selectedBooking.name}
        name="update_name"
        id="update_name"
        onChange={updateSelectedBookingInState}
      />
      
      <input
        className="editBooking"
        value={selectedBooking.email}
        name="update_email"
        id="update_email"
        onChange={updateSelectedBookingInState}
      />
      
      <input
        className="editBooking"
        value={selectedBooking.phone}
        name="update_phone"
        id="update_phone"
        onChange={updateSelectedBookingInState}
      />
      <input
        className="editBooking"
        value={selectedBooking.id}
        readOnly
        name="id"
        hidden={true}
        id="id"
      />
      <button onClick={updateSelectedBooking} type="submit">Klar</button>
      <button onClick={deleteSelectedBooking} type="submit">Delete</button>
    </div>
  )
};
