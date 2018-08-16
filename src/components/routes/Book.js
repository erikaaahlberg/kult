import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class Book extends Component{

  state = {
    existingBookings: [],
    startDate: moment(),
  }

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date,
    });
    console.log(date._d);
  }

  fetchBookings = () => {
    fetch('/api/bookings')
    .then(response => response.json())
    .then((existingBookings) => {
        this.setState({existingBookings})
    })
    .catch((error) => {
      // TODO: Handle error output to user, remove console.log
        console.log(error);
    });
  }

  /** TODO:
   * This is a temporary (!) render to see what raw data comes out of db,
   * this should not be shown here later. And maybe fetch elsewhere.
   * */
  renderExistingBookings = () => {
    if(!this.state.existingBookings){
      return;
    } else {
      return this.state.existingBookings.map((booking) => {
        return (
          <ul key={booking.id}>
            <h3>Bokning: </h3>
            <li>Datum: {booking.date}</li>
            <li>Antal personer: {booking.guests}</li>
            <li>Sittning: {booking.session}</li>
          </ul>
        )
      }
    )}
  }

  componentDidMount(){
    this.fetchBookings();
  }

  render(){
    return(
      <div>
        <h1>Boka bord</h1>
        <DatePicker
          inline
          selected={this.state.startDate}
          onChange={this.handleChange} 
        />
        <p>Det här är komponenten för bokningssidan – jag finns i components/routes/Book.</p>
        <h2>Nuvarande bokningar i databasen:</h2>
        {!this.state.existingBookings &&
          <p>Inga bokningar just nu.</p>
        }
        {this.renderExistingBookings()}
      </div>
    )
  }
};