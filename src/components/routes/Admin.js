import React, {Component} from "react";
import moment from "moment";
import Calendar from "../Calendar";
import SingleBooking from '../SingleBooking';
import SingleEditableBooking from '../SingleEditableBooking';

export default class Admin extends Component{

  state = {
    selectedDate: moment().format('YYYY/MM/DD'),
    bookingsOnSelectedDate: [],
    selectedId: null,
    selectedBooking: {
      id: null,
      date: null,
      guests: null,
      session: null,
      name: null,
      email: null,
      phone: null
    }
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

  updateSelectedBooking = (event) => {
    event.preventDefault();
    const { selectedBooking } = this.state;
    const requestBody = {
      date: selectedBooking.date,
      guests: selectedBooking.guests,
      session: selectedBooking.session,
      name: selectedBooking.name,
      email: selectedBooking.email,
      phone: selectedBooking.phone,
      id: selectedBooking.id
    }

    fetch('/api/update_booking', {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(requestBody)
    })
    .then(() => {
      let date = this.encodedDate()
      // Fetch the selected date's bookings again, with new values.
      this.fetchSelectedDate(date)
      // Reset selected id so all bookings render as editable again.
      this.setState({selectedId: null})
    })
    .catch((error) => {
      console.log(error); // TODO: Handle error output to user, remove console.log
    });
  }


  deleteSelectedBooking = (event) => {
    event.preventDefault();
    const { selectedBooking } = this.state;
    const requestBody = {
      id: selectedBooking.id
    }

    fetch('/api/delete_booking', {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify(requestBody)
    })
    .then(() => {
      let date = this.encodedDate()
      // Fetch the selected date's bookings again, with new values.
      this.fetchSelectedDate(date)
      // Reset selected id so all bookings render as editable again.
      this.setState({selectedId: null})
    })
    .catch((error) => {
      console.log(error); // TODO: Handle error output to user, remove console.log
    });
  }

  componentDidMount(){
    let date = this.encodedDate()
    this.fetchSelectedDate(date);
  }

  encodedDate = () => {
    let selectedDate = this.state.selectedDate;
    return encodeURIComponent(selectedDate);
  }

  selectBookingToEdit = (booking) => {
    this.setState({
      selectedBooking: {
        id: booking.id,
        date: booking.date,
        guests: booking.guests,
        session: booking.session,
        name: booking.name,
        email: booking.email,
        phone: booking.phone
      },
      selectedId: booking.id,
      selectedDate: booking.date,
    })
  }

  setNewDateToState = (date) => {
    this.setState({ selectedDate: date })
  }

  updateSelectedBookingInState = (event) => {
    let newValue = event.target.value;

    switch(event.target.name){
      case 'update_date':
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              date: newValue,
          }
        })
        return;
      case 'update_guests':
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              guests: newValue,
          }
        })
        return;
      case 'update_session':
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              session: newValue,
          }
        })
        return;
      case 'update_name':
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              name: newValue,
          }
        })
        return;
      case 'update_email':
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              email: newValue,
          }
        })
        return;
      case 'update_phone':
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              phone: newValue,
          }
        })
        return;
      default:
        break;
    }
  }

  renderBookings = () => {
    const { bookingsOnSelectedDate, selectedBooking, selectedId } = this.state;
    if(bookingsOnSelectedDate < 1){
      return(
        <p>Det finns inga bokningar det valda datumet.</p>
      )
    }
    else {
      return bookingsOnSelectedDate.map((booking) => {
        if(selectedId === booking.id){
          return(
            <SingleEditableBooking
              key={selectedBooking.id}
              selectedBooking={selectedBooking}
              updateSelectedBookingInState={this.updateSelectedBookingInState}
              updateSelectedBooking={this.updateSelectedBooking}
              deleteSelectedBooking={this.deleteSelectedBooking}
            />
          )
        }
        return (
          <SingleBooking
            key={booking.id}
            selectBookingToEdit={this.selectBookingToEdit}
            booking={booking}
          />
        )
      })
    }
  }

  render(){
    return(
      <div>
        <h1>Administratör</h1>
        <Calendar
          showAdminCalendar={true}
          setNewDateToState={this.setNewDateToState}
          fetchSelectedDate={this.fetchSelectedDate}
        />
        {this.renderBookings()}
      </div>
    )
  }
};