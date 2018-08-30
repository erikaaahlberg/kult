// TODO: Maybe not call this endpoint and it's functions count?
export const fetchBookingsByCount = () => fetch("api/count")
  .then(response => response.json())
  .then((fetchedBookings) => {
    return fetchedBookings;
  });

export const fetchByDate = date => fetch(`/api/bookings/date/${date}`)
  .then(response => response.json())
  .then(bookingsOnSelectedDate => bookingsOnSelectedDate)
  .catch((error) => {
    // TODO: Handle error output to user, remove console.log
    console.log(error);
  });
