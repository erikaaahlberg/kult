const express = require('express'); // Web Framework
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'kult',
})

app.listen(3001, () => {
  console.log('Listening to port 3001!');
})

// TODO: Post booking stuffs!
// app.post('/api/create_booking', (req, res) => {
//   console.log('Trying to create a new booking')
//   res.end();
// });


app.get('/api/bookings/:id', (req, res) => {
  const queryString = "SELECT * FROM bookings WHERE id = ?"
  const bookingId = req.params.id;

  connection.query(queryString, [bookingId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for booking: ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }

    const bookings = rows.map((row) => {
      return {
        id: row.id,
        guests: row.guests,
        date: row.date,
        session: row.session,
      }
    })
    res.json(bookings)
  })
})


app.get('/api/bookings', (req, res) => {
  const queryString = "SELECT * FROM bookings";

  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to get all bookings ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }

    const bookings = rows.map((row) => {
      return {
        id: row.id,
        guests: row.guests,
        date: row.date,
        session: row.session,
      }
    })
    res.json(bookings)
  })
})

