import React, {Component} from "react";
import BookingForm from "../BookingForm";


export default class Book extends Component{
  state = {
    existingBookings: [],
    availableSessions: [],
    fullyBookedSessions: [],
    fullyBookedDates: []
  }

  fetchAllBookings = () => {
    fetch('/api/bookings')
    .then(response => response.json())
    .then((existingBookings) => {
        this.setState({existingBookings: existingBookings})
    })
    .catch((error) => {
      // TODO: Handle error output to user, remove console.log
        console.log(error);
    });
  }

  fetchBookingsByCount = () => {
    return fetch('api/count')
      .then((response) => response.json())
        .then((fetchedBookings) => {
          console.log(fetchedBookings);
          return fetchedBookings;
        })
        .catch((error) => {
          // TODO: Handle error output to user, remove console.log
          console.log(error);
        });
  }

  sortBySession = () => {
    let numberOfBookings = 0;
    let availableSessions = [];
    let fullyBookedSessions = [];

    this.fetchBookingsByCount()
      .then((fetchedBookings) => {
        for (let i = 0; i < fetchedBookings.length; i++) {
          let numberOfBookings = fetchedBookings[i].count;
          console.log(fetchedBookings[i].count);

          if (numberOfBookings < 5) {
            const tablesLeft = 5 - numberOfBookings;

            availableSessions.push({
              date: fetchedBookings[i].date,
              session: fetchedBookings[i].session,
              tablesLeft: tablesLeft
            });
          }
          else if (numberOfBookings === 5) {
            const tablesLeft = 5 - numberOfBookings;
            fullyBookedSessions.push({
              date: fetchedBookings[i].date,
              session: fetchedBookings[i].session,
              tablesLeft: tablesLeft
            });
          }
        }
        if (availableSessions.length > 0) {
          console.log(availableSessions);
          this.setState({ availableSessions: availableSessions });
        }
        if (fullyBookedSessions.length > 0) {
          console.log(fullyBookedSessions);
          this.setState({ fullyBookedSessions: fullyBookedSessions });
          this.sortByFullyBookedDates();
        }
      });
  }

  sortByFullyBookedDates = () => {
    let fullyBookedSessions = this.state.fullyBookedSessions;
    let fullyBookedDates = this.findDuplicateDates(fullyBookedSessions);
    console.log(fullyBookedSessions);
    if(fullyBookedDates.length > 0) {
      this.setState({ fullyBookedDates: fullyBookedDates });
      console.log(this.state.fullyBookedDates);
    }
  }
  findDuplicateDates = (array) => {
    let duplicateDates = [];
    const lastIndex = array.length -1;
    for (let i = 0; i < array.length; i++) {
      if (i != lastIndex) {
        for (let p = i + 1; p < array.length; p++) {
          if (array[i].date === array[p].date) {
            duplicateDates.push(array[i].date);
          }
        }
      }
    }
    return duplicateDates;
  }
  /** TODO:
   * This is a temporary (!) render to see what raw data comes out of db,
   * this should not be shown here later. And maybe fetch elsewhere.
   * */
  renderExistingBookings = () => {
    if(!this.state.existingBookings){
      console.log(this.state.existingBookings);
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
    this.fetchAllBookings();
    this.fetchBookingsByCount();
    this.sortBySession();
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