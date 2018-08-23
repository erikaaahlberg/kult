import React, {Component} from "react";
import moment from 'moment';
import BookingForm from "../BookingForm";

export default class Book extends Component{

  state = {
    existingBookings: [],
    booking: {
      date: moment().format('YYYY/MM/DD'),
      guests: 1, // Needs this as intial default value.
      session: '18:00', // Same here.
      name: null,
      email: null,
      phone: null
    }
  }

  componentDidMount(){
    this.fetchBookings();
  }

  fetchBookings = () => {
    fetch('/api/bookings')
      .then(response => response.json())
      .then((existingBookings) => {
        this.setState({ existingBookings })
      })
      .catch((error) => {
        console.log(error); // TODO: Handle error output to user, remove console.log
      });
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

  render(){
    return(
      <div>
        <h1>Boka bord</h1>
        <p>Det här är komponenten för bokningssidan – jag finns i components/routes/Book.</p>
        <BookingForm
          setBookingToState={this.setBookingToState}
          setNewDateToState={this.setNewDateToState}
          createNewBooking={this.createNewBooking}
        />
      </div>
    )
  }
};