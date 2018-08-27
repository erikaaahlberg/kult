import React, {Component} from "react";
import moment from 'moment';
import BookingForm from "../BookingForm";

export default class Book extends Component{

  state = {
    booking: {
      date: moment().format('YYYY/MM/DD'),
      guests: 1, // Needs this as intial default value.
      session: '18:00', // Same here.
      name: null,
      email: null,
      phone: null
    },
    fullyBookedSessions: [],
    fullyBookedDates: [],
    availableSessions: ['18:00', '21:00'],
  }

  componentDidMount(){
    this.sortBySession();
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

    fetch('/api/create_booking', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(requestBody)
    })
    .then((response) => {
      if(response.ok){
        console.log('Booking added!') // TODO: Tell the user thar booking is confirmed! Show this somehow.
      }
    }).catch((error) => {
      console.log(error); // TODO: Handle error output to user, remove console.log
    });
  }

  /** NOTE ON THE TWO FUNCTIONS BELOW:
   * Called onChange in booking form and in calendar,
   * used to set the input values to this state,
   * which then can be used for createNewBooking
   * Date is seperated since it needs to do multiple things onChange,
   * and is not triggered by one onChange event in itself.
   */
  setBookingToState = (event) => {
    let newValue = event.target.value;
    switch(event.target.name){
      case 'create_guests':
        this.setState({
          booking: {
            ...this.state.booking,
            guests: newValue,
          }
        })
        return;
      case 'create_session':
        this.setState({
          booking: {
            ...this.state.booking,
            session: newValue,
          }
        })
        return;
      case 'create_name':
        this.setState({
          booking: {
            ...this.state.booking,
            name: newValue,
          }
        })
        return;
      case 'create_email':
        this.setState({
          booking: {
            ...this.state.booking,
            email: newValue,
          }
        })
        return;
      case 'create_phone':
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

  setNewDateToState = (date) => {
    this.setState({
      booking: {
        ...this.state.booking,
        date: date,
      }
    })
  }

  /*-------------From Calendar--------------*/
  fetchBookingsByCount = () => {
    return fetch('api/count')
      .then((response) => response.json())
        .then((fetchedBookings) => {
          return fetchedBookings;
        })
        .catch((error) => {
          // TODO: Handle error output to user, remove console.log
          console.log(error);
        });
  }

  formatDateString = (unformatted) => {
    return moment(unformatted).format('YYYY/MM/DD');
  }

  sortBySession = () => {
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
      if (fullyBookedSessions.length > 0) {
        this.setState({ fullyBookedSessions: fullyBookedSessions });
        this.findFullyBookedDates();
        this.findSessionForSelectedDate();
      }
    });
  }

  findFullyBookedDates = () => {
    let fullyBookedDates = this.findDuplicateDates(this.state.fullyBookedSessions);
    if(fullyBookedDates.length > 0) {
      this.setState({ fullyBookedDates: fullyBookedDates });
    }
  }

  findDuplicateDates = (array) => {
    let duplicateDates = [];
    const lastIndex = array.length -1;
    for (let i = 0; i < array.length; i++) {
      if (i !== lastIndex) {
        for (let p = i + 1; p < array.length; p++) {
          if (array[i].date === array[p].date) {
            duplicateDates.push(array[i].date);
          }
        }
      }
    }
    return duplicateDates;
  }

  removeFromArray = (sessions, sessionToRemove) => {
    return sessions.filter(session => session !== sessionToRemove);
  }

  findSessionForSelectedDate = (selectedDate) => {
    const sessions = ['18:00', '21:00'];

    if(!selectedDate){
      /** User has not changed date in the datepickes,
       * which means they want to book today. */
      let today = moment();
      selectedDate = this.formatDateString(today);
    }

    if (this.state.fullyBookedSessions.length > 0) {
      const fullyBookedSessions = this.state.fullyBookedSessions;

      for (let i = 0; i < fullyBookedSessions.length; i++) {
        if (selectedDate === fullyBookedSessions[i].date) {
          let sessionToRemove = fullyBookedSessions[i].session;
          let availableSessions = this.removeFromArray(sessions, sessionToRemove);
          this.setState({ availableSessions });
          return;
        }
        else {
          // No fully booked sessions on selected date, both sessions are available!
          this.setState({ availableSessions: sessions });
        }
      }
    }
  }

  render(){
    console.group('State in Book.js:');
      console.log('AvailableSessions: ', this.state.availableSessions);
      console.log('FullyBookedDates: ', this.state.fullyBookedDates);
      console.log('FullyBookedSessions: ', this.state.fullyBookedSessions);
    console.groupEnd();

    return(
      <div className="wrapper">
        <h1 className="smallHeader">BOKA BORD</h1>
        <p>Ha så kult på restaurangen!</p>
        <BookingForm
          setBookingToState={this.setBookingToState}
          setNewDateToState={this.setNewDateToState}
          createNewBooking={this.createNewBooking}
          fullyBookedSessions={this.state.fullyBookedSessions}
          findSessionForSelectedDate={this.findSessionForSelectedDate}
          availableSessions={this.state.availableSessions}
          fullyBookedDates={this.state.fullyBookedDates}
        />
      </div>
    )
  }
};