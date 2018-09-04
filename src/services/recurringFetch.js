// Exported to be used for both Admin and Booking-view.
export const fetchDatesAndSessions = () => fetch("api/count")
  .then(response => response.json())
  .then((fetchedBookings) => {
    return fetchedBookings;
  })