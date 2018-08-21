import React, {Component} from "react";
import BookingForm from "../BookingForm";

export default class Book extends Component{
  state = {
    existingBookings: [],
  }

  fetchBookings = () => {
    fetch('/api/bookings')
    .then(response => response.json())
    .then((existingBookings) => {
        this.setState({existingBookings})
    })
    .catch((error) => {
      // TODO: Handle error output to user, remove console.log
        console.log(error);
    });
  }

  /** TODO:
   * This is a temporary (!) render to see what raw data comes out of db,
   * this should not be shown here later. And maybe fetch elsewhere.
   * */
  renderExistingBookings = () => {
    if(!this.state.existingBookings){
      return;
    } else {
      return this.state.existingBookings.map((booking) => {
        return (
          <ul key={booking.id}>
            <h3>Bokning: </h3>
            <li>Datum: {booking.date}</li>
            <li>Antal personer: {booking.guests}</li>
            <li>Sittning: {booking.session}</li>
            <li>Bokat av: {booking.name}</li>
            <li>E-mail: {booking.email}</li>
            <li>Telefon: {booking.phone}</li>
          </ul>
        )
      }
    )}
  }

  componentDidMount(){
    this.fetchBookings();
  }

  render(){
    return(
      <div>
        <h1>Boka bord</h1>
        <p>Det här är komponenten för bokningssidan – jag finns i components/routes/Book.</p>
        <BookingForm />
        <h2>Nuvarande bokningar i databasen:</h2>
        {this.state.existingBookings.length < 1 &&
          <p>Inga bokningar just nu.</p>
        }
        {this.renderExistingBookings()}
      </div>
    )
  }
};