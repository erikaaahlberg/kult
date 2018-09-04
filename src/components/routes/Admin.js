import React, { Component } from "react";
import moment from "moment";
import "../../assets/styles/Admin.css";
import Calendar from "../Calendar";
import Header from "../Header";
import ColorBoxes from "../ColorBoxes";
import { fetchBookingsByCount } from "../GlobalFunctions/Fetch";
import { filterFullyBookedDates, filterBookedDates } from "../GlobalFunctions/Filter";
import SingleBooking from "../SingleBooking";
import SingleEditableBooking from "../SingleEditableBooking";
import Modal from "../Modal";

export default class Admin extends Component {
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
      phone: null,
    },
    modal: {
      showRegularModal: true,
      showModal: false,
      message: null,
    },
  }

  componentDidMount() {
    const date = this.encodedDate();
    this.sortBookings();
    this.fetchSelectedDate(date);
  }

  sortBookings = () => {
    fetchBookingsByCount()
      .then((fetchedBookings) => {
        /* First filter fully booked sessions, if any, then filter fully booked dates. All to be excluded in datepicker */
        if (!fetchedBookings || fetchedBookings.length === 0) {
          return;
        }
        /* Filter dates with bookings to be highlighted in datepicker */
        const bookedDates = filterBookedDates(fetchedBookings);
        // console.log(bookedDates);

        if (bookedDates && bookedDates.lenght !== 0) {
          // console.log(`bokade: ${bookedDates}`);
          this.setState({ bookedDates });
        }
        const fullyBookedDates = filterFullyBookedDates(fetchedBookings);

        if (fullyBookedDates && fullyBookedDates.length !== 0) {
          this.setState({ fullyBookedDates });
        }
      })
      .catch(() => {
        const message = "Bokningssystemet fungerar inte för tillfället ";
        this.triggerShowModal(message, false);
      });
  }

  fetchSelectedDate = (date) => {
    fetch(`/api/bookings/date/${date}`)
      .then(response => response.json())
      .then((bookingsOnSelectedDate) => {
        this.setState({ bookingsOnSelectedDate });
      })
      .catch(() => {
        const message = "Det går inte att hämta bokningar just nu.";
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
      id: selectedBooking.id,
    };

    fetch("/api/update_booking", {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {

        } else {
          const message = "Det gick inte att uppdatera. Försök igen.";
          this.triggerShowModal(message, true);
        }
      })
      .then(() => {
        this.updateAdminState();
      });
  }

  updateAdminState = () => {
    const date = this.encodedDate();
    // Fetch the selected date's bookings again, with new values.
    this.fetchSelectedDate(date);
    // Sort bookings again.
    this.sortBookings();
    // Reset selected id so all bookings render as editable again.
    this.setState({ selectedId: null });
  }

  confirmDeleteBooking = () => {
    const confirmed = window.confirm("Vill du verkligen ta bort bokningen?");
    if (!confirmed) {

    } else {
      this.deleteSelectedBooking();
    }
  }

  deleteSelectedBooking = () => {
    const { selectedBooking } = this.state;
    const requestBody = {
      id: selectedBooking.id,
    };

    fetch("/api/delete_booking", {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          return;
        }
        const message = "Det gick inte att ta bort bokningen. Försök igen.";
        this.triggerShowModal(message, true);
      })
      .then(() => {
        this.updateAdminState();
      });
  }

  encodedDate = () => {
    const selectedDate = this.state.selectedDate;
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
        phone: booking.phone,
      },
      selectedId: booking.id,
      selectedDate: booking.date,
    });
  }

  updateDate = (date) => {
    this.setState({ selectedDate: date });
  }

  updateSelectedBookingInState = (event) => {
    const newValue = event.target.value;

    switch (event.target.name) {
      case "update_date":
        this.setState({
          selectedBooking: {
            ...this.state.selectedBooking,
            date: newValue,
          },
        });
        return;
      case "update_guests":
        this.setState({
          selectedBooking: {
            ...this.state.selectedBooking,
            guests: newValue,
          },
        });
        return;
      case "update_session":
        this.setState({
          selectedBooking: {
            ...this.state.selectedBooking,
            session: newValue,
          },
        });
        return;
      case "update_name":
        this.setState({
          selectedBooking: {
            ...this.state.selectedBooking,
            name: newValue,
          },
        });
        return;
      case "update_email":
        this.setState({
          selectedBooking: {
            ...this.state.selectedBooking,
            email: newValue,
          },
        });
        return;
      case "update_phone":
        this.setState({
          selectedBooking: {
            ...this.state.selectedBooking,
            phone: newValue,
          },
        });
        break;
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
      },
    });
  }

  closeModal = () => {
    this.setState({ modal: { showModal: false } });
  }

  renderHeadings = () => {
    const { bookingsOnSelectedDate } = this.state;
    if (bookingsOnSelectedDate < 1) {
      return;
    }
    return (
      <div className="bookingHeading">
        <label htmlFor="update_date">
          <strong>Datum</strong>
        </label>
        <label htmlFor="update_guests">
          <strong>Gäster</strong>
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
    );
  }

  renderBookings = () => {
    const { bookingsOnSelectedDate, selectedBooking, selectedId } = this.state;

    if (bookingsOnSelectedDate < 1) {
      return (
        <p className="noBookings">
          Det finns inga bokningar det valda datumet.
        </p>
      );
    }

    return bookingsOnSelectedDate.map((booking) => {
      if (selectedId === booking.id) {
        return (
          <SingleEditableBooking
            key={selectedBooking.id}
            selectedBooking={selectedBooking}
            updateSelectedBookingInState={this.updateSelectedBookingInState}
            updateSelectedBooking={this.updateSelectedBooking}
            confirmDeleteBooking={this.confirmDeleteBooking}
          />
        );
      }
      return (
        <SingleBooking
          key={booking.id}
          selectBookingToEdit={this.selectBookingToEdit}
          booking={booking}
        />
      );
    });
  }

  render() {
    const { showModal, showRegularModal, message } = this.state.modal;
    return (
      <main>
        <div className="adminWrapper">
          <Header className="adminHeader" title="Aministratör" />

          <Modal
            showRegularModal={showRegularModal}
            modalState={showModal}
            message={message}
            closeModal={this.closeModal}
            clearPage={this.clearPage}
          />

          <Calendar
            showAdminCalendar
            updateDate={this.updateDate}
            fetchSelectedDate={this.fetchSelectedDate}
            bookedDates={this.state.bookedDates}
            fullyBookedDates={this.state.fullyBookedDates}
          />
          <ColorBoxes />
          {this.renderHeadings()}
          {this.renderBookings()}
        </div>
      </main>
    );
  }
}
