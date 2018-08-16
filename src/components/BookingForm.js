import React from "react";

export default function BookingForm(){
  return(
    <form action="/api/create_booking/" method="POST">
      <label for="create_guest">Antal gäster</label>
      <br/>
      <input placeholder="Max 4" name="create_guests"/>
      <br/>
      <label for="create_session">Sittning</label>
      <br/>
      <input placeholder="18:00 eller 21:00" name="create_session"/>
      <br/>
      <label for="create_date">Datum (obs formatera som i placeholdern)</label>
      <br/>
      <input placeholder="T.ex 2018-08-21" name="create_date"/>
      <br/>
      <label for="create_date">Namn</label>
      <br/>
      <input placeholder="Kult Svensson" name="create_name"/>
      <br/>
      <label for="create_date">E-mail</label>
      <br/>
      <input placeholder="kult@gmail.com" name="create_email"/>
      <br/>
      <label for="create_date">Phone</label>
      <br/>
      <input placeholder="+46 761234567" name="create_phone" required/>
      <br/>
      <button>Boka</button>
    </form>
  )
};
