const express = require('express'); // Web Framework
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'kult',
})

app.listen(3001, () => {
  console.log('Listening to port 3001!');
})

app.post('/api/create_booking', (req, res) => {
  const guests = req.body.create_guests;
  const date = req.body.create_date;
  const session = req.body.create_session;
  const name = req.body.create_name;
  const email = req.body.create_email;
  const phone = req.body.create_phone;

  const queryString =
    `INSERT INTO bookings
    (id, guests, date, session, name, email, phone)
    VALUES ('', ?, ?, ?, ?, ? ,?)`;

  connection.query(queryString, [guests, date, session, name, email, phone], (err, results, fields) => {
    if(err){
      console.log('Failed to add booking: ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }
    /** Reload to book page, Book component (in routes-folder)
     * will mount again and fetch the new booking */
    res.redirect('/book');
  })
});

// TODO: Currently only getting here with app.all but should be able to use app.put()?
app.all('/api/update_booking', (req, res) => {
  const id = req.body.id;
  const date = req.body.update_date;
  const guests = req.body.update_guests;
  const session = req.body.update_session;
  const name = req.body.update_name;
  const email = req.body.update_email;
  const phone = req.body.update_phone;

  const queryString =
    `UPDATE bookings
    SET guests= ?, date= ?, session=?, name=?, email=?, phone= ?
    WHERE id = ?`

  connection.query(queryString, [guests, date, session, name, email, phone, id], (err, results, fields) => {
    if(err){
      console.log('Failed to add booking: ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }
    /** TODO:
     * Redirecting will unmount and mount admin comp again,
     * which renders current date. So if you edited another date,
     * you have to use the datepicker to see your updates. How to fix?
     */
    res.redirect('/admin');
  })
});
/*
app.get('/api/bookings', (req, res) => {
  const queryString = "SELECT * FROM bookings WHERE id = ?";
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
        name: row.name,
        email: row.email,
        phone: row.phone,
      }
    })
    res.json(bookings)
  })
})
*/
app.get('/api/bookings/date/:date', (req, res) => {
  const queryString = "SELECT * FROM bookings WHERE date = ?";
  const date = req.params.date;

  connection.query(queryString, [date], (err, rows, fields) => {
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
        name: row.name,
        email: row.email,
        phone: row.phone,
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
        name: row.name,
        email: row.email,
        phone: row.phone,
      }
    })
    res.json(bookings)
  })
})


app.get('/api/count', (req, res) => {
  const queryString = "SELECT date, session, COUNT(*) as count FROM bookings GROUP BY date, session";

  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to get all bookings ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }

    const numberOfBookings = rows.map((row) => {
      return {
        date: row.date,
        session: row.session,
        count: row.count
      }
    })
    res.json(rows)
  })
})