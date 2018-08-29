import React, {Component} from "react";
import moment from "moment";
import "../../assets/styles/Admin.css";
import Calendar from "../Calendar";
import { fetchBookingsByCount } from '../GlobalFunctions/Fetch';
import { filterFullyBookedSessions, filterFullyBookedDates, filterDuplicateDates, filterBookedDates, sortBySession } from '../GlobalFunctions/Filter';
import SingleBooking from '../SingleBooking';
import SingleEditableBooking from '../SingleEditableBooking';
import Modal from "../Modal";

export default class Admin extends Component{

  state = {
    selectedDate: moment().format("YYYY/MM/DD"),
    fullyBookedDates: [],
    bookedDates: [],
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
    },
    modal: {
      showRegularModal: true,
      showModal: false,
      message: null,
    }
  }

  componentDidMount(){
    let date = this.encodedDate();
    this.sortBookings();
    this.fetchSelectedDate(date);
  }

  /* ------- Added by Erika ------- */
  sortBookings = () => {
    fetchBookingsByCount()
      .then((fetchedBookings) => {
        /* First filter fully booked sessions, if any, then filter fully booked dates. All to be excluded in datepicker */
        if (!fetchedBookings || fetchedBookings.length === 0) {
          return;
        } else {
          /* Filter dates with bookings to be highlighted in datepicker */
          const bookedDates = filterBookedDates(fetchedBookings);
          // console.log(bookedDates);

          if(bookedDates && bookedDates.lenght !== 0) {
            // console.log(`bokade: ${bookedDates}`);
            this.setState({ bookedDates });
          }
          const fullyBookedDates = filterFullyBookedDates(fetchedBookings);

          if(fullyBookedDates && fullyBookedDates.length !== 0) {
            this.setState({ fullyBookedDates });
          }
        }
      })
      .catch(() => {
        const message = `Bokningssystemet fungerar inte för tillfället `
        this.triggerShowModal(message, false);
      });
  }

  /* Test if the above works before removing this!

  fetchBookingsByCount = () => {
    return fetch("api/count")
      .then((response) => response.json())
      .then((fetchedBookings) => {
        return fetchedBookings;
      })
      .catch(() => {
        const message = `Bokningssystemet fungerar inte för tillfället
          – vi ber om ursäkt. Du kan även nå oss på telefon. Läs mer under `
        this.triggerShowModal(message, false);
      });
  }
*/

  fetchSelectedDate = (date) => {
    fetch(`/api/bookings/date/${date}`)
    .then(response => response.json())
    .then((bookingsOnSelectedDate) => {
      const sortedBookings = sortBySession(bookingsOnSelectedDate);
      this.setState({bookingsOnSelectedDate})
    })
    .catch(() => {
      const message = "Det går inte att hämta bokningar just nu."
      this.triggerShowModal(message, true);
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

    fetch("/api/update_booking", {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(requestBody)
    })
    .then((response) => {
      if (response.ok){
        return;
      } else {
        const message = "Det gick inte att uppdatera. Försök igen."
        this.triggerShowModal(message, true);
      }
    })
    .then(() => {
      this.updateAdminState();
    });
  }

  updateAdminState = () => {
    let date = this.encodedDate()
    // Fetch the selected date's bookings again, with new values.
    this.fetchSelectedDate(date)
    // Sort bookings again.
    this.sortBookings();
    // Reset selected id so all bookings render as editable again.
    this.setState({selectedId: null})
  }

  confirmDeleteBooking = () => {
    let confirmed = window.confirm("Vill du verkligen ta bort bokningen?");
    if (!confirmed) {
      return;
    } else {
      this.deleteSelectedBooking();
    }
  }

  deleteSelectedBooking = () => {
    const { selectedBooking } = this.state;
    const requestBody = {
      id: selectedBooking.id
    }

    fetch("/api/delete_booking", {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify(requestBody)
    })
    .then((response) => {
      if (response.ok){
        return;
      } else {
        const message = "Det gick inte att ta bort bokningen. Försök igen."
        this.triggerShowModal(message, true);
      }
    })
    .then(() => {
      this.updateAdminState();
    })
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

  updateDate = (date) => {
    this.setState({ selectedDate: date })
  }

  updateSelectedBookingInState = (event) => {
    let newValue = event.target.value;

    switch(event.target.name){
      case "update_date":
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              date: newValue,
          }
        })
        return;
      case "update_guests":
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              guests: newValue,
          }
        })
        return;
      case "update_session":
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              session: newValue,
          }
        })
        return;
      case "update_name":
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              name: newValue,
          }
        })
        return;
      case "update_email":
        this.setState({
          selectedBooking: {
              ...this.state.selectedBooking,
              email: newValue,
          }
        })
        return;
      case "update_phone":
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

  triggerShowModal = (message, showRegularModal) => {
    this.setState({
      modal: {
        message,
        showRegularModal,
        showModal: true,
      }
    })
  }

  closeModal = () => {
    this.setState({ modal: { showModal: false } });
  }

  renderHeadings = () => {
    const { bookingsOnSelectedDate } = this.state;
    if(bookingsOnSelectedDate < 1) {
      return;
    }
    return (
      <div className="bookingHeading">
        <label htmlFor="update_date">
          <strong>Datum</strong>
        </label>
        <label htmlFor="update_guests">
          <strong>Antal</strong>
        </label>
        <label htmlFor="update_session">
          <strong>Sittning</strong>
        </label>
        <label htmlFor="update_name">
          <strong>Bokat av</strong>
        </label>
        <label htmlFor="update_email">
          <strong>E-mail</strong>
        </label>
        <label htmlFor="update_phone">
          <strong>Telefon</strong>
        </label>
        <strong>Redigera</strong>
      </div>
    )
  }

  renderBookings = () => {
    const { bookingsOnSelectedDate, selectedBooking, selectedId } = this.state;

    if (bookingsOnSelectedDate < 1) {
      return(
        <p className="noBookings">
          Det finns inga bokningar det valda datumet.
        </p>
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
              confirmDeleteBooking={this.confirmDeleteBooking}
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
    const { showModal, showRegularModal, message } = this.state.modal;
    return(
      <React.Fragment>
        <div className="adminWrapper">
          <h1 className="adminHeader">Administratör</h1>

          <Modal
            showRegularModal={ showRegularModal }
            modalState={ showModal }
            message={ message }
            closeModal={ this.closeModal }
            clearPage={ this.clearPage }
          />

          <Calendar
            showAdminCalendar={true}
            updateDate={this.updateDate}
            fetchSelectedDate={this.fetchSelectedDate}
            bookedDates={this.state.bookedDates} 
            fullyBookedDates={this.state.fullyBookedDates}
          />
          <div className="boxContainer">
            <div className="boxYellow"></div>
            <p>= Bokningar</p>
            <div className="boxRed"></div>
            <p>= Fullbokat</p>
          </div>
          {this.renderHeadings()}
          {this.renderBookings()}
        </div>
      </React.Fragment>
    )
  }
};