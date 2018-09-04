export const filterFullyBookedSessions = (bookings) => {
  const fullyBookedSessions = [];

  for (let i = 0; i < bookings.length; i++) {
    const numberOfBookings = bookings[i].count;

    if (numberOfBookings === 5) {
      fullyBookedSessions.push({
        date: bookings[i].date,
        session: bookings[i].session,
      });
    }
  }
  return fullyBookedSessions;
};

export const filterDuplicateDates = (bookings) => {
  /* Check if there are two fully booked sessions on the same date,
  that would mean there are no seats left either 18:00 or 21:00. */
  const duplicateDates = [];
  const lastIndex = bookings.length - 1;
  for (let i = 0; i < bookings.length; i++) {
    if (i !== lastIndex) {
      for (let p = i + 1; p < bookings.length; p++) {
        if (bookings[i].date === bookings[p].date) {
          duplicateDates.push(bookings[i].date);
        }
      }
    }
  }
  return duplicateDates;
};

export const filterFullyBookedDates = (bookings) => {
  /* Checking for fully booked sessions to be able to check for fully booked dates */
  const fullyBookedSessions = filterFullyBookedSessions(bookings);

  /* If there are any fully booked sessions with the same date, that date is fully booked */
  if (fullyBookedSessions) {
    const fullyBookedDates = filterDuplicateDates(fullyBookedSessions);
    return fullyBookedDates;
  }
  return fullyBookedSessions;
};

export const filterBookedDates = (bookings) => {
  const bookedDates = bookings.map(booking => booking.date);
  return bookedDates;
};

export const checkForDuplicateValues = (array, value) => {
  const sameValues = array.map((item) => {
    return item === value;
  });
  return sameValues;
};
