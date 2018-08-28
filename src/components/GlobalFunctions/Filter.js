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