import React, {Component} from "react";
import moment from 'moment';
import Calendar from "../Calendar";

export default class Admin extends Component{

  state = {
    bookingsOnSelectedDate: [],
    selectedIdToEdit: null,
  }

  renderBookings = () => {
    if(!this.state.bookingsOnSelectedDate){
      return;
    }
     else {
      return this.state.bookingsOnSelectedDate.map((booking) => {
        if(this.state.selectedIdToEdit === booking.id){
          return (
            <ul key={booking.id}>
            <h3>REDIGERAR: </h3>
            <li>Datum: {booking.date}</li>
            <li>Antal personer: {booking.guests}</li>
            <li>Sittning: {booking.session}</li>
            <li>Bokat av: {booking.name}</li>
            <li>E-mail: {booking.email}</li>
            <li>Telefon: {booking.phone}</li>
            <button onClick={() => {this.setState({selectedIdToEdit: null})}}>Klar</button>
          </ul>
          )
        }
        return (
          <ul key={booking.id}>
            <h3>Bokning: </h3>
            <li>Datum: {booking.date}</li>
            <li>Antal personer: {booking.guests}</li>
            <li>Sittning: {booking.session}</li>
            <li>Bokat av: {booking.name}</li>
            <li>E-mail: {booking.email}</li>
            <li>Telefon: {booking.phone}</li>
            <button onClick={() => {this.setState({selectedIdToEdit: booking.id})}}>Redigera</button>
          </ul>
        )
      }
    )}
  }

  fetchSelectedDate = (date) => {
    fetch(`/api/bookings/date/${date}`)
    .then(response => response.json())
    .then((bookingsOnSelectedDate) => {
      this.setState({bookingsOnSelectedDate})
    })
    .catch((error) => {
      // TODO: Handle error output to user, remove console.log
      console.log(error);
    });
  }


  render(){
    return(
      <div>
        <h1>Administratör</h1>

        <Calendar showAdminCalendar={true} fetchSelectedDate={this.fetchSelectedDate}/>

        {this.state.bookingsOnSelectedDate.length < 1 &&
          <p>Det finns inga bokningar det valda datumet.</p>
        }

        {this.renderExistingBookings()}

      </div>
    )
  }
};