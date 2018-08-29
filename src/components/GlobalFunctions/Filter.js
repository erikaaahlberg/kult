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

export const filterFullyBookedDates = (bookings) => {
  /* Checking for fully booked sessions to be able to check for fully booked dates */  
  const fullyBookedSessions = filterFullyBookedSessions(bookings);

   /* If there are any fully booked sessions with the same date, that date is fully booked */
  if (fullyBookedSessions) {
    const fullyBookedDates = filterDuplicateDates(fullyBookedSessions);
    return fullyBookedDates;
  } else {
    return fullyBookedSessions;
  }
}

export const filterBookedDates = (bookings) => {
  const bookedDates = bookings.map((booking) => {
    return booking.date
  });
  return bookedDates;
}

/* Under construction */
export const sortBySession = (bookings) => {
  let sortedBookings = {
    session1: [],
    session2: []
  };
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].session === '18:00') {
      sortedBookings.session1.push(bookings[i]);
    } else {
      sortedBookings.session2.push(bookings[i]);
    }
  }
  return sortedBookings;
}
/* Below is a questionmark so far */
export const countTablesLeft = (sortedBookings) => {
  let numberOfBookings = sortedBookings.length;
  //return tablesLeft;
}
/* collapse */