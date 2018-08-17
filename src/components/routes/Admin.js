import React, {Component} from "react";
import moment from 'moment';
import Calendar from "../Calendar";

export default class Admin extends Component{

  state = {
    bookingsOnSelectedDate: [],
    selectedIdToEdit: null,
  }

  fetchSelectedDate = (date) => {
    fetch(`/api/bookings/date/${date}`)
    .then(response => response.json())
    .then((bookingsOnSelectedDate) => {
      this.setState({bookingsOnSelectedDate})
    })
    .catch((error) => {
      // TODO: Handle error output to user, remove console.log
      console.log(error);
    });
  }

  checkForBookingsCurrentDate = () => {
    let formattedDateString = moment().format('YYYY/MM/DD');
    let encodedDate = encodeURIComponent(formattedDateString);
    this.fetchSelectedDate(encodedDate);
  }

  componentDidMount(){
    this.checkForBookingsCurrentDate();
  }

  /** TODO:
   * Fix PATCH-functionality, send api call,
   * Fix rror with key prop (?) and maybe seperate this to it's own component?
  */
  renderBookings = () => {
    if(!this.state.bookingsOnSelectedDate){
      return;
    }
     else {
      return this.state.bookingsOnSelectedDate.map((booking) => {
        if(this.state.selectedIdToEdit === booking.id){
          return (
            <React.Fragment>
              <form>
              <ul key={booking.id}>
              <h3>Bokning:</h3>
                <li>
                  <label>Datum:</label>
                  <input placeholder={booking.date} />
                </li>

                <li>
                  <label>Antal gäster:</label>
                  <input placeholder={booking.guests} />
                </li>

                <li>
                  <label>Sittning:</label>
                  <input placeholder={booking.session} />
                </li>

                <li>
                  <label>Bokat av:</label>
                  <input placeholder={booking.name} />
                </li>

                <li>
                  <label>E-mail:</label>
                  <input placeholder={booking.email} />
                </li>

                <li>
                  <label>Telefon:</label>
                  <input placeholder={booking.phone} />
                </li>

                <button onClick={() => {this.setState({selectedIdToEdit: null})}}>Klar</button>
                </ul>
              </form>
            </React.Fragment>
          )
        }

        return (
          <ul key={booking.id}>
            <h3>Bokning: </h3>
            <li>Datum: {booking.date}</li>
            <li>Antal personer: {booking.guests}</li>
            <li>Sittning: {booking.session}</li>
            <li>Bokat av: {booking.name}</li>
            <li>E-mail: {booking.email}</li>
            <li>Telefon: {booking.phone}</li>
            <button onClick={() => {this.setState({selectedIdToEdit: booking.id})}}>Redigera</button>
          </ul>
        )
      }
    )}
  }

  render(){
    return(
      <div>
        <h1>Administratör</h1>

        <Calendar showAdminCalendar={true} fetchSelectedDate={this.fetchSelectedDate}/>

        {this.state.bookingsOnSelectedDate.length < 1 &&
          <p>Det finns inga bokningar det valda datumet.</p>
        }

        {this.renderBookings()}

      </div>
    )
  }
};