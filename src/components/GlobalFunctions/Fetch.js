export const fetchBookingsByCount = () => {
  return fetch("api/count")
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

export const fetchByDate = (date) => {
  return fetch(`/api/bookings/date/${date}`)
    .then(response => response.json())
      .then((bookingsOnSelectedDate) => {
        return bookingsOnSelectedDate;
      })
      .catch((error) => {
        // TODO: Handle error output to user, remove console.log
        console.log(error);
  });
}