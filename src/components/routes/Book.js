import React, { Component } from "react";
import moment from "moment";
import { removeFromArray, formatDateString } from "../GlobalFunctions/Helpers";
import { fetchBookingsByCount } from "../GlobalFunctions/Fetch";
import { filterFullyBookedSessions, filterDuplicateDates } from "../GlobalFunctions/Filter";
import BookingForm from "../BookingForm";
import Modal from "../Modal";

export default class Book extends Component {
  state = {
    fullyBookedSessions: [],
    fullyBookedDates: [],
    availableSessions: ['-'],
    booking: {
      date: moment().format("YYYY/MM/DD"),
      guests: 1, // Needs this as intial default value.
      session: "18:00", // Same here.
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
    this.sortBookings();
    this.findSessionsForSelectedDate();
  }

  sortBookings = () => {
    fetchBookingsByCount()
      .then((fetchedBookings) => {
        /* First filter fully booked sessions, to be excluded in session selector. If any, then filter fully booked dates to be excluded in datepicker */
        const fullyBookedSessions = filterFullyBookedSessions(fetchedBookings);

        /* If there are fully booked sessions, store them in state */
        if (fullyBookedSessions && fullyBookedSessions.length !== 0) {
          this.setState({ fullyBookedSessions });
          const fullyBookedDates = filterDuplicateDates(fullyBookedSessions);

          if (fullyBookedDates && fullyBookedDates.length !== 0) {
            this.setState({ fullyBookedDates });
          }
        }
      })
      .catch(() => {
        const message = `Bokningssystemet fungerar inte för tillfället
        – vi ber om ursäkt. Du kan nå oss på telefon, läs mer under "kontakt".`;
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
  findSessionsForSelectedDate = (selectedDate) => {
    const defaultSessions = ["18:00", "21:00"];

    if (!selectedDate) {
      /** User has not selected a date,
       * which means they want to book today. */
      const today = moment();
      selectedDate = formatDateString(today);
    }

    if (this.state.fullyBookedSessions.length > 0) {
      const fullyBookedSessions = this.state.fullyBookedSessions;

      for (let i = 0; i < fullyBookedSessions.length; i++) {
        if (selectedDate === fullyBookedSessions[i].date) {
          const sessionToRemove = fullyBookedSessions[i].session;
          const availableSessions = removeFromArray(defaultSessions, sessionToRemove);
          this.setState({ availableSessions });
          return;
        }

        // No fully booked sessions on selected date, both sessions are available!
        this.setState({ availableSessions: defaultSessions });
      }
    }
  }

  createNewBooking = (event) => {
    event.preventDefault();
    const { booking } = this.state;
    const requestBody = {
      date: booking.date,
      guests: booking.guests,
      session: booking.session,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
    };

    fetch("/api/create_booking", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        const { name, date, session } = this.state.booking;

        if (response.ok) {
          const message = `Tack ${name} för din bokning!
          Välkommen till Kult den ${date} kl.${session}.
          Vi ser fram emot besöket!`;
          this.triggerShowModal(message, true);
        } else {
          const message = "Bokningen misslyckades, försök igen.";
          this.triggerShowModal(message, true);
        }
      });
  }

  // Called when user changes the input values of booking form.
  updateBooking = (event) => {
    const newValue = event.target.value;
    switch (event.target.name) {
      case "create_guests":
        this.setState({
          booking: {
            ...this.state.booking,
            guests: newValue,
          },
        });
        return;
      case "create_session":
        this.setState({
          booking: {
            ...this.state.booking,
            session: newValue,
          },
        });
        return;
      case "create_name":
        this.setState({
          booking: {
            ...this.state.booking,
            name: newValue,
          },
        });
        return;
      case "create_email":
        this.setState({
          booking: {
            ...this.state.booking,
            email: newValue,
          },
        });
        return;
      case "create_phone":
        this.setState({
          booking: {
            ...this.state.booking,
            phone: newValue,
          },
        });

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
        date,
      },
    });
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

  clearPage = () => {
    window.location.reload();
  }

  render() {
    const { fullyBookedDates, availableSessions } = this.state;
    const { showModal, showRegularModal, message } = this.state.modal;

    return (
      <div className="wrapper">
        <h1 className="smallHeader">BOKA BORD</h1>

        <Modal
          showRegularModal={showRegularModal}
          modalState={showModal}
          message={message}
          closeModal={this.closeModal}
          clearPage={this.clearPage}
        />

        <BookingForm
          availableSessions={availableSessions}
          fullyBookedDates={fullyBookedDates}
          findSessionsForSelectedDate={this.findSessionsForSelectedDate}
          updateBooking={this.updateBooking}
          updateDate={this.updateDate}
          createNewBooking={this.createNewBooking}
        />

      </div>
    );
  }
}
