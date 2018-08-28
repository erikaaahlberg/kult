export const filterFullyBookedSessions = (bookings) => {
  let fullyBookedSessions = [];

  for (let i = 0; i < bookings.length; i++) {
    let numberOfBookings = bookings[i].count;

    if (numberOfBookings === 5) {
      fullyBookedSessions.push({
        date: bookings[i].date,
        session: bookings[i].session
      });
    }
  }
  return fullyBookedSessions;
}

export const countTablesLeft = (booking) => {
  const tablesLeft = 5 - booking.count;
  return tablesLeft;
}

export const filterDuplicateDates = (bookings) => {
  /** Check if there are two fully booked sessions on the same date,
  that would mean there are no seats left either 18:00 or 21:00. */
  let duplicateDates = [];
  const lastIndex = bookings.length -1;
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
}