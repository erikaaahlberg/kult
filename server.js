const express = require('express'); // Web Framework
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'kult',
})

app.listen(3001, () => {
  console.log('Listening to port 3001!');
})

app.get('/api/bookings', (req, res) => {
  const queryString = "SELECT * FROM bookings";

  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to get all bookings: ' + err);
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
        name: row.name,
        email: row.email,
        phone: row.phone,
      }
    })
    res.json(bookings)
  })
})

app.get('/api/bookings/date/:date', (req, res) => {
  const queryString = "SELECT * FROM bookings WHERE date = ?";
  const date = req.params.date;

  connection.query(queryString, [date], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for booking selected date: ' + err);
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
        name: row.name,
        email: row.email,
        phone: row.phone,
      }
    })
    res.json(bookings)
  })
})

app.post('/api/create_booking', (req, res) => {
  const guests = req.body.guests;
  const date = req.body.date;
  const session = req.body.session;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  const queryString =
    `INSERT INTO bookings
    (id, guests, date, session, name, email, phone)
    VALUES ('', ?, ?, ?, ?, ? ,?)`;

  connection.query(queryString, [guests, date, session, name, email, phone], (err, results, fields) => {
    if(err){
      console.log('Failed to create new booking: ' + err);
      res.sendStatus(500)
      res.end();
      return;
    }
  })
  res.end();
});

app.put('/api/update_booking', (req, res) => {
  const date = req.body.date;
  const guests = req.body.guests;
  const session = req.body.session;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const id = req.body.id;

  const queryString =
    `UPDATE bookings
    SET guests= ?, date= ?, session=?, name=?, email=?, phone= ?
    WHERE id = ?`

  connection.query(queryString, [guests, date, session, name, email, phone, id], (err, results, fields) => {
    if(err){
      console.log('Failed to update booking: ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }
  })
  res.end();
});

app.delete('/api/delete_booking', (req, res) => {
  const id = req.body.id;

  const queryString =
    `DELETE from bookings
    WHERE id = ?`

  connection.query(queryString, [id], (err, results, fields) => {
    if(err){
      console.log('Failed to delete booking: ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }
  })
  res.end();
});
