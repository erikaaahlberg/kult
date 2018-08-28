export default fetchBookingsByCount = () => {
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