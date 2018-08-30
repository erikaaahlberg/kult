export const fetchBookingsByCount = () => fetch("api/count")
  .then(response => response.json())
  .then((fetchedBookings) => {
    console.log(fetchedBookings);
    return fetchedBookings;
  });

export const fetchByDate = date => fetch(`/api/bookings/date/${date}`)
  .then(response => response.json())
  .then(bookingsOnSelectedDate => bookingsOnSelectedDate)
  .catch((error) => {
    // TODO: Handle error output to user, remove console.log
    console.log(error);
  });
