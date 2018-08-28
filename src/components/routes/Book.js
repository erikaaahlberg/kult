import React, { Component } from "react";
import moment from "moment";
import { removeFromArray, formatDateString, findDuplicateDates } from '../../helpers';
import { fetchBookingsByCount } from '../GlobalFunctions/Fetch';
import BookingForm from "../BookingForm";

export default class Book extends Component{

  state = {
    booking: {
      date: moment().format("YYYY/MM/DD"),
      guests: 1, // Needs this as intial default value.
      session: "18:00", // Same here.
      name: null,
      email: null,
      phone: null
    },
    fullyBookedSessions: [],
    fullyBookedDates: [],
    availableSessions: ["18:00", "21:00"]
  }

  componentDidMount(){
    this.findFullyBookedSessions();
  }

  findFullyBookedSessions = () => {
    this.fetchBookingsByCount()
    .then((fetchedBookings) => {
      let fullyBookedSessions = [];

      for (let i = 0; i < fetchedBookings.length; i++) {
        let numberOfBookings = fetchedBookings[i].count;

        if (numberOfBookings === 5) {
          fullyBookedSessions.push({
            date: fetchedBookings[i].date,
            session: fetchedBookings[i].session
          });
        }
      }

      // There are fully booked sessions, store them in state.
      if (fullyBookedSessions.length > 0) {
        this.setState({ fullyBookedSessions });
        this.findFullyBookedDates();
        this.findSessionsForSelectedDate();
      }
    });
  }

  fetchBookingsByCount = () => {
    return fetch("api/count")
      .then((response) => response.json())
      .then((fetchedBookings) => {
        return fetchedBookings;
      })
      .catch((error) => {
        // TODO: Handle error output to user, remove console.log
        console.log(error);
      });
  }

  findSessionsForSelectedDate = (selectedDate) => {
    const defaultSessions = ["18:00", "21:00"];

    if(!selectedDate){
      /** User has not selected a date,
       * which means they want to book today. */
      let today = moment();
      selectedDate = formatDateString(today);
    }

    if (this.state.fullyBookedSessions.length > 0) {
      const fullyBookedSessions = this.state.fullyBookedSessions;

      for (let i = 0; i < fullyBookedSessions.length; i++) {
        if (selectedDate === fullyBookedSessions[i].date) {
          let sessionToRemove = fullyBookedSessions[i].session;
          let availableSessions = removeFromArray(defaultSessions, sessionToRemove);
          this.setState({ availableSessions });
          return;
        }
        else {
          // No fully booked sessions on selected date, both sessions are available!
          this.setState({ availableSessions: defaultSessions });
        }
      }
    }
  }

  findFullyBookedDates = () => {
    const { fullyBookedSessions } = this.state;

    /** Check if there are two fully booked sessions on the same date,
    that would mean there are no seats left either 18:00 or 21:00. */
    let fullyBookedDates = findDuplicateDates(fullyBookedSessions);

    if(fullyBookedDates.length > 0) {
      this.setState({ fullyBookedDates });
    }
  }

  createNewBooking = (event) => {
    event.preventDefault();
    const { booking } = this.state;
    let requestBody = {
      date: booking.date,
      guests: booking.guests,
      session: booking.session,
      name: booking.name,
      email: booking.email,
      phone: booking.phone
    }

    fetch("/api/create_booking", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(requestBody)
    })
    .then((response) => {
      if(response.ok){
        console.log("Booking added!") // TODO: Tell the user booking is confirmed! Show this somehow.
      }
    }).catch((error) => {
      console.log(error); // TODO: Handle error output to user, remove console.log
    });
  }

  // Called when user changes the input values of booking form.
  updateBooking = (event) => {
    let newValue = event.target.value;
    switch(event.target.name){
      case "create_guests":
        this.setState({
          booking: {
            ...this.state.booking,
            guests: newValue,
          }
        })
        return;
      case "create_session":
        this.setState({
          booking: {
            ...this.state.booking,
            session: newValue,
          }
        })
        return;
      case "create_name":
        this.setState({
          booking: {
            ...this.state.booking,
            name: newValue,
          }
        })
        return;
      case "create_email":
        this.setState({
          booking: {
            ...this.state.booking,
            email: newValue,
          }
        })
        return;
      case "create_phone":
        this.setState({
          booking: {
            ...this.state.booking,
            phone: newValue,
          }
        })
        return;
      default:
        break;
    }
  }

  /* updateDate() is called when user changes date in the datepicker.
  * It's seperated from updateBooking() since multiple things happens onChange
  * for the datepicker. It is not triggered by one onChange event in itself.
  */
  updateDate = (date) => {
    this.setState({
      booking: {
        ...this.state.booking,
        date: date,
      }
    })
  }

  render(){
    const { fullyBookedDates, availableSessions } = this.state;
    return(
      <div className="wrapper">
        <h1 className="smallHeader">BOKA BORD</h1>
        <BookingForm
          availableSessions={ availableSessions }
          fullyBookedDates={ fullyBookedDates }
          findSessionsForSelectedDate={ this.findSessionsForSelectedDate }
          updateBooking={ this.updateBooking }
          updateDate={ this.updateDate }
          createNewBooking={ this.createNewBooking }
        />
      </div>
    )
  }
};